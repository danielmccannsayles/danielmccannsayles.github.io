<script>
  import { onMount } from "svelte";
  import { theme } from "./stores/themeStore.js";
  import Header from "./components/Header.svelte";
  import About from "./components/About.svelte";
  import Projects from "./components/Projects.svelte";
  import picture from "./assets/me/picture.jpg";
  import Featured from "./components/Featured.svelte";
  import { featuredItems } from "./data/featured.js";

  onMount(() => {
    document.documentElement.setAttribute("data-theme", $theme);
  });
</script>

<Header />

<main>
  <div class="intro">
    <div class="intro-content">
      <img src={picture} alt="Daniel" class="profile-picture" />
      <div class="intro-text">
        <p class="subtitle">Hi! I'm Daniel.</p>
        <p class="mission">
          <em>I want AI to go well and be broadly good for humanity.</em>
        </p>
        <p class="availability">
          I'm working towards this now. Open to correspondence & collaboration.
        </p>
      </div>
    </div>
  </div>

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

  .intro {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .intro-content {
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  .profile-picture {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid var(--border);
    flex-shrink: 0;
  }

  .intro-text {
    flex: 1;
  }

  @media (max-width: 600px) {
    .intro-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .profile-picture {
      width: 150px;
      height: 150px;
    }
  }

  em {
    color: var(--text-secondary);
  }
</style>
