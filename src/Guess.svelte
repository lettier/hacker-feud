<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  export let disable = false;
  export let teamName = '';

  let show = false;
  let guess = '';

  function sendGuess(e) {
    dispatch(
      'guess',
      String(guess).trim()
    );
    show = false;
    guess = '';
  }
</script>

<style>
  .container {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .input-container {
    display: flex;
    flex-flow: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }
  .team-text {
    font-size: 2vw;
  }
  .margin-left {
    margin-left: 5px;
  }
</style>

<div class="container">
  <div class="team-text">
    TEAM
  </div>
  <div class="input-container">
    {#if !show || disable}
      <input style="cursor: { disable ? 'not-allowed' : 'pointer' }"
             value={teamName} on:click="{ e => show = true }" disabled={ disable ? 'true' : '' }>
      <button class="margin-left { !disable ? 'button-animation' : '' }"
              on:click="{ e => show = true}" disabled={disable}><span>Guess</span></button>
    {:else}
      <input bind:value={guess} on:keyup="{ e => { if (e.keyCode == 13) sendGuess(); } }" autofocus>
      <button class="margin-left button-animation" on:click={sendGuess}><span>Submit</span></button>
    {/if}
  </div>
</div>
