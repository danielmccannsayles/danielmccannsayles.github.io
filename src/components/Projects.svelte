<script>
  import ProjectFilter from "./ProjectFilter.svelte";
  import ProjectList from "./ProjectList.svelte";
  import ProjectGrid from "./ProjectGrid.svelte";

  let viewMode = "list";

  function handleViewChange(mode) {
    viewMode = mode;
  }
</script>

<ProjectFilter {viewMode} onViewChange={handleViewChange} />

<div class="projects-content">
  {#if viewMode === "list"}
    <ProjectList />
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