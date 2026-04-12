<script>
  import { resume, photo26 } from "$assets";
  import { GithubIcon, ResumeIcon, LinkedInIcon } from "$icons";
  import StarBackground from "./components/StarBackground.svelte";
  import SoftBodyCat from "./components/SoftBodyCat.svelte";
  import WatercolorTest from "./components/WatercolorTest.svelte";
</script>

<WatercolorTest />
<StarBackground />
<SoftBodyCat />

<main>
  <div class="card">
    <img src={photo26} alt="Daniel McCann-Sayles" class="photo" />
    <div class="info">
      <h1>Daniel McCann-Sayles</h1>
      <p class="tagline">
        Working to make AI go well & be broadly good for humanity
      </p>
    </div>
  </div>
  <div class="things">
    <a href="/blog">[ Blog ]</a>
    <a href="/projects">[ Projects ]</a>
    <a href="/notes">[ Notes ]</a>
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
