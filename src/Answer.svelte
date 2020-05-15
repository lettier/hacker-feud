<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  export let answer;
</script>

<style>
  .answer {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 2.5px;
    margin-right: 2.5px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: lightcoral;
    color: ghostwhite;
    font-size: 2vw;
    max-width: 50%;
    flex-basis: 40%;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
  }
</style>

<div class="answer { answer.show ? 'answer-animation' : '' }">
  {#if answer.show}
    <div>
      {answer.text}
    </div>
    <div>
      {answer.money}
    </div>
  {:else}
    <div>
      &nbsp;
    </div>
    <div>
      &nbsp;
    </div>
  {/if}
</div>
