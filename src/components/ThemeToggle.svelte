<script>
  import { theme, toggleTheme } from "../stores/themeStore.js";
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
  {#if $theme === "dark"}
    <i class="codicon codicon-color-mode"></i>
  {:else}
    <i class="codicon codicon-color-mode"></i>
  {/if}
  <span class="theme-label">{$theme === "dark" ? "Light" : "Dark"}</span>
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 8px 12px;
    color: var(--text-primary);
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .theme-toggle:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--hover-bar-active);
  }

  .theme-toggle i {
    font-size: 16px;
  }

  .theme-label {
    font-weight: 500;
  }
</style>
