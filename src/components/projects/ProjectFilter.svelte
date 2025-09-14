<script>
  import { onMount } from "svelte";
  import { VerboseIcon, ConciseIcon, ArrowUpIcon } from "../../icons";
  import { expandedId, filteredProjects } from "$stores";
  import { FilterChips } from "./filter";

  export let viewMode = "list"; // 'list', 'grid', or 'timeline'
  export let verboseMode = true; // true for verbose, false for concise
  export let onVerboseChange = () => {};

  let showScrollButton = false;
  let markerElement;

  function toggleVerboseMode() {
    verboseMode = !verboseMode;
    expandedId.set(null);
    onVerboseChange(verboseMode);
  }

  function scrollToProjects() {
    if (markerElement) {
      markerElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleScroll() {
    if (markerElement) {
      // Show button when we've scrolled past the filter
      showScrollButton = window.scrollY > markerElement.offsetTop + 5;
    }
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<!-- Invisible marker div for scroll reference -->
<div class="projects-marker" bind:this={markerElement}></div>

<div class="container">
  <div class="content">
    <div class="top-row">
      <div class="title-and-chips">
        <div class="title-container">
          {#if showScrollButton}
            <button
              class="scroll-button desktop-scroll-button"
              on:click={scrollToProjects}
              title="Scroll to top of projects"
              aria-label="Scroll to top of projects"
            >
              <ArrowUpIcon />
            </button>
          {/if}
          <h2 class="projects-title">Projects</h2>
          <span class="project-count">{$filteredProjects.length}</span>
        </div>
        <FilterChips />
      </div>
      <div class="controls">
        {#if viewMode != "grid"}
          <div class="verbose-toggle">
            <button
              class="btn"
              class:active={verboseMode}
              on:click={toggleVerboseMode}
              title={verboseMode ? "Hide summaries" : "Show summaries"}
              aria-label={verboseMode
                ? "Switch to concise mode"
                : "Switch to verbose mode"}
            >
              {#if verboseMode}
                <VerboseIcon />
              {:else}
                <ConciseIcon />
              {/if}
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- Mobile scroll button at bottom right -->
{#if showScrollButton}
  <button
    class="scroll-button mobile-scroll-button"
    on:click={scrollToProjects}
    title="Scroll to top of projects"
    aria-label="Scroll to top of projects"
  >
    <ArrowUpIcon />
  </button>
{/if}

<style>
  /* Keeping container & content seperately is important for the grid-view side-panel. Possible they can be consolidated */
  .container {
    width: 100%;
    background: var(--bg-primary);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 30px;
    border-bottom: 1px solid var(--border);
  }

  /* Holds (title&chips) & controls section*/
  .top-row {
    display: flex;
    gap: 6px;
    justify-content: space-between;
    align-items: flex-start;
  }

  .title-and-chips {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 563px) {
    .title-and-chips {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  .title-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .projects-title {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .project-count {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 5px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    font-size: 12px;
  }

  /* Controls section */

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    height: 100%;
  }

  .verbose-toggle {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .verbose-toggle .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .verbose-toggle .btn:hover {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  /* Used for scroll */
  .projects-marker {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  /* Scroll (up to top) Button */
  /* Moves to bottom right on smaller screens */

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .desktop-scroll-button {
    position: absolute;
    left: -44px;
  }

  .mobile-scroll-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 101;
    background: var(--bg-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: 48px;
    height: 48px;
    --icon-size: 24px; /* Make icon bigger*/
  }
  @media (max-width: 925px) {
    .desktop-scroll-button {
      display: none;
    }
  }

  @media (min-width: 925px) {
    .mobile-scroll-button {
      display: none;
    }
  }
  .scroll-button:hover {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }
</style>
