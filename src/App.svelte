<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  import Board from './Board.svelte';
  import Guess from './Guess.svelte';

  export let qas = [];
  export let teamNames = ['', ''];

  let qaIndex = 0;

  let showMessage   = false;
  let start         = false;
  let faceOff       = false;
  let showPass      = false;
  let teamDisable   = [false, false];
  let steal         = false
  let next          = false;
  let end           = false;

  let messageTimeout = null;

  let currentTeam = -1;

  let guess   = '';
  let message = '';

  let bankMoney = 0;
  let teamMoney = [0, 0];

  let strikes = [];

  function playSound(name, volume) {
    let sound = new Audio(`sounds/${name}.ogg`);
    sound.volume = volume;
    sound.play();
  }

  function setAnimation(on) {
    let el = document.getElementById("board");
    if (el) {
      if (on) {
        el.classList.add("logo-border-animation");
      } else {
        el.classList.remove("logo-border-animation");
      }
    }
  }

  function displayMessage(text, seconds) {
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    messageTimeout = null;
    message = text;
    showMessage = true;
    if (seconds <= 0) { return; }
    messageTimeout = setTimeout(() => {
      message     = '';
      showMessage = false;
    }, seconds * 1000);
  }

  function setAnswerVisibility(show) {
    let answers = qas[qaIndex].answers.map(answer => {
      answer.show = show;
      return answer
    });

    qas[qaIndex].answers = answers;
  }

  function allShown() {
    let shown = 0;
    let answers = qas[qaIndex].answers;
    let length = answers.length;
    for (let i = 0; i < length; ++i) {
      let answer = answers[i]
      if (answer.show) { shown += 1; }
    }

    return shown === length;
  }

  function startGame() {
    faceOff = true;
    start   = true;
    displayMessage("Face off! First team to call out their answer goes first.", 4);
  }

  function handleGuess(e) {
    setAnimation(false);

    guess = e.detail;

    showPass = false;

    let match = false;
    let money = 0;
    let answers = qas[qaIndex].answers;
    let length = answers.length;

    for (let i = 0; i < length; ++i) {
      let answer = answers[i]
      match = answer.text.toLowerCase() === guess.toLowerCase();
      if (match) {
        if (answer.show) { break; }
        money = answer.money
        answer.show = true;
        break;
      }
    }

    qas[qaIndex].answers = answers;

    if (match) {
      playSound("ding", 0.1);
    } else {
      playSound("buzzer", 0.02);
    }

    if (allShown()) {
      teamMoney[currentTeam] += (bankMoney + money);
      bankMoney = 0;
      next = true;
      setAnimation(true);
      playSound("cheer", 0.1);
      displayMessage("Team " + teamNames[currentTeam] + " wins the round!", 3);
      return;
    }

    if (faceOff) {
      if (!match) {
        teamDisable = [false, false];
        teamDisable[e.teamNumber] = true;
      } else {
        currentTeam = e.teamNumber;

        if (e.teamNumber == 1) {
          teamDisable[0] = true;
        } else {
          teamDisable[1] = true;
        }

        displayMessage("Team " + teamNames[currentTeam] + " wins the face off! Wanna pass?", 6);

        faceOff   = false;
        bankMoney = money;
        showPass  = true;
      }
    } else if (steal) {
      if (!match) {
        currentTeam +=1;
        if (currentTeam > 1) { currentTeam = 0; }
        teamMoney[currentTeam] += bankMoney;
      } else {
        teamMoney[currentTeam] += (bankMoney + money);
      }

      bankMoney = 0;

      setAnswerVisibility(true);

      setAnimation(true);
      playSound("cheer", 0.1);
      displayMessage("Team " + teamNames[currentTeam] + " wins the round!", 4);

      next = true;
    } else {
      if (!match) {
        strikes += ['☒'];

        displayMessage("Strike!", 1);

        if (strikes.length >= 3) {
          teamDisable = [false, false];
          teamDisable[e.teamNumber] = true;
          steal = true;
          currentTeam = e.teamNumber + 1;
          if (currentTeam > 1) { currentTeam = 0; }
          displayMessage("Team " + teamNames[currentTeam] + " can steal!", 5);
        }
      } else {
        bankMoney += money;
      }
    }
  }

  function pass() {
    if (currentTeam < 0) {
      showPass = false;
      return;
    }
    teamDisable[currentTeam] = true;
    currentTeam += 1;
    if (currentTeam > 1) { currentTeam = 0; }
    teamDisable[currentTeam] = false;
    showPass = false;

    displayMessage(`Team ${teamNames[currentTeam]} now has the board.`, 4);
  }

  function nextRound(e) {
    if (qaIndex + 1 >= qas.length) {
      end = true;
      let winningTeam = teamMoney[0] > teamMoney[1] ? 0 : 1;
      setAnimation(true);
      playSound("cheer", 0.1);
      displayMessage("Team " + teamNames[winningTeam] + " wins the game!", 6);
    } else {
      setAnswerVisibility(false);
      qaIndex += 1;
      setAnimation(false);
      displayMessage("Face off!", 3);
    }

    next        = false;
    faceOff     = true;
    steal       = false;
    showPass    = false;
    teamDisable = [false, false];

    currentTeam = -1;

    guess = '';

    bankMoney = 0;

    strikes = [];
  }

  function restart(e) {
    setAnswerVisibility(false);

    qaIndex = 0;

    start       = false;
    faceOff     = false;
    teamDisable = [false, false];
    steal       = false;
    showPass    = false;
    next        = false;
    end         = false;

    currentTeam = -1;

    guess = '';

    bankMoney = 0;
    teamMoney = [0, 0];

    strikes = [];

    playSound("theme", 0.1);
  }

  playSound("theme", 0.1);
