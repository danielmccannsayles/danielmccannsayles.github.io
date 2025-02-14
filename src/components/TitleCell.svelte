<script>
  import { selectedCells } from "./selectedCellsStore.js";
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

  // Input
  export let title = "";
  export let subtitle = "";
  export let onToggle;

  const titleHTML = marked.parse(title);
  const subtitleHTML = marked.parse(subtitle);
  const collapsedTitle = title.replace(/\n/g, "").slice(0, 20) + "...";

  // Toggle section
  let toggled = false;
  function toggleArrow() {
    toggled = !toggled;
    onToggle();
  }

  // Hover bar collapse
  let collapsed = false;
  function toggleHoverBar() {
    collapsed = !collapsed;
  }

  // Select cell
  let cell;
  $: isSelected = $selectedCells === cell;
  function selectCell() {
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
  <div class="title-container">
    <i
      class="title-arrow-toggle codicon {toggled
        ? 'codicon-chevron-right'
        : 'codicon-chevron-down'}"
      role="button"
      tabindex="0"
      on:click={toggleArrow}
      on:keypress={toggleArrow}
    ></i>
    <div class=" {collapsed ? 'collapsed' : ''}">
      {@html collapsed ? collapsedTitle : titleHTML}
    </div>
  </div>
  <div style="margin-left: 40px">
    {#if !collapsed && subtitle !== ""}
      {@html subtitleHTML}
    {/if}
  </div>
</div>
