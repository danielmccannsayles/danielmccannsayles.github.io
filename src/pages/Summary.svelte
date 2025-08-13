<script>
  import MdCell from "../components/MDCell.svelte";
  import Section from "../components/Section.svelte";
  import chart from "../assets/chart.png";
</script>

<Section
  title="## Summary"
  subtitle="Hi! I'm Daniel.

*I want AI to go well and be broadly good for humanity*"
>
  <MdCell
    md="
  I like doing: Coding, Creating, Iterating, Learning, Writing ..
    
Here's ~3 facts to get to know me:

* Background in UI - Angular, React, Figma
  * 2 years of paid experience
  * 5 total 
* Burgeoning experience w/ Python, ML, LLMs
  * 1.5 years of projects, courses/self-learning, work opportunities 
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
"
  />
</Section>

<style>
  .img-container {
    margin: 0 100px; /* 100px margin on left and right */
    max-width: 100%; /* Ensures it doesn't overflow */
    background-color: #181818;
    border: 1px #2b2b2b solid;
    border-radius: 10px;
  }

  .img-container > img {
    width: 100%; /* Makes the image fill the container */
    height: auto; /* Maintains aspect ratio */
  }
</style>
