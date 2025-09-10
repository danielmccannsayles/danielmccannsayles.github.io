<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  import chart from "../assets/chart.png";

  const aboutText = `Here's ~3 facts to get to know me:

* Background in UI - Angular, React, Figma
  * 2 years of paid experience
  * 5 total 
* Burgeoning experience w/ Python, ML, LLMs
  * 1.5 years of projects, courses/self-learning, work opportunities 
* Excited about AI's *potential*, worried about AI's *risks*

Visually inclined? Here's a graphic condensing the past 5 years of my life into a few thousand pixels:`;

  const closingText = `What I bring to the table:

> Passionate, Creative, Collaborative`;

  const parsedAbout = marked.parse(aboutText);
  const parsedClosing = marked.parse(closingText);
</script>

<section class="about-section">
  <div class="about-content">
    {@html parsedAbout}

    <div class="img-container">
      <img src={chart} alt="A chart showing the past 5 years of my life" />
    </div>

    {@html parsedClosing}
  </div>
</section>

<style>
  .about-section {
    max-width: 800px;
    margin: 0 auto 48px auto;
    padding: 0 30px;
  }

  .about-content {
    line-height: 1.6;
  }

  .img-container {
    margin: 24px 100px;
    max-width: 100%;
    background-color: #181818;
    border: 1px #2b2b2b solid;
    border-radius: 10px;
  }

  .img-container > img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 600px) {
    .img-container {
      margin: 24px 20px;
    }
  }
</style>
