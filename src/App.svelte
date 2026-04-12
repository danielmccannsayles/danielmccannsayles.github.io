<script>
  import { onMount } from "svelte";
  import { resume, photo26 } from "$assets";
  import SoftBodyCat from "./components/SoftBodyCat.svelte";
  import WatercolorTest from "./components/WatercolorTest.svelte";

  let starsContainer;

  onMount(() => {
    const count = 200;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2.5 + 0.5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = Math.random() * 3 + 2;
      const brightness = Math.random() * 0.6 + 0.4;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}vw;
        top: ${y}vh;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: ${brightness};
      `;
      frag.appendChild(star);
    }
    starsContainer.appendChild(frag);
  });
</script>

<WatercolorTest />
<div class="stars" bind:this={starsContainer}></div>
<SoftBodyCat />

<main>
  <div class="card">
    <img src={photo26} alt="Daniel McCann-Sayles" class="photo" />
    <div class="info">
      <h1>Daniel McCann-Sayles</h1>
      <p class="tagline">
        Working to make AI go well & be broadly good for humanity
      </p>
    </div>
  </div>
  <div class="links">
    <a
      href="https://github.com/danielmccannsayles"
      target="_blank"
      rel="noopener"
      aria-label="GitHub"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    </a>
    <a href={resume} target="_blank" rel="noopener" aria-label="Resume">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-3h8v2H8v-2z"
        />
      </svg>
    </a>
    <a
      href="https://www.linkedin.com/in/daniel-mccann-sayles/"
      target="_blank"
      rel="noopener"
      aria-label="LinkedIn"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
      </svg>
    </a>
  </div>
</main>

<style>
  .stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .stars :global(.star) {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle ease-in-out infinite alternate;
  }

  @keyframes twinkle {
    from {
      opacity: var(--star-opacity, 0.4);
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.5);
    }
  }

  main {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    max-height: 100vh;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .photo {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
  }

  .info {
    text-align: left;
  }

  h1 {
    font-size: 1.8rem;
    color: var(--text-secondary);
    margin: 0 0 0.3rem;
    font-weight: 500;
  }

  .tagline {
    color: var(--text-faded);
    font-size: 1.1rem;
    margin: 0;
  }

  .links {
    margin-top: 1.5rem;
    display: flex;
    gap: 1.5rem;
  }

  .links a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .links a:hover {
    color: var(--text-secondary);
  }

  @media (max-width: 600px) {
    main {
      justify-content: flex-start;
      padding-top: 15vh;
      gap: 1.2rem;
    }

    .card {
      flex-direction: column;
    }

    .photo {
      width: 80px;
      height: 80px;
    }

    .info {
      text-align: center;
    }

    h1 {
      font-size: 1.4rem;
    }

    .tagline {
      font-size: 0.95rem;
    }

    .links {
      margin-top: 0.8rem;
    }
  }
</style>
