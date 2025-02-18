<script>
  import MdCell from "./components/MDCell.svelte";
  import Summary from "./pages/Summary.svelte";
  import WorkExperience from "./pages/WorkExperience.svelte";
  import Section from "./components/Section.svelte";
  import MacmProject from "./pages/projects/MacmProject.svelte";
  import AiGenerationProject from "./pages/projects/AIGenerationProject.svelte";
  import SpeechToLlmProject from "./pages/projects/SpeechToLLMProject.svelte";
  import CiscoHackathonProject from "./pages/projects/CiscoHackathonProject.svelte";
  import KidFightGameProject from "./pages/projects/KidFightGameProject.svelte";
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />
  <Summary />
  <WorkExperience />

  <Section
    title="## Projects"
    subtitle="A collection of projects from 2024 -> onwards that I've done at work, on my own, and with others. All focused on ML, LLMs, and Python "
  >
    <KidFightGameProject />
    <MacmProject />
    <AiGenerationProject />
    <SpeechToLlmProject />
    <CiscoHackathonProject />
  </Section>
</main>
