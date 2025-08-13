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
  import QuickLinks from "./pages/QuickLinks.svelte";
  import Current from "./pages/Current.svelte";
  import ArenaProject from "./pages/projects/ArenaProject.svelte";
  import PortfolioWebsite from "./pages/projects/PortfolioWebsite.svelte";
  import MATSApplication from "./pages/projects/MATSApplication.svelte";
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />
  <QuickLinks />
  <Summary />
  <Current />
  <WorkExperience />

  <Section
    title="## Projects, Learning, Explorations"
    subtitle="A collection of self-contained snippets of work from 2024 onwards that I've done at work, on my own, and with others."
    hideToStart="true"
  >
    <MATSApplication />
    <ArenaProject />
    <PortfolioWebsite />
    <KidFightGameProject />
    <MacmProject />
    <AiGenerationProject />
    <SpeechToLlmProject />
    <CiscoHackathonProject />
  </Section>
</main>
