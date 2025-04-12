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

*I'm looking for a multi-functional (backend/data-oriented) position at a company that cares about 
improving the world through __applied safe AI__*
"
>
  <MdCell
    md="That's a mouthful, so here's 3 facts (approx.) to get to know me:

* Background in UI - Angular, React, Figma
  * 2 years of paid experience
  * 4 total w/o
* Burgeoning experience w/ Python and ML
  * 1 year of projects, courses/self-learning, work opportunities 
* Excited about AI's *potential*, worried about AI's *risks*

Visually inclined? Here's a graphic condensing the past 5 years of my life into a few thousand pixels:
"
  />

  <div class="img-container">
    <img src={chart} alt={"A chart showing the pat 5 years of my life"} />
  </div>

  <MdCell
    md="What I bring to the table:

> Passionate, Creative, Collaborative 
 
  What are you waiting for? [Hire Me!](#apply-form)"
  />
  <Form bind:showForm />
</Section>

<style>
  .img-container {
    margin: 0 100px; /* 100px margin on left and right */
    max-width: 100%; /* Ensures it doesn't overflow */
    background-color: #181818;
    border: 1px #2b2b2b solid;
  }

  .img-container > img {
    width: 100%; /* Makes the image fill the container */
    height: auto; /* Maintains aspect ratio */
  }
</style>
