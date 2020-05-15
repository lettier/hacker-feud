<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  export let question;
</script>

<style>
  .question {
    text-align: center;
    margin-top: 20px;
    font-size: 2.5vw;
    background-color: lightblue;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 60px;
    display: flex;
    flex-flow: row;
  }
</style>

<div class="question">
  <p>
    {question}
  </p>
</div>
