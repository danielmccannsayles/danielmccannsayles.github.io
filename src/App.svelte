<script>
  import { onMount } from "svelte";
  import { theme } from "./stores/themeStore.js";
  import Header from "./components/Header.svelte";

  onMount(() => {
    document.documentElement.setAttribute("data-theme", $theme);
  });
</script>

<Header />

<main>
  <p class="subtitle">Hi! I'm Daniel.</p>
  <p class="tagline">
    <em>I want AI to go well and be broadly good for humanity.</em>
    I'm working towards this now. Open to correspondence & collaboration.
  </p>
  <p>I like <em>doing</em>. Coding, Creating, Iterating, Learning, Writing..</p>
  <p>Here are some things I've done:</p>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    line-height: 1.6;
  }

  .subtitle {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .tagline {
    font-size: 16px;
    margin-bottom: 32px;
  }

  p {
    margin-bottom: 16px;
  }

  em {
    color: var(--text-secondary);
  }
</style>
