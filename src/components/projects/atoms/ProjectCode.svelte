<script>
  import { slide } from "svelte/transition";
  import { tick } from "svelte";
  import hljs from "highlight.js";
  import { theme } from "$stores";

  export let codeBlocks = []; // Array of {content: string, language: string}
  export let title = "Code";

  let expanded = false;
  let codeElements = [];
  let currentThemeLink = null;

  function toggleExpanded() {
    expanded = !expanded;
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  }

  function loadThemeCSS(themeName) {
    // Remove existing theme link if it exists
    if (currentThemeLink) {
      currentThemeLink.remove();
    }

    // Create and add new theme link
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      themeName === "dark"
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-light.min.css";

    document.head.appendChild(link);
    currentThemeLink = link;
  }

  function rehighlightCode() {
    if (expanded && codeElements.length > 0) {
      codeElements.forEach((element) => {
        if (element) {
          // Remove existing highlighting
          element.removeAttribute("data-highlighted");
          element.className = element.className.replace(/hljs[^ ]*/g, "");
          // Re-highlight with new theme
          hljs.highlightElement(element);
        }
      });
    }
  }

  // Load theme CSS and re-highlight when theme changes
  $: if (typeof window !== "undefined") {
    loadThemeCSS($theme);
    // Small delay to ensure CSS is loaded before re-highlighting
    setTimeout(rehighlightCode, 100);
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
    <div
      class="code-content theme-{$theme}"
      transition:slide={{ duration: 300 }}
    >
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
    border-bottom: 1px solid var(--border);
    font-family: Menlo, Monaco, "Courier New", monospace;
  }

  .code-block:last-child {
    border-bottom: none;
    border-radius: 0 0 4px 4px;
    margin-bottom: 0;
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

  /* Theme-specific overrides for highlight.js */
  .theme-dark .code-block {
    background: #181818;
  }

  .theme-light .code-block {
    background: #fafafa;
  }

  .theme-light .language-label {
    color: #666;
  }
</style>
