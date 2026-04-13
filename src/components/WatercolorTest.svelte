<script>
  import { onMount } from "svelte";

  let canvas;

  const colors = [
    [88, 72, 120],  // muted purple
    [62, 100, 130], // muted blue
    [72, 120, 92],  // muted green
    [75, 85, 140],  // blue-purple
    [55, 115, 110], // teal-green
  ];

  function paint() {
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    // Scale cluster count and size to container
    const area = w * h;
    const count = Math.floor(area / 2000);
    const baseRadius = Math.min(w, h) * 0.08;

    for (let i = 0; i < count; i++) {
      const [r, g, b] = colors[Math.floor(Math.random() * colors.length)];
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      const radius = Math.random() * baseRadius + baseRadius * 0.3;
      const layers = Math.floor(Math.random() * 15) + 10;

      for (let j = 0; j < layers; j++) {
        const offsetX = (Math.random() - 0.5) * radius * 0.6;
        const offsetY = (Math.random() - 0.5) * radius * 0.6;
        const r2 = radius * (0.4 + Math.random() * 0.6);
        const alpha = 0.01 + Math.random() * 0.03;
        ctx.beginPath();
        ctx.arc(cx + offsetX, cy + offsetY, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    }
  }

  onMount(() => {
    paint();
  });
</script>

<canvas bind:this={canvas} class="watercolor"></canvas>

<style>
  .watercolor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
</style>
