<script>
  import {
    showExperienceOnly,
    toggleExperienceFilter,
    filteredProjects,
    hasExperienceProjects,
    hasSeriesInFiltered,
  } from "../stores/project-store.js";
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
</div>

<style>
  .filter-chips {
    display: flex;
    gap: 8px;
    align-items: center;
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

  .filter-chip:hover:not(:disabled) {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  .filter-chip.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  .filter-chip.disabled,
  .filter-chip:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>