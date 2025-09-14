<script>
  import { ProjectCard, ProjectChips } from "./list";
  import "../../styles/project-card.css";
  import { expandedId, toggleExpand, filteredProjects } from "$stores";
  import { formatDateRange } from "../../utils";

  export let verboseMode = true;

  function handleKeydown(event, projectId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand(projectId);
    }
  }
</script>

<div class="projects-container">
  <div class="projects-list">
    {#each $filteredProjects as project (project.id)}
      <div class="project-card" class:expanded={$expandedId === project.id}>
        <!-- Blurb is presentational element -->
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
                {project.title}{#if project.subtitle}
                  <span class="subtitle">{" " + project.subtitle}</span>{/if}
              </h3>
              <div class="project-date">{formatDateRange(project.date)}</div>
            </div>
            <ProjectChips {project} />
            <div class="expand-icon" class:rotated={$expandedId === project.id}>
              <i class="codicon codicon-chevron-down"></i>
            </div>
          </div>
          {#if verboseMode || $expandedId === project.id}
            <p class="project-summary">{project.summary}</p>
          {/if}
        </div>

        <div class="content">
          {#if $expandedId === project.id}
            <ProjectCard {project} />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* List, card, blurb */
  .projects-container {
    width: 100%;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .project-card {
    display: grid;
    grid-template-rows: auto 0fr;
    transition: grid-template-rows 300ms ease-out;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .project-card.expanded {
    grid-template-rows: auto 1fr;
  }

  .project-blurb {
    padding: 20px;
    cursor: pointer;
  }
  .project-blurb:hover {
    background: var(--bg-tertiary);
  }

  /* Header */

  .project-header {
    display: flex;
    justify-content: space-between;
    gap: 6px;
    align-items: flex-start;
  }

  .project-info {
    flex: 1 0 auto;
  }

  .project-title {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .project-date {
    font-size: 12px;
    color: var(--text-accent);
    font-weight: 500;
  }

  .project-summary {
    font-size: 14px;
    padding-top: 12px;
    margin: 0;
    line-height: 1.5;
    color: var(--text-primary);
  }

  .expand-icon {
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  /* The actual content, writeup, etc. */

  .content {
    overflow: hidden;
    font-size: 14px;
    color: var(--text-primary);
  }

  .content :global(.project-card-content) {
    padding: 20px;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    margin: 0;
  }

  .content :global(p) {
    margin: 0 0 16px 0;
  }

  .content :global(p:last-child) {
    margin-bottom: 0;
  }

  .subtitle {
    color: var(--text-primary);
    font-weight: 400;
    font-style: italic;
  }
</style>
