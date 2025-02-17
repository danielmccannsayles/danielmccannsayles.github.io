<script>
  export let text = "";
  export let imgAlt = "";
  export let imgSrc = null;
</script>

<div class="content-flex">
  {#if imgSrc}
    <img style="height: 60px;" src={imgSrc} alt={imgAlt} />
  {/if}
  <div>
    {text}
  </div>
</div>

<style>
  .content-flex {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
