<script>
  import { onMount } from "svelte";
  import MenuIcon from "../icons/MenuIcon.svelte";
  import GridIcon from "../icons/GridIcon.svelte";
  import VerboseIcon from "../icons/VerboseIcon.svelte";
  import ConciseIcon from "../icons/ConciseIcon.svelte";
  import ArrowUpIcon from "../icons/ArrowUpIcon.svelte";

  export let viewMode = "list"; // 'list' or 'grid'
  export let verboseMode = true; // true for verbose, false for concise
  export let onViewChange = () => {};
  export let onVerboseChange = () => {};

  let showScrollButton = false;
  let markerElement;

  function setViewMode(mode) {
    viewMode = mode;
    onViewChange(mode);
  }

  function toggleVerboseMode() {
    verboseMode = !verboseMode;
    onVerboseChange(verboseMode);
  }

  function scrollToProjects() {
    if (markerElement) {
      markerElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleScroll() {
    if (markerElement) {
      // Show button when we've scrolled past the filter
      showScrollButton = window.scrollY > markerElement.offsetTop;
    }
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<!-- Invisible marker div for scroll reference -->
<div class="projects-marker" bind:this={markerElement}></div>

<div class="filter-bar">
  <div class="filter-content">
    <div class="title-container">
      {#if showScrollButton}
        <button
          class="scroll-button"
          on:click={scrollToProjects}
          title="Scroll to top of projects"
          aria-label="Scroll to top of projects"
        >
          <ArrowUpIcon />
        </button>
      {/if}
      <h2 class="projects-title">Projects</h2>
    </div>
    <div class="controls">
      {#if viewMode === "list"}
        <div class="verbose-toggle">
          <button
            class="btn"
            class:active={verboseMode}
            on:click={toggleVerboseMode}
            title={verboseMode ? "Hide summaries" : "Show summaries"}
            aria-label={verboseMode
              ? "Switch to concise mode"
              : "Switch to verbose mode"}
          >
            {#if verboseMode}
              <VerboseIcon />
            {:else}
              <ConciseIcon />
            {/if}
          </button>
        </div>
      {/if}
      <!-- <div class="view-toggle">
        <button
          class="toggle-btn"
          class:active={viewMode === "list"}
          on:click={() => setViewMode("list")}
          aria-label="List view"
        >
          <MenuIcon />
        </button>
        <button
          class="toggle-btn"
          class:active={viewMode === "grid"}
          on:click={() => setViewMode("grid")}
          aria-label="Grid view"
        >
          <GridIcon />
        </button>
      </div> -->
    </div>
  </div>
</div>

<style>
  .filter-bar {
    width: 100%;
    background: var(--bg-primary);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .filter-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
  }

  .title-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .scroll-button {
    position: absolute;
    left: -44px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .scroll-button:hover {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  .projects-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .controls {
    display: flex;
    gap: 12px;
    align-items: center;
    height: 100%;
  }

  .view-toggle {
    display: flex;
    gap: 4px;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }

  .verbose-toggle {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .verbose-toggle .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .verbose-toggle .btn:hover {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 32px;
    background: var(--bg-primary);
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-btn:hover {
    background: var(--bg-tertiary);
  }

  .toggle-btn.active {
    background: var(--hover-bar-active);
    color: white;
  }

  .projects-marker {
    height: 0;
    width: 0;
    visibility: hidden;
  }
</style>
