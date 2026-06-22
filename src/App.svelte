<script>
  import { photo26 } from "$assets";
  import { GithubIcon, LinkedInIcon, TwitterIcon } from "$icons";
  import StarBackground from "./components/StarBackground.svelte";
  import SoftBodyCat from "./components/SoftBodyCat.svelte";
  import WatercolorTest from "./components/WatercolorTest.svelte";
</script>

<StarBackground />
<SoftBodyCat />

<main>
  <div class="card-section">
    <div class="card">
      <img src={photo26} alt="Daniel McCann-Sayles" class="photo" />
      <div class="info">
        <h1>Daniel McCann-Sayles</h1>
        <p class="tagline">
          Working to make AI go well & be broadly good for humanity
        </p>
        <p class="tagline">
          Building private gardens for thought at <a
            href="https://tinfoil.sh"
            target="_blank"
            rel="noopener"
            class="tagline-link">Tinfoil</a
          >
        </p>
      </div>
    </div>
    <div class="things">
      <div class="thing-row">
        <span class="thing-date">06/2026</span>
        <a
          href="https://tinfoil.sh/blog/2026-06-09-auditing-frontier-model-without-weights"
          >[ Auditing closed source models ]</a
        >
      </div>
      <div class="thing-row">
        <span class="thing-date">03/2026</span>
        <a href="https://www.workshoplabs.ai/blog/private-post-training"
          >[ Private Post-Training ]</a
        >
      </div>
      <div class="thing-row">
        <span class="thing-date">10/2025</span>
        <a href="https://www.workshoplabs.ai">[ Workshop Labs ]</a>
      </div>
    </div>
    <div class="links">
      <a
        href="https://github.com/danielmccannsayles"
        target="_blank"
        rel="noopener"
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/daniel-mccann-sayles/"
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        href="https://x.com/DanielMcCannSay"
        target="_blank"
        rel="noopener"
        aria-label="Twitter"
      >
        <TwitterIcon />
      </a>
    </div>
  </div>
</main>
