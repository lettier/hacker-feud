<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  import Bank     from './Bank.svelte';
  import Team     from './Team.svelte';
  import Question from './Question.svelte';
  import Answer   from './Answer.svelte';

  export let qa;
  export let bankMoney = 0;
  export let teamMoney = [0, 0];
  export let strikes = [];

  $: answers = qa.answers;
</script>

<style>
  .board-container {
    width: 80%;
    height: 55%;
    margin-top: 5%;
    margin-bottom: 20px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: cornsilk;
    border-radius: 40%;
    border: 20px dotted bisque;
    box-shadow: inset 0 0 0 20px white;
  }
  .board {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 105%;
    height: 100%;
  }
  .board-middle {
    position: relative;
    top: -7.5%;
  }
  .answers {
    width: 100%;
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .strikes {
    width: 20%;
    display: flex;
    flex-wrap: nowrap;
    flex-flow: row;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;
  }
  .strike {
    color: coral;
    font-size: 5vw;
  }
  .strike-hidden {
    color: cornsilk;
  }
  .row-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row;
  }
</style>

<div id="board" class="board-container">
  <div class="board">
    <div>
      <Team money={teamMoney[0]}/>
    </div>
    <div class="board-middle">
      <div class="row-center">
        <Bank money={bankMoney}/>
      </div>
      <div class="row-center">
        <Question question={qa.question}/>
      </div>
      <div class="answers">
        {#each answers as answer}
          <Answer {answer}/>
        {/each}
      </div>
      <div class="row-center">
        <div class="strikes">
          {#each strikes as strike}
            <div class="strike">
              {strike}
            </div>
          {:else}
            <div class="strike strike-hidden">
              ☐
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div>
      <Team money={teamMoney[1]}/>
    </div>
  </div>
</div>
