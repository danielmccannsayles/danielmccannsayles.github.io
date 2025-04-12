<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

  export let text = "";
  export let imgAlt = "";
  export let imgSrc = null;

  const content = marked.parse(text);
</script>

<div class="content-flex">
  {#if imgSrc}
    <img style="height: 60px;" src={imgSrc} alt={imgAlt} />
  {/if}
  <div class="md">
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
