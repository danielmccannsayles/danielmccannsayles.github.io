<script>
  import { selectedCells } from "../../components/selectedCellsStore.js";
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

  // Input
  export let title = "";
  export let subtitle = "";
  export let hideToStart = false;
  export let onToggle;

  const titleHTML = marked.parse(title);
  const subtitleHTML = marked.parse(subtitle);
  const collapsedTitle = title.replace(/\n/g, "").slice(0, 20) + "...";

  // Hide/show section
  let hide = false;
  function toggleArrow() {
    hide = !hide;
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

  // Starting hide or not
  import { onMount } from "svelte";
  onMount(() => {
    if (hideToStart) {
      hide = true;
    }
  });
</script>

<div
  {...$$restProps}
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
      class="title-arrow-toggle codicon {hide
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
  {#if !collapsed}
    {#if subtitle !== ""}
      <div style="margin-left: 40px">
        {@html subtitleHTML}
      </div>
    {/if}
    {#if hide}
      <div style="margin-left: 40px">
        <slot />
      </div>
    {/if}
  {/if}
</div>

<style>
</style>
