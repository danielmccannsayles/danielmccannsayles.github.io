<script>
  import { slide } from "svelte/transition";
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  import chart from "../assets/chart.png";

  let expanded = false;

  function toggleExpanded() {
    expanded = !expanded;
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  }

  const aboutText = `I like <em>doing</em>. Coding, Creating, Iterating, Learning, Writing..
  
Here's ~3 facts to get to know me:

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

<div class="about-section">
  <div
    class="about-header"
    on:click={toggleExpanded}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
  >
    <h2 class="about-title">About Me</h2>
    <div class="expand-icon" class:rotated={expanded}>
      <i class="codicon codicon-chevron-down"></i>
    </div>
  </div>

  {#if expanded}
    <div class="about-content" transition:slide={{ duration: 300 }}>
      {@html parsedAbout}

      <div class="img-container">
        <img src={chart} alt="A chart showing the past 5 years of my life" />
      </div>

      {@html parsedClosing}
    </div>
  {/if}
</div>

<style>
  .about-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    border-radius: 4px;
  }

  .about-header:hover {
    background: var(--bg-tertiary);
  }

  .about-title {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .expand-icon {
    color: var(--text-primary);
    transition: transform 0.2s ease;
  }

  .expand-icon.rotated {
    transform: rotate(180deg);
  }

  .about-content {
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 16px;
  }

  .img-container {
    margin: 24px 100px;
    max-width: 100%;
    background-color: #181818;
    border: 1px solid var(--border);
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
