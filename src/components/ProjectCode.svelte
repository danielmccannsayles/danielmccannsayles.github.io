<script>
  import { slide } from "svelte/transition";
  import { tick } from "svelte";
  import hljs from "highlight.js";
  import "highlight.js/styles/atom-one-dark.css";

  export let codeBlocks = []; // Array of {content: string, language: string}
  export let title = "Code";

  let expanded = false;
  let codeElements = [];

  function toggleExpanded() {
    expanded = !expanded;
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  }

  // Highlight code blocks after DOM updates
  $: if (expanded && codeBlocks.length > 0) {
    (async () => {
      await tick();
      codeElements.forEach((element) => {
        if (element) {
          hljs.highlightElement(element);
        }
      });
    })();
  }
</script>

<div class="project-code">
  <div
    class="code-header"
    on:click={toggleExpanded}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
  >
    <h4 class="code-title">{title}</h4>
    <div class="expand-icon" class:rotated={expanded}>
      <i class="codicon codicon-chevron-down"></i>
    </div>
  </div>

  {#if expanded}
    <div class="code-content" transition:slide={{ duration: 300 }}>
      {#each codeBlocks as block, i}
        <div class="code-block">
          <pre><code
              bind:this={codeElements[i]}
              class="language-{block.language}"
              style="white-space: pre-wrap; word-wrap: break-word;"
              >{block.content}</code
            ></pre>
          <div class="language-label">{block.language}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .project-code {
    margin: 16px 0;
  }

  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    border-radius: 4px;
  }

  .code-header:hover {
    background: var(--bg-tertiary);
  }

  .code-title {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .expand-icon {
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  .code-content {
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 4px 4px;
  }

  .code-block {
    position: relative;
    border-bottom: 1px solid #37373d;
    background: #181818;
    font-family: Menlo, Monaco, "Courier New", monospace;
  }

  .code-block:last-child {
    border-bottom: none;
    border-radius: 0 0 4px 4px;
  }

  .code-block pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;
  }

  .code-block code {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .language-label {
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 12px;
    color: #9b9b9b;
    font-family: inherit;
    text-transform: capitalize;
  }
</style>
