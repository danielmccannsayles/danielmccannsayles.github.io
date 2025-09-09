<script>
  import { slide } from "svelte/transition";
  import { projects } from "../data/projects.js";
  import "../styles/project-card.css";

  let expandedId = null;
  let sidePanelVisible = false;

  function toggleExpand(projectId) {
    if (expandedId === projectId) {
      closeSidePanel();
    } else {
      showSidePanel(projectId);
    }
  }

  function showSidePanel(projectId) {
    expandedId = projectId;
    sidePanelVisible = true;
  }

  function closeSidePanel() {
    sidePanelVisible = false;
    setTimeout(() => {
      expandedId = null;
    }, 300);
  }

  function handleKeydown(event, projectId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand(projectId);
    }
  }

  $: selectedProject = projects.find((p) => p.id === expandedId);
</script>

<div class="projects-container" class:has-side-panel={sidePanelVisible}>
  <div class="projects-grid">
    {#each projects as project (project.id)}
      <div class="project-card" class:selected={expandedId === project.id}>
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
          </div>
          <p class="project-summary">{project.summary}</p>
        </div>
      </div>
    {/each}
  </div>

  {#if sidePanelVisible && selectedProject}
    <div class="side-panel" transition:slide={{ duration: 300, axis: "x" }}>
      <div class="side-panel-header">
        <h3>{selectedProject.title}</h3>
        <button
          class="close-btn"
          on:click={closeSidePanel}
          aria-label="Close panel"
        >
          <i class="codicon codicon-close"></i>
        </button>
      </div>
      <div class="side-panel-date">{selectedProject.date}</div>
      <div class="side-panel-content">
        {@html selectedProject.description
          .replace(/\n\n/g, "</p><p>")
          .replace(/\n/g, "<br>")
          .replace(/^/, "<p>")
          .replace(/$/, "</p>")}
      </div>
    </div>
  {/if}
</div>

<style>
  .projects-container {
    position: relative;
    transition: margin-right 0.3s ease;
  }

  .projects-container.has-side-panel {
    margin-right: 100px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }

  .project-card:hover {
    background: var(--bg-tertiary);
  }

  .project-card.selected {
    background: var(--bg-tertiary);
  }

  .side-panel {
    position: absolute;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background: var(--bg-secondary);
    border-left: 1px solid var(--border);
    padding: 24px;
    overflow-y: auto;
    z-index: 50;
  }

  .side-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .side-panel-header h3 {
    margin: 0;
    color: var(--text-secondary);
    font-size: 20px;
    font-weight: 600;
    flex: 1;
    margin-right: 12px;
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    background: var(--bg-tertiary);
  }

  .side-panel-date {
    font-size: 14px;
    color: var(--text-accent);
    font-weight: 500;
    margin-bottom: 20px;
  }

  .side-panel-content {
    line-height: 1.6;
    color: var(--text-primary);
  }

  .side-panel-content :global(p) {
    margin: 0 0 16px 0;
  }

  .side-panel-content :global(p:last-child) {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .projects-container.has-side-panel {
      margin-right: 0;
    }

    .side-panel {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      width: 100%;
      height: calc(100vh - 80px);
    }
  }
</style>
