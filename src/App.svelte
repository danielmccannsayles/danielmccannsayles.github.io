<script>
  import MdCell from "./components/MDCell.svelte";
  import Summary from "./pages/Summary.svelte";
  import WorkExperience from "./pages/WorkExperience.svelte";
  import Section from "./components/Section.svelte";
  import MacmProject from "./pages/projects/MacmProject.svelte";
  import AiGenerationProject from "./pages/projects/AIGenerationProject.svelte";
  import SpeechToLlmProject from "./pages/projects/SpeechToLLMProject.svelte";
  import CiscoHackathonProject from "./pages/projects/CiscoHackathonProject.svelte";
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />
  <Summary />
  <WorkExperience />

  <Section title="## Projects">
    <MacmProject />
    <AiGenerationProject />
    <SpeechToLlmProject />
    <CiscoHackathonProject />
  </Section>
</main>

<style>
</style>
