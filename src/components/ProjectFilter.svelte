<script>
  import MenuIcon from "../icons/MenuIcon.svelte";
  import GridIcon from "../icons/GridIcon.svelte";

  export let viewMode = "list"; // 'list' or 'grid'
  export let onViewChange = () => {};

  function setViewMode(mode) {
    viewMode = mode;
    onViewChange(mode);
  }
</script>

<div class="filter-bar">
  <div class="filter-content">
    <h2 class="projects-title">Projects</h2>
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
  </div>
</div>

<style>
  .filter-bar {
    width: 100%;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border);
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
  }

  .projects-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .view-toggle {
    display: flex;
    gap: 4px;
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
