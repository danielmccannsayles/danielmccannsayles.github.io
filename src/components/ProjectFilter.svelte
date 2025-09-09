<script>
  import MenuIcon from "../icons/MenuIcon.svelte";
  import GridIcon from "../icons/GridIcon.svelte";
  import VerboseIcon from "../icons/VerboseIcon.svelte";
  import ConciseIcon from "../icons/ConciseIcon.svelte";

  export let viewMode = "list"; // 'list' or 'grid'
  export let verboseMode = true; // true for verbose, false for concise
  export let onViewChange = () => {};
  export let onVerboseChange = () => {};

  function setViewMode(mode) {
    viewMode = mode;
    onViewChange(mode);
  }

  function toggleVerboseMode() {
    verboseMode = !verboseMode;
    onVerboseChange(verboseMode);
  }
</script>

<div class="filter-bar">
  <div class="filter-content">
    <h2 class="projects-title">Projects</h2>
    <div class="controls">
      <div class="view-toggle">
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
      </div>
      {#if viewMode === "list"}
        <div class="verbose-toggle">
          <button
            class="toggle-btn"
            class:active={verboseMode}
            on:click={toggleVerboseMode}
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
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
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
</style>
