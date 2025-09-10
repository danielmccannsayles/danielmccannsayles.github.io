<script>
  import { projects } from "../data/projects.js";
  import ProjectCard from "./ProjectCard.svelte";
  import "../styles/project-card.css";
  import { expandedId, toggleExpand } from "../stores/project-store.js";
  import { formatDateRange } from "../utils/dateFormatter.js";

  export let verboseMode = true;

  function handleKeydown(event, projectId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand(projectId);
    }
  }

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

<div class="projects-container">
  <div class="projects-list">
    {#each projects as project (project.id)}
      <div class="project-card" class:expanded={$expandedId === project.id}>
        <div
          class="project-blurb"
          on:click={() => toggleExpand(project.id)}
          on:keydown={(e) => handleKeydown(e, project.id)}
          role="button"
          tabindex="0"
        >
          <div class="project-header">
            <div class="project-info">
              <h3 class="project-title">
                {project.title}{#if project.subtitle}, <span
                    class="project-subtitle">{project.subtitle}</span
                  >{/if}
              </h3>
              <div class="project-date">{formatDateRange(project.date)}</div>
            </div>
            <div class="chips">
              <span class="chip">wc: {calculateWordCount(project)}</span>
              <span class="chip">format: {project.format || "unknown"}</span>
            </div>
            <div class="expand-icon" class:rotated={$expandedId === project.id}>
              <i class="codicon codicon-chevron-down"></i>
            </div>
          </div>
          {#if verboseMode || $expandedId === project.id}
            <p class="project-summary">{project.summary}</p>
          {/if}
        </div>

        <div class="project-description">
          {#if $expandedId === project.id}
            <ProjectCard {project} />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .projects-container {
    width: 100%;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .project-blurb:hover {
    background: var(--bg-tertiary);
  }

  .expand-icon {
    margin-left: 12px;
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  .project-description {
    overflow: hidden;
    font-size: 14px;
    color: var(--text-primary);
  }

  .project-description :global(.project-card-content) {
    padding: 20px;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    margin: 0;
  }

  .project-description :global(p) {
    margin: 0 0 16px 0;
  }

  .project-description :global(p:last-child) {
    margin-bottom: 0;
  }

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

  .project-subtitle {
    color: var(--text-primary);
    font-weight: 400;
    font-style: italic;
    /* font-size: 14px; */
  }
</style>
