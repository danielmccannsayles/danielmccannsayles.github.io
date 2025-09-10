<script>
  import { onMount } from "svelte";
  import { theme } from "$stores/themeStore.js";
  import Header from "./components/Header.svelte";
  import About from "./components/About.svelte";
  import Projects from "./components/Projects.svelte";
  import Intro from "./components/Intro.svelte";

  import Featured from "./components/Featured.svelte";
  import { featuredItems } from "./data/featured.js";

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

  <p>
    On my portfolio you can find an unordered collection of work that I've done.
    Some are writeups, some link to external projects. Along with this I proved
    a filter bar so you can browse at your leisure.
  </p>
</main>

<Projects />

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 0px 30px;
    line-height: 1.2;
    font-size: 16px;
    margin-bottom: 10px;
  }
</style>
