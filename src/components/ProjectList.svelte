<script>
  import { slide } from "svelte/transition";
  import { projects } from "../data/projects.js";

  export let viewMode = "list";

  let expandedId = null;
  let sidePanelVisible = false;

  function toggleExpand(projectId) {
    if (viewMode === "list") {
      expandedId = expandedId === projectId ? null : projectId;
    } else {
      // Grid mode - show side panel
      if (expandedId === projectId) {
        closeSidePanel();
      } else {
        showSidePanel(projectId);
      }
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

  // Close side panel when switching to list mode
  $: if (viewMode === "list" && sidePanelVisible) {
    closeSidePanel();
  }
</script>

<div
  class="projects-container"
  class:has-side-panel={sidePanelVisible && viewMode === "grid"}
>
  <div
    class="projects-grid"
    class:list-mode={viewMode === "list"}
    class:grid-mode={viewMode === "grid"}
  >
    {#each projects as project (project.id)}
      <div
        class="project-card"
        class:expanded={expandedId === project.id && viewMode === "list"}
        class:selected={expandedId === project.id && viewMode === "grid"}
      >
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
            <div
              class="expand-icon"
              class:rotated={expandedId === project.id && viewMode === "list"}
            >
              <i class="codicon codicon-chevron-down"></i>
            </div>
          </div>
          <p class="project-summary">{project.summary}</p>
        </div>

        {#if expandedId === project.id && viewMode === "list"}
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

  {#if sidePanelVisible && viewMode === "grid" && selectedProject}
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
    width: 100%;
  }

  .projects-grid.list-mode {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .projects-grid.grid-mode {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }

  .project-card {
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .project-card.selected {
    border-color: var(--hover-bar-active);
  }

  .project-blurb {
    padding: 20px;
    cursor: pointer;
  }

  .project-blurb:hover {
    border-color: var(--hover-bar);
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

  .grid-mode .expand-icon {
    display: none;
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
    .projects-grid.grid-mode {
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
