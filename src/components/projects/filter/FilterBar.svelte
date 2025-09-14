<script>
  import {
    showExperienceOnly,
    toggleExperienceFilter,
    hasExperienceProjects,
    hasSeriesInFiltered,
    hasActiveFilters,
    clearAllFilters,
  } from "$stores";
  import SeriesDropdown from "./SeriesDropdown.svelte";
</script>

<div class="filter-chips">
  <button
    class="filter-chip"
    class:active={$showExperienceOnly}
    class:disabled={!$hasExperienceProjects}
    on:click={toggleExperienceFilter}
    disabled={!$hasExperienceProjects}
    title={$showExperienceOnly
      ? "Show all projects"
      : "Show work experience only"}
    aria-label={$showExperienceOnly
      ? "Show all projects"
      : "Show work experience only"}
  >
    work experience
  </button>

  <SeriesDropdown disabled={!$hasSeriesInFiltered} />

  <button
    class="clear-button"
    class:disabled={!$hasActiveFilters}
    on:click={clearAllFilters}
    disabled={!$hasActiveFilters}
    title="Clear all filters"
    aria-label="Clear all filters"
  >
    <i class="codicon codicon-circle-slash"></i>
  </button>
</div>

<style>
  .filter-chips {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
  }

  .filter-chip {
    padding: 6px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: transparent;
    color: var(--text-primary);
    font-size: 12px;
    font-family: "SF Mono", Consolas, monospace;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-chip:hover:not(:disabled):not(.active) {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  .filter-chip.active {
    background: var(--text-accent-blue);
    color: white;
    border-color: var(--text-accent-blue);
  }

  .filter-chip.active:hover:not(:disabled) {
    opacity: 0.8;
  }

  .filter-chip.disabled,
  .filter-chip:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .clear-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-left: -4px;
  }

  .clear-button:hover:not(:disabled) {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  .clear-button.disabled,
  .clear-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
