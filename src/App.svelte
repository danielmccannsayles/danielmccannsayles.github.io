<script>
  import { resume, photo26 } from "$assets";
  import { GithubIcon, ResumeIcon, LinkedInIcon } from "$icons";
  import StarBackground from "./components/StarBackground.svelte";
  import SoftBodyCat from "./components/SoftBodyCat.svelte";
  import WatercolorTest from "./components/WatercolorTest.svelte";
</script>

<StarBackground />
<SoftBodyCat />

<main>
  <div class="card">
    <img src={photo26} alt="Daniel McCann-Sayles" class="photo" />
    <div class="info">
      <h1>Daniel McCann-Sayles</h1>
      <p class="tagline">
        Working to make AI go well & be broadly good for humanity.
      </p>
      <p class="tagline">
        Currently making humans irreplaceable at <a href="https://www.workshoplabs.ai" target="_blank" rel="noopener" class="tagline-link">Workshop Labs</a>
      </p>
    </div>
  </div>
  <div class="things">
    <div class="thing-row">
      <span class="thing-date">2026</span>
      <a href="https://www.workshoplabs.ai/blog/private-post-training"
        >[ Private Post Training ]</a
      >
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
    <a href={resume} target="_blank" rel="noopener" aria-label="Resume">
      <ResumeIcon />
    </a>
    <a
      href="https://www.linkedin.com/in/daniel-mccann-sayles/"
      target="_blank"
      rel="noopener"
      aria-label="LinkedIn"
    >
      <LinkedInIcon />
    </a>
  </div>
</main>
