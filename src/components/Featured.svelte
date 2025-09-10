<script>
  import FeatureCard from "./FeatureCard.svelte";

  export let featuredItems = [];
</script>

<div class="featured-section">
  <div class="featured-grid">
    {#each featuredItems as item}
      <FeatureCard
        picture={item.picture}
        title={item.title}
        summary={item.summary}
        dateRange={item.dateRange}
      />
    {/each}
  </div>
</div>

<style>
  .featured-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 30px;
  }

  .featured-grid {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .featured-grid {
      flex-direction: column;
    }
  }
</style>
