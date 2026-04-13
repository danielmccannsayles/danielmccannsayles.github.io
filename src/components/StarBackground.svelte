<script>
  import { onMount } from "svelte";

  let container;

  onMount(() => {
    const area = window.innerWidth * window.innerHeight;
    const count = Math.round(area / 5000);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 3 + 1;
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
    container.appendChild(frag);
  });
</script>

<div class="stars" bind:this={container}></div>

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
      opacity: 0.4;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.5);
    }
  }
</style>
