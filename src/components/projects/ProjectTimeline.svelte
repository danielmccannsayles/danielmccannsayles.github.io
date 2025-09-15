<script>
  import { ProjectCard, ProjectChips } from "./list";
  import "../../styles/project-card.css";
  import {
    expandedId,
    toggleExpand,
    timelineProjects,
    maxTimelineLevel,
  } from "$stores";
  import { formatDateRange } from "../../utils";

  export let verboseMode = true;

  function handleKeydown(event, projectId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpand(projectId);
    }
  }

  let projectElements = {};
  let timelineContainer;

  // Calculate line spans for each level
  $: lineSpans = (() => {
    const spans = {};
    
    // For each project, determine where lines should start and end
    $timelineProjects.forEach(({ project, level, endDate }, projectIndex) => {
      if (!spans[level]) {
        spans[level] = [];
      }
      
      // Find where this line should end - when the next project at this level or left starts
      let endIndex = projectIndex;
      
      // Look at subsequent projects
      for (let i = projectIndex + 1; i < $timelineProjects.length; i++) {
        const nextProject = $timelineProjects[i];
        // If next project is at same level or further left, this line ends
        if (nextProject.level <= level) {
          endIndex = i - 1;
          break;
        }
        // Otherwise line continues through this project
        endIndex = i;
      }
      
      spans[level].push({
        startIndex: projectIndex,
        endIndex: endIndex,
        project: project
      });
    });
    
    return spans;
  })();

  // Calculate actual line positions based on DOM elements
  $: linePositions = (() => {
    if (!timelineContainer) return [];
    
    const positions = [];
    
    Object.entries(lineSpans).forEach(([level, segments]) => {
      segments.forEach((segment, segmentIndex) => {
        const startElement = projectElements[segment.project.id];
        const endElement = projectElements[$timelineProjects[segment.endIndex]?.project.id];
        
        if (startElement && endElement) {
          const containerRect = timelineContainer.getBoundingClientRect();
          const startRect = startElement.getBoundingClientRect();
          const endRect = endElement.getBoundingClientRect();
          
          positions.push({
            level: parseInt(level),
            top: startRect.top - containerRect.top,
            height: (endRect.top - startRect.top) + (endRect.height * 0.8),
            segmentIndex: `${level}-${segmentIndex}`
          });
        }
      });
    });
    
    return positions;
  })();
</script>

<div class="timeline-container" bind:this={timelineContainer}>
  <!-- Render continuous vertical lines first -->
  <div class="continuous-lines">
    {#each linePositions as position}
      <div 
        class="continuous-line" 
        style="left: {position.level * 40}px; top: {position.top}px; height: {position.height}px;"
        data-level={position.level}
        data-segment={position.segmentIndex}
      ></div>
    {/each}
  </div>

  <!-- Render project boxes separately with spacing -->
  <div class="timeline-projects">
    {#each $timelineProjects as { project, level } (project.id)}
      <div 
        class="timeline-project" 
        class:expanded={$expandedId === project.id}
        style="--level: {level}; --indent: {level * 40}px;"
        bind:this={projectElements[project.id]}
      >
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
    position: relative;
  }

  /* Continuous vertical lines that span the entire timeline */
  .continuous-lines {
    position: absolute;
    top: 0;
    left: 20px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .continuous-line {
    position: absolute;
    width: 16px;
    background: var(--hover-bar-active);
    transition: all 0.2s ease;
    cursor: pointer;
    pointer-events: auto;
  }

  .continuous-line:hover {
    background: var(--text-primary);
    width: 18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  /* Project containers with proper spacing */
  .timeline-projects {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Spacing between project boxes */
    position: relative;
    z-index: 2;
  }

  .timeline-project {
    position: relative;
  }

  .project-card {
    margin-left: var(--indent);
    padding-left: 24px; /* Space from the vertical lines */
    position: relative;
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

    .continuous-lines {
      left: 10px;
    }
    
    .continuous-line {
      width: 12px;
    }
    
    .continuous-line:hover {
      width: 14px;
    }
    
    .timeline-projects {
      gap: 16px; /* Smaller gap on mobile */
    }
    
    .project-card {
      margin-left: calc(var(--indent) * 0.5);
      padding-left: 20px;
    }
  }
</style>