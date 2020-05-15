<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  export let money = 0;
</script>

<style>
  .bank {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    font-size: 4vw;
    color: coral;
    background-color: bisque;
    padding: 25px;
    border-radius: 25px;
    display: flex;
    flex-flow: row;
  }
</style>

<div class="bank">
  <div>
    {money}
  </div>
</div>
