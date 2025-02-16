<script>
  import MdCell from "./components/MDCell.svelte";
  import Summary from "./pages/Summary.svelte";
  import WorkExperience from "./pages/WorkExperience.svelte";
  import Section from "./components/Section.svelte";
  import MacmProject from "./pages/projects/MacmProject.svelte";
  import AiGenerationProject from "./pages/projects/AIGenerationProject.svelte";
  import SpeechToLlmProject from "./pages/projects/SpeechToLLMProject.svelte";
  import CiscoHackathonProject from "./pages/projects/CiscoHackathonProject.svelte";
  import TitleCell from "./components/TitleCell.svelte";
  import diff from "./imgs/diff.png";
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />
  <!--  Test title => adding subtitle blurb -->
  <TitleCell title="### Test title" subtitle="Test subtitle">
    <div class="content-flex">
      <div class="text-content">HIIII CONTENT CONTENT</div>
      <div class="image-container" style="--image-width: 30%;">
        <img class="image-content" src={diff} alt="" />
      </div>
    </div>
  </TitleCell>
  <Summary />

  <WorkExperience />

  <Section
    title="## Projects"
    subtitle="A collection of projects from 2024 -> onwards that I've done at work, on my own, and with others. All focused on ML, LLMs, and Python "
  >
    <MacmProject />
    <AiGenerationProject />
    <SpeechToLlmProject />
    <CiscoHackathonProject />
  </Section>
</main>

<style>
  .content-flex {
    display: flex;
    align-items: center;
    gap: 10%;
  }

  .text-content {
    flex: 1;
  }

  .image-container {
    flex: 0 0 var(--image-width, 30%);
    max-width: var(--image-width, 30%);
  }

  .image-content {
    width: 100%;
    height: auto;
  }
</style>
