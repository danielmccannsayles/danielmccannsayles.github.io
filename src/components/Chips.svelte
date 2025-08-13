<script>
  export let items = [];
</script>

<!-- <div class="chips-container">
  {#each items as item}
    <span class="chip">{item}</span>
  {/each}
</div> -->

<style>
  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    padding-left: 40px;
    padding-right: 20px;
  }

  .chip {
    padding: 4px 8px;
    border: 1px solid #cccccc;
    border-radius: 16px;
    background-color: transparent;

    white-space: nowrap;
  }
</style>
