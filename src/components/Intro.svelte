<script>
  import { picture } from "$assets";
</script>

<div class="intro">
  <div class="intro-content">
    <img src={picture} alt="Daniel" class="profile-picture" />
    <div class="intro-text">
      <p class="subtitle">Hi! I'm Daniel.</p>
      <p class="mission">
        <em>I want AI to go well and be broadly good for humanity.</em>
      </p>
      <p class="availability">
        I'm working towards this now. Open to correspondence & collaboration.
      </p>
    </div>
  </div>
</div>

<style>
  .intro {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .intro-content {
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  .profile-picture {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid var(--border);
    flex-shrink: 0;
  }

  .intro-text {
    flex: 1;
  }

  @media (max-width: 600px) {
    .intro-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .profile-picture {
      width: 150px;
      height: 150px;
    }
  }

  em {
    color: var(--text-secondary);
  }
</style>
