<script>
  import { onMount } from "svelte";
  import { theme } from "$stores/themeStore.js";
  import Header from "./components/Header.svelte";
  import About from "./components/summary/About.svelte";
  import Projects from "./components/Projects.svelte";
  import Intro from "./components/summary/Intro.svelte";
  onMount(() => {
    document.documentElement.setAttribute("data-theme", $theme);
  });
</script>

<Header />

<main>
  <Intro />
  <About />

  <!-- <p>Featured:</p>
  <Featured {featuredItems} /> -->

  <p style="margin-top:24px">
    Below is a chronological collection of work that I've done. Some are
    write-ups, some link to external projects. Filter bar available for your
    convenience.
  </p>
</main>

<Projects />

<div class="footnote"></div>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 30px;
    line-height: 1.2;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .footnote {
    margin-bottom: 20px;
  }
</style>
