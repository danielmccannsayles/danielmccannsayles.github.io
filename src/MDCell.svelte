<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  import { selectedCells } from "./selectedCellsStore.js";
  import { get } from "svelte/store";

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
  $: isSelected = $selectedCells.has(cell);
  function selectCell() {
    let currentSelection = get(selectedCells);
    console.log(currentSelection);
    // Deselect others
    if (!currentSelection.has(cell)) {
      selectedCells.update(() => new Set([cell]));
    }
  }
</script>

<div
  bind:this={cell}
  class="cell-container"
  role="button"
  tabindex="0"
  on:click={selectCell}
  on:keydown={selectCell}
>
  <div
    class="hover-bar {isSelected ? 'bar-selected' : ''}"
    role="button"
    tabindex="0"
    on:click={toggleHoverBar}
    on:keydown={toggleHoverBar}
  ></div>
  <div class="cell">
    {@html collapsed ? collapsedContent : content}
  </div>
</div>

<style>
</style>
