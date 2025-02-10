<script>
  import { selectedCells } from "./selectedCellsStore.js";

  // Input
  export let htmlCode = "";
  export let truncatedCode = "";
  export let output = "";
  const collapsedOutput = output.slice(0, 20) + "...";

  let codeCollapsed = false;
  function toggleCode() {
    codeCollapsed = !codeCollapsed;
  }

  let outputCollapsed = false;
  function toggleOutput() {
    outputCollapsed = !outputCollapsed;
  }

  let codeAndOuputContainer;
  // Reactive variable
  $: isSelected = $selectedCells === codeAndOuputContainer;
  function selectCell() {
    // Deselect others
    if (!isSelected) {
      selectedCells.update(() => codeAndOuputContainer);
    }
  }

  let hideOutput = true;
  function showOutput() {
    hideOutput = false;
  }
</script>

<div
  bind:this={codeAndOuputContainer}
  role="button"
  tabindex="0"
  on:click={selectCell}
  on:keypress={selectCell}
>
  <div class="cell-container code-container">
    <div
      class="hover-bar {isSelected ? 'bar-selected' : ''}"
      role="button"
      tabindex="0"
      on:click={toggleCode}
      on:keypress={toggleCode}
    ></div>
    <span
      class="code-run-button codicon codicon-play"
      role="button"
      tabindex="0"
      on:click={showOutput}
      on:keypress={showOutput}
    ></span>
    <div class="cell code-cell {codeCollapsed ? 'code-cell-truncated' : ''}">
      {@html codeCollapsed ? truncatedCode : htmlCode}
    </div>
  </div>

  <div class="cell-container output-container {hideOutput ? 'hidden' : ''}">
    <div
      class="hover-bar {isSelected ? 'bar-selected' : ''}"
      role="button"
      tabindex="0"
      on:click={toggleOutput}
      on:keypress={toggleOutput}
    ></div>
    <div class="cell">{@html outputCollapsed ? collapsedOutput : output}</div>
  </div>
</div>

<style>
</style>
