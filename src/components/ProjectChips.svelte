<script>
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
</script>

<div class="chips">
  {#if project.experience}
    <span class="chip experience-chip">work experience</span>
  {/if}
  
  <span class="chip">wc: {calculateWordCount(project)}</span>
  <span class="chip">format: {project.format || "unknown"}</span>
  
  {#if project.series}
    <span class="chip series-chip">
      {project.series.name}, v{project.series.number}
    </span>
  {/if}
</div>

<style>
  .chips {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .chip {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: "SF Mono", Consolas, monospace;
  }

  .series-chip {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
  }

  .experience-chip {
    background: #3b82f6;
    color: white;
  }
</style>