<script>
  import { onMount } from "svelte";
  import { theme } from "./stores/themeStore.js";
  import Header from "./components/Header.svelte";
  import ProjectFilter from "./components/ProjectFilter.svelte";
  import ProjectList from "./components/ProjectList.svelte";

  let viewMode = "list";

  function handleViewChange(mode) {
    viewMode = mode;
  }

  onMount(() => {
    document.documentElement.setAttribute("data-theme", $theme);
  });
</script>

<Header />

<main>
  <div class="intro">
    <p class="subtitle">Hi! I'm Daniel.</p>
    <p class="mission">
      <em>I want AI to go well and be broadly good for humanity.</em>
    </p>
    <p class="availability">
      I'm working towards this now. Open to correspondence & collaboration.
    </p>
  </div>

  <div class="about">
    <p>
      I like <em>doing</em>. Coding, Creating, Iterating, Learning, Writing..
    </p>
    <p>Here are some things I've done:</p>
  </div>
</main>

<ProjectFilter {viewMode} onViewChange={handleViewChange} />

<div class="projects-content">
  <ProjectList {viewMode} />
</div>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 30px;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .intro {
    margin-bottom: 40px;
  }

  .availability {
    margin-bottom: 0;
  }

  .about {
    margin-bottom: 48px;
  }

  .projects-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px 30px;
  }

  em {
    color: var(--text-secondary);
  }
</style>
