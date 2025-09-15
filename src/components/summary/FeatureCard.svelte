<script>
  export let picture = "";
  export let title = "";
  export let summary = "";
  export let dateRange = "";
</script>

<div class="feature-card">
  <div class="image-container">
    <img src={picture} alt={title} />
    <div class="date-overlay">{dateRange}</div>
  </div>
  <div class="content-section">
    <h3 class="title">{title}</h3>
    <p class="summary">{summary}</p>
  </div>
</div>

<style>
  .feature-card {
    flex: 1;
    border: 2px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-secondary);
    transition: all 0.3s ease;
    cursor: pointer;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px var(--shadow-light);
  }

  .feature-card:hover {
    /* border-color: var(--text-secondary); */
    transform: translateY(-4px);
    box-shadow: 0 8px 24px var(--shadow-medium);
  }

  .image-container {
    border: 5px solid var(--bg-secondary);
    border-bottom: none;
    position: relative;
    flex: 1;
    overflow: hidden;
    border-radius: 12px 12px 0 0;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .date-overlay {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    backdrop-filter: blur(4px);
  }

  .content-section {
    padding: 20px;
    background: var(--bg-secondary);
    min-height: 30%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-secondary);
    line-height: 1.3;
    letter-spacing: -0.2px;
  }

  .summary {
    margin: 0;
    font-size: 13px;
    color: var(--text-primary);
    line-height: 1.5;
    flex: 1;
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    .feature-card {
      min-height: 250px;
    }

    .title {
      font-size: 16px;
    }

    .summary {
      font-size: 13px;
    }
  }
</style>
