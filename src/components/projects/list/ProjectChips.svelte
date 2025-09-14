<script>
  import { toggleExperienceFilter, setSeriesFilter } from "$stores";

  export let project;

  function calculateWordCount(project) {
    if (!project.content) return 0;

    return project.content
      .filter((item) => item.type === "md")
      .reduce((total, item) => {
        const words = item.content
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        return total + words.length;
      }, 0);
  }

  function handleExperienceClick(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleExperienceFilter();
  }

  function handleSeriesClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (project.series) {
      setSeriesFilter(project.series.name);
    }
  }

  function handleKeydown(event, handler) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      handler(event);
    }
  }
</script>

<div class="chips">
  {#if project.experience}
    <button
      type="button"
      class="chip experience-chip clickable"
      on:click={handleExperienceClick}
      on:keydown={(event) => handleKeydown(event, handleExperienceClick)}
      aria-label="Filter by work experience projects"
    >
      work experience
    </button>
  {/if}

  <span class="chip">wc: {calculateWordCount(project)}</span>
  <span class="chip">format: {project.format || "unknown"}</span>

  {#if project.series}
    <button
      type="button"
      class="chip series-chip clickable"
      on:click={handleSeriesClick}
      on:keydown={(event) => handleKeydown(event, handleSeriesClick)}
      aria-label="Filter by {project.series.name} series"
    >
      {project.series.name}, v{project.series.number}
    </button>
  {/if}
</div>

<style>
  .chips {
    display: flex;
    flex: 0 1 auto;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .chip {
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: "SF Mono", Consolas, monospace;
    border: 1px solid var(--border);
    display: inline-block;
  }

  .series-chip {
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }

  .experience-chip {
    background: var(--text-accent-blue);
    color: white;
    border: 1px solid var(--text-accent-blue);
  }

  .clickable {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clickable:hover {
    outline: 2px solid var(--text-primary);
    outline-offset: 1px;
  }
</style>