</script>

<style>
  .message {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(100, 100, 100, 0.8);
    font-size: 6vw;
    text-align: center;
    cursor: pointer;
  }
  .message-text {
    width: 80%;
  }
  .column-center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .row-center {
    width: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .logo {
    margin: 1%;
    background-color: cornsilk;
    padding: 5%;
    border-radius: 45%;
    width: 40%;
    border: 20px bisque dotted;
    text-align: center;
    box-shadow: inset 0 0 0 20px white;
  }
  .logo-text {
    text-align: center;
    color: coral;
    font-family: Rye;
    font-size: 10vw;
    text-shadow: 5px 5px 0px white;
  }
  .github {
    background-color: bisque;
    color: lightcoral;
  }
  .github:hover {
    background-color: bisque;
    color: lightcoral;
  }
</style>

{#if showMessage}
  <div class="message" on:click="{ () => showMessage = false }">
    <div class="message-text">{message}</div>
  </div>
{/if}
<div class="column-center">
  {#if !start}
    <div class="column-center">
      <div class="logo logo-border-animation">
        <div class="logo-text">
          Hacker Feud
        </div>
      </div>
      <button on:click={startGame}>
        <span>Start</span>
      </button>
      <button class="github" on:click="{ () => { window.open('https://github.com/lettier/hacker-feud'); } }">
        <span>GitHub</span>
      </button>
    </div>
  {:else}
    <Board qa={qas[qaIndex]} {bankMoney} {teamMoney} {strikes}/>
    {#if end}
      <div class="row-center">
        <button on:click={restart}><span>Restart</span></button>
      </div>
    {:else}
      {#if next}
        <div class="row-center">
          <button on:click={nextRound}><span>Next Round<span></button>
        </div>
      {:else}
        <div class="row-center">
          <Guess on:guess="{ e => { e.teamNumber = 0; handleGuess(e); } }" disable={teamDisable[0]} teamName={teamNames[0]}/>
          <Guess on:guess="{ e => { e.teamNumber = 1; handleGuess(e); } }" disable={teamDisable[1]} teamName={teamNames[1]}/>
        </div>
        {#if showPass}
          <button on:click={pass}><span>Pass?<span></button>
        {/if}
      {/if}
    {/if}
  {/if}
</div>
