<script>
  import Form from "../components/Form.svelte";
  import MdCell from "../components/MDCell.svelte";
  import Section from "../components/Section.svelte";

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

<Section title="## Summary">
  <MdCell
    md="
Hi! I'm Daniel. Here's 3 key facts to get to know me:

* Background in UI - Angular, React, Figma
* Burgeoning experience in Python and ML
* Interested in improving the world through **safe** AI led research
 
And here's 3 words to describe me:

> Passionate, Creative, Collaborative

I want to combine user interaction/experience and machine learning to create

> AI-powered research for a better world

What are you waiting for? [Hire Me!](#apply-form)"
  />

  <Form bind:showForm />
</Section>
