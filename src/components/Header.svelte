<script>
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<header class="site-header">
  <div class="header-content">
    <h1 class="site-title">Daniel's Portfolio</h1>
    <ThemeToggle />
  </div>
</header>

<style>
  .site-header {
    background-color: var(--bg-secondary);
  }

  .header-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .site-title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-secondary);
  }
</style>
