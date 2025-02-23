<script>
  import Form from "../components/Form.svelte";
  import MdCell from "../components/MDCell.svelte";
  import Section from "../components/Section.svelte";
  import chart from "../assets/chart.png";

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

<Section
  title="## Summary"
  subtitle="Hi! I'm Daniel.

I'm looking for a multi-functional position at a company that cares about 
making the world better through improving AI's ability to help progress scientific research
"
>
  <MdCell
    md="
Here's 3 key facts to get to know me:

* Background in UI - Angular, React, Figma
* Burgeoning experience in Python and ML
* Interested in improving the world through **safe** AI led research
 
And here's 3 words to describe me:

> Passionate, Creative, Collaborative

Here's a graphic condensing the past 5 years of my life into a few thousand pixels, for the visually inclined out there:
"
  />

  <img
    style="height: 200px; margin-left: 100px;"
    src={chart}
    alt={"A chart showing the pat 5 years of my life"}
  />

  <MdCell
    md="I want to combine user interaction/experience and machine learning to create

> AI-powered research for a better world

What are you waiting for? [Hire Me!](#apply-form)"
  />
  <Form bind:showForm />
</Section>
