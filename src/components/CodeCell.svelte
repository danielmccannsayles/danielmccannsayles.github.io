<script>
  import { selectedCells } from "./selectedCellsStore.js";

  // Input
  export let htmlCode = "";
  export let truncatedCode = "";
  export let output = "";
  export let language = "Python";
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
  class="code-and-output"
  bind:this={codeAndOuputContainer}
  role="button"
  tabindex="0"
  on:click={selectCell}
  on:keypress={selectCell}
>
  <div class="cell-container cell-container-offset code-container">
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

      <div class="language">{language}</div>
    </div>
  </div>

  <div
    class="cell-container cell-container-offset output-container {hideOutput
      ? 'hidden'
      : ''}"
  >
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
  .code-container {
    margin-bottom: 2px;
  }

  .code-and-output {
    margin-bottom: 20px;
  }

  .code-cell {
    position: relative;
    border: 1px #37373d solid;
    padding-left: 30px;
    background: #181818;
    font-family: Menlo, Monaco, "Courier New", monospace;
  }

  .code-cell-truncated {
    padding-left: 10px;
    border: none;
    border-bottom: 1px #37373d solid;
    background: none;
  }

  .output-container {
    font-family: Menlo, Monaco, "Courier New", monospace;
    font-size: 12px;
  }

  .language {
    position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 12px;
    font-family: inherit;
  }
  .code-run-button {
    position: absolute;
    top: 2px;
    left: 17px;
    cursor: pointer;
  }
</style>
