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
      {#if project.format === "external"}
        <!-- External project: show as link -->
        <div class="project-card external" id={project.id}>
          <a
            href={project.link || "https://google.com"}
            class="project-blurb external-link"
          >
            <div class="project-header">
              <div class="title-and-chips">
                <div class="project-info">
                  <h3 class="title">
                    {project.title}{#if project.subtitle}
                      <span class="subtitle">{" " + project.subtitle}</span
                      >{/if}
                  </h3>
                  <div class="date">{formatDateRange(project.date)}</div>
                </div>
                <div class="link">[ {project.link} ]</div>
              </div>

              <div class="external-icon">
                <i class="codicon codicon-link"></i>
              </div>
            </div>
            {#if verboseMode}
              <p class="project-summary">{project.summary}</p>
            {/if}
          </a>
        </div>
      {:else}
        <!-- Internal project: show with expand/collapse -->
        <div
          class="project-card"
          class:expanded={$expandedId === project.id}
          id={project.id}
        >
          <!-- Blurb is presentational element -->
          <div
            class="project-blurb"
            on:click={() => toggleExpand(project.id)}
            on:keydown={(e) => handleKeydown(e, project.id)}
            role="button"
            tabindex="0"
          >
            <div class="project-header">
              <div class="title-and-chips">
                <div class="project-info">
                  <h3 class="title">
                    {project.title}{#if project.subtitle}
                      <span class="subtitle">{" " + project.subtitle}</span
                      >{/if}
                  </h3>
                  <div class="date">{formatDateRange(project.date)}</div>
                </div>
                <ProjectChips {project} />
              </div>

              <div
                class="expand-icon"
                class:rotated={$expandedId === project.id}
              >
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
      {/if}
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
    scroll-margin-top: 80px; /* Counter offset from sticky menu!*/
  }

  .project-card.expanded {
    grid-template-rows: auto 1fr;
  }

  .project-card.external {
    display: block;
  }

  .project-blurb {
    padding: 20px;
    cursor: pointer;
  }
  .project-blurb:hover {
    background: var(--bg-tertiary);
  }

  /* Link, for non write-ups */

  .external-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .external-link:hover {
    background: var(--bg-tertiary);
  }

  .external-icon {
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .link {
    font-size: 12px;
    font-family: "SF Mono", Consolas, monospace;
    color: var(--text-faded);
  }

  /* Header, (info & icon) */

  .project-header {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: flex-start;
  }

  .expand-icon {
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  /* Title & chips, nested flexbox to drop chips*/
  .title-and-chips {
    flex: 1;
    gap: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  @media (max-width: 728px) {
    .title-and-chips {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  .project-info {
    flex: 1 0 auto;
  }

  .title {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .date {
    font-size: 12px;
    color: var(--text-accent);
    font-weight: 500;
  }

  /* Summary */

  .project-summary {
    font-size: 14px;
    padding-top: 12px;
    margin: 0;
    line-height: 1.5;
    color: var(--text-primary);
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
