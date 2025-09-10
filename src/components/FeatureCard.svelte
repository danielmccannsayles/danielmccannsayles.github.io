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
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-secondary);
    transition: all 0.2s ease;
    cursor: pointer;
    min-height: 300px;
    display: flex;
    flex-direction: column;
  }

  .feature-card:hover {
    border-color: var(--text-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .date-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .content-section {
    padding: 16px;
    background: var(--bg-secondary);
    min-height: 30%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-secondary);
    line-height: 1.2;
  }

  .summary {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.4;
    flex: 1;
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
