<script>
  import ProjectCard from "./ProjectCard.svelte";
  import ProjectChips from "./ProjectChips.svelte";
  import "../styles/project-card.css";
  import {
    expandedId,
    toggleExpand,
    filteredProjects,
  } from "../stores/project-store.js";
  import { formatDateRange } from "../utils/dateFormatter.js";

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
                  <span class="project-subtitle">{" " + project.subtitle}</span
                  >{/if}
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

  .project-subtitle {
    color: var(--text-primary);
    font-weight: 400;
    font-style: italic;
    /* font-size: 14px; */
  }
</style>
