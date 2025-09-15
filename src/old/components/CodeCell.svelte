<!-- 
 Code for adding output
 
  export let output = "";
  const collapsedOutput = output.slice(0, 20) + "...";
  
    let outputCollapsed = false;
  function toggleOutput() {
    outputCollapsed = !outputCollapsed;
  }

 let hideOutput = true;
  function showOutput() {
    hideOutput = false;
  }
 
    on:click={showOutput}
    on:keypress={showOutput}

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
 -->

<script>
  import { selectedCells } from "./selectedCellsStore.js";

  export let code = "";
  export let language = "python";
  const truncatedCode = code.slice(0, 20) + "...";

  let codeCollapsed = false;
  function toggleCode() {
    codeCollapsed = !codeCollapsed;
  }

  let codeAndOuputContainer;
  $: isSelected = $selectedCells === codeAndOuputContainer;
  function selectCell() {
    if (!isSelected) {
      selectedCells.update(() => codeAndOuputContainer);
    }
  }

  import { tick } from "svelte";
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  let codeElement;

  $: if (language !== "raw")
    (async () => {
      // On dom update (tick) w/ changed codeElement, highlight element. Needed for toggle
      if (codeElement) {
        await tick();
        hljs.highlightElement(codeElement);
      }
    })();
</script>

<div
  class="biiig-container"
  role="button"
  tabindex="0"
  bind:this={codeAndOuputContainer}
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
    ></span>
    {#if codeCollapsed}
      <div class="cell code-cell code-cell-truncated">
        {truncatedCode}
      </div>
    {:else}
      <div class="cell code-cell">
        <pre><code bind:this={codeElement} class="language-{language}"
            >{code}</code
          ></pre>
        <div class="language">{language}</div>
      </div>
    {/if}
  </div>
</div>

<style>
  .code-container {
    margin-bottom: 2px;
  }

  .biiig-container {
    margin-bottom: 20px;
  }

  .code-cell {
    position: relative;
    border: 1px #37373d solid;
    padding-left: 10px;
    background: #181818;
    font-family: Menlo, Monaco, "Courier New", monospace;
  }

  .code-cell-truncated {
    padding-left: 10px;
    border: none;
    border-bottom: 1px #37373d solid;
    background: none;
  }

  .language {
    position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 12px;
    font-family: inherit;
  }
  .language:first-letter {
    text-transform: capitalize;
  }

  .code-run-button {
    position: absolute;
    top: 2px;
    left: 17px;
    cursor: pointer;
  }
</style>
