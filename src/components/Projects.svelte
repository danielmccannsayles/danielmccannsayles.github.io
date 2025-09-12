<script>
  import { ProjectFilter, ProjectList, ProjectGrid, ProjectTimeline } from "./projects";

  let viewMode = "list";
  let verboseMode = true;

  function handleViewChange(mode) {
    viewMode = mode;
  }

  function handleVerboseChange(verbose) {
    verboseMode = verbose;
  }
</script>

<ProjectFilter
  {viewMode}
  {verboseMode}
  onViewChange={handleViewChange}
  onVerboseChange={handleVerboseChange}
/>

<div class="projects-content">
  {#if viewMode === "list"}
    <ProjectList {verboseMode} />
  {:else if viewMode === "timeline"}
    <ProjectTimeline {verboseMode} />
  {:else}
    <ProjectGrid />
  {/if}
</div>

<style>
  .projects-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 30px;
  }
</style>
