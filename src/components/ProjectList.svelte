<script>
  import { slide } from "svelte/transition";
  import { projects } from "../data/projects.js";

  let expandedId = null;

  function toggleExpand(projectId) {
    expandedId = expandedId === projectId ? null : projectId;
  }

  function handleKeydown(event, projectId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand(projectId);
    }
  }
</script>

<div class="projects-container">
  <div class="projects-list">
    {#each projects as project (project.id)}
      <div class="project-card" class:expanded={expandedId === project.id}>
        <div
          class="project-blurb"
          on:click={() => toggleExpand(project.id)}
          on:keydown={(e) => handleKeydown(e, project.id)}
          role="button"
          tabindex="0"
        >
          <div class="project-header">
            <div class="project-info">
              <h3 class="project-title">{project.title}</h3>
              <div class="project-date">{project.date}</div>
            </div>
            <div class="expand-icon" class:rotated={expandedId === project.id}>
              <i class="codicon codicon-chevron-down"></i>
            </div>
          </div>
          <p class="project-summary">{project.summary}</p>
        </div>

        {#if expandedId === project.id}
          <div class="project-description" transition:slide={{ duration: 300 }}>
            {@html project.description
              .replace(/\n\n/g, "</p><p>")
              .replace(/\n/g, "<br>")
              .replace(/^/, "<p>")
              .replace(/$/, "</p>")}
          </div>
        {/if}
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

  .project-card {
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .project-blurb {
    padding: 20px;
    cursor: pointer;
  }

  .project-blurb:hover {
    background: var(--bg-tertiary);
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .project-info {
    flex: 1;
  }

  .project-title {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .project-date {
    font-size: 14px;
    color: var(--text-accent);
    font-weight: 500;
  }

  .expand-icon {
    margin-left: 12px;
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  .project-summary {
    margin: 0;
    line-height: 1.5;
    color: var(--text-primary);
  }

  .project-description {
    padding: 20px;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    line-height: 1.6;
    color: var(--text-primary);
  }

  .project-description :global(p) {
    margin: 0 0 16px 0;
  }

  .project-description :global(p:last-child) {
    margin-bottom: 0;
  }
</style>
