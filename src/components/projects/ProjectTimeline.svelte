<script>
  import { ProjectCard, ProjectChips } from "./list";
  import "../../styles/project-card.css";
  import {
    expandedId,
    toggleExpand,
    timelineProjects,
  } from "$stores";
  import { formatDateRange } from "../../utils";

  export let verboseMode = true;

  function handleKeydown(event, projectId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand(projectId);
    }
  }
</script>

<div class="timeline-container">
  <div class="timeline-list">
    {#each $timelineProjects as { project, level, startDate, endDate } (project.id)}
      <div 
        class="timeline-project" 
        class:expanded={$expandedId === project.id}
        style="--level: {level}; --indent: {level * 40}px;"
      >
        <div class="timeline-lines">
          <!-- Create vertical lines for each level up to this project's level -->
          {#each Array(level + 1) as _, i}
            <div class="timeline-line" style="left: {i * 40}px;"></div>
          {/each}
        </div>
        
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
      </div>
    {/each}
  </div>
</div>

<style>
  .timeline-container {
    width: 100%;
    padding-left: 20px;
  }

  .timeline-list {
    display: flex;
    flex-direction: column;
  }

  .timeline-project {
    position: relative;
    margin-bottom: 40px;
  }

  .timeline-lines {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    pointer-events: none;
  }

  .timeline-line {
    position: absolute;
    width: 2px;
    height: 100%;
    background: var(--border);
    top: 0;
  }

  .project-card {
    margin-left: var(--indent);
    padding-left: 20px;
    position: relative;
  }

  .project-card::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 20px;
    width: 6px;
    height: 6px;
    background: var(--hover-bar-active);
    border-radius: 50%;
    transform: translateX(-50%);
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
  }

  @media (max-width: 768px) {
    .timeline-container {
      padding-left: 10px;
    }
    
    .timeline-project {
      margin-bottom: 20px;
    }
    
    .project-card {
      margin-left: calc(var(--indent) * 0.5);
      padding-left: 15px;
    }
  }
</style>