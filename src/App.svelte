<script>
  import { onMount } from "svelte";
  import { theme } from "./stores/themeStore.js";
  import Header from "./components/Header.svelte";
  import About from "./components/About.svelte";
  import Projects from "./components/Projects.svelte";

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

<About />

<Projects />

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 30px;
    line-height: 1.2;
    font-size: 16px;
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

  em {
    color: var(--text-secondary);
  }
</style>
