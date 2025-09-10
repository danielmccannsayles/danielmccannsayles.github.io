<script>
  import { onMount } from "svelte";
  import {
    selectedSeries,
    setSeriesFilter,
    availableSeries,
  } from "../../../stores";

  export let disabled = false;
  let showDropdown = false;
  let dropdownElement;

  function toggleDropdown() {
    if (!disabled) {
      showDropdown = !showDropdown;
    }
  }

  function selectSeries(seriesName) {
    setSeriesFilter(seriesName);
    showDropdown = false;
  }

  function handleClickOutside(event) {
    if (dropdownElement && !dropdownElement.contains(event.target)) {
      showDropdown = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

{#if $availableSeries.length > 0}
  <div class="series-dropdown" bind:this={dropdownElement}>
    <button
      class="dropdown-button"
      class:disabled
      class:active={$selectedSeries}
      on:click={toggleDropdown}
      {disabled}
      title="Filter by series"
      aria-label="Filter by series"
    >
      {$selectedSeries || "all series"}
      <i class="codicon codicon-chevron-down" class:rotated={showDropdown}></i>
    </button>

    {#if showDropdown}
      <div class="dropdown-menu">
        <button
          class="dropdown-item"
          class:active={!$selectedSeries}
          on:click={() => selectSeries(null)}
        >
          all series
        </button>
        {#each $availableSeries as series}
          <button
            class="dropdown-item"
            class:active={$selectedSeries === series}
            on:click={() => selectSeries(series)}
          >
            {series}
          </button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .series-dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 12px;
    font-family: "SF Mono", Consolas, monospace;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 120px;
  }

  .dropdown-button:hover:not(:disabled):not(.active) {
    background: var(--bg-tertiary);
    border-color: var(--text-primary);
  }

  .dropdown-button.active {
    background: var(--text-accent);
    color: white;
    border-color: var(--text-accent);
  }

  .dropdown-button.active:hover:not(:disabled) {
    background: var(--text-accent);
    opacity: 0.9;
  }

  .dropdown-button.disabled,
  .dropdown-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .dropdown-button .codicon {
    transition: transform 0.2s ease;
  }

  .dropdown-button .codicon.rotated {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin-top: 4px;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 12px;
    font-family: "SF Mono", Consolas, monospace;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .dropdown-item:first-child {
    border-radius: 6px 6px 0 0;
  }

  .dropdown-item:last-child {
    border-radius: 0 0 6px 6px;
  }

  .dropdown-item:only-child {
    border-radius: 6px;
  }

  .dropdown-item:hover {
    background: var(--bg-tertiary);
  }

  .dropdown-item.active {
    color: var(--text-accent);
  }
</style>
