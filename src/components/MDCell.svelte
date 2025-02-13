<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  import { selectedCells } from "./selectedCellsStore.js";

  // Input
  export let md = "";
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
  <div class="cell {collapsed ? 'collapsed' : ''}">
    {#if collapsed}
      {collapsedContent}
    {:else}
      {@html content}
    {/if}
  </div>
</div>

<style>
</style>
