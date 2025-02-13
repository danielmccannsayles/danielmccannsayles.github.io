<script>
  import MdCell from "./components/MDCell.svelte";
  import Summary from "./pages/Summary.svelte";
  import WorkExperience from "./pages/WorkExperience.svelte";
  import Section from "./components/Section.svelte";
  import MacmProject from "./pages/projects/MacmProject.svelte";
  import AiGenerationProject from "./pages/projects/AIGenerationProject.svelte";
  import SpeechToLlmProject from "./pages/projects/SpeechToLLMProject.svelte";
  import CiscoHackathonProject from "./pages/projects/CiscoHackathonProject.svelte";
  import Form from "./components/Form.svelte";

  // All this just to have a clickable button in md that opens a form..
  let showForm = false;
  function toggleForm(event) {
    event.preventDefault();
    showForm = !showForm;
  }

  import { onMount } from "svelte";
  onMount(() => {
    const applyButton = document.querySelector('a[href="#apply-form"]');
    if (applyButton) {
      applyButton.addEventListener("click", toggleForm);
    }
  });
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />
  <Summary />
  <Form bind:showForm />
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
