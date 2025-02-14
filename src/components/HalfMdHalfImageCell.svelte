<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  import { selectedCells } from "./selectedCellsStore.js";

  // Input
  export let md = "";
  export let imageSrc = "";
  export let imageWidthPercentage = 30; // Default width as a percentage

  const content = marked.parse(md); // Precompute parsed HTML
  const collapsedContent = md.replace(/\n/g, "").slice(0, 20) + "...";

  let collapsed = false;
  function toggleHoverBar() {
    collapsed = !collapsed;
  }

  let cell;

  // Reactive variable
  $: isSelected = $selectedCells === cell;
  function selectCell() {
    // Deselect others
    if (!isSelected) {
      selectedCells.update(() => cell);
    }
  }
</script>

<div
  bind:this={cell}
  class="cell-container"
  role="button"
  tabindex="0"
  on:click={selectCell}
  on:keypress={selectCell}
>
  <div
    class="hover-bar {isSelected ? 'bar-selected' : ''}"
    role="button"
    tabindex="0"
    on:click={toggleHoverBar}
    on:keypress={toggleHoverBar}
  ></div>
  <div class=" {collapsed ? 'collapsed' : ''}">
    {#if collapsed}
      {collapsedContent}
    {:else}
      <div class="content-flex">
        <div class="text-content">{@html content}</div>
        <div
          class="image-container"
          style="--image-width: {imageWidthPercentage}%;"
        >
          <img class="image-content" src={imageSrc} alt="" />
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .content-flex {
    display: flex;
    align-items: center;
    gap: 10%;
  }

  .text-content {
    flex: 1;
  }

  .image-container {
    flex: 0 0 var(--image-width, 30%);
    max-width: var(--image-width, 30%);
  }

  .image-content {
    width: 100%;
    height: auto;
  }
</style>
