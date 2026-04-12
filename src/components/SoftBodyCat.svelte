<script>
  import { onMount } from "svelte";

  let canvas;

  // Sitting cat, side profile facing left
  // Local coords in a ~180x200 bounding box
  const SHAPE = [
    // Bottom front paws
    [55, 185],
    [70, 190],
    [90, 192],
    // Bottom back paws
    [110, 192],
    [130, 188],
    [142, 180],
    // Rear going up
    [152, 165],
    [158, 145],
    [158, 125],
    // Upper back
    [152, 108],
    // Tail curving up
    [158, 95],
    [166, 75],
    [170, 55],
    [172, 38],
    // Tail return
    [169, 50],
    [164, 68],
    [156, 88],
    // Neck
    [142, 98],
    [125, 85],
    [108, 74],
    // Top of head
    [90, 64],
    [82, 56],
    // Back ear (5 pts for sharp tip)
    [80, 42],
    [79, 32],
    [77, 24],
    [73, 32],
    [70, 40],
    // Between ears
    [62, 48],
    // Front ear (5 pts for sharp tip)
    [56, 34],
    [53, 24],
    [50, 18],
    [47, 24],
    [44, 36],
    // Forehead & face
    [40, 50],
    [32, 66],
    [26, 82],
    // Chin
    [28, 98],
    [32, 112],
    // Chest
    [36, 132],
    [40, 155],
    [45, 175],
    // Close loop
    [50, 186],
  ];

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let w, h;
    let mouseX = -9999,
      mouseY = -9999;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }
    resize();

    // Position cat in lower-right area
    const ox = w - 280;
    const oy = h - 240;
    const n = SHAPE.length;

    const pts = SHAPE.map(([x, y]) => ({
      x: x + ox,
      y: y + oy,
      rx: x + ox,
      ry: y + oy,
      vx: 0,
      vy: 0,
    }));

    // Precompute rest distances for neighbor springs (offsets 1-3)
    const restD = [];
    for (let off = 1; off <= 3; off++) {
      const dists = [];
      for (let i = 0; i < n; i++) {
        const j = (i + off) % n;
        const dx = pts[i].rx - pts[j].rx;
        const dy = pts[i].ry - pts[j].ry;
        dists.push(Math.sqrt(dx * dx + dy * dy));
      }
      restD.push(dists);
    }

    // Physics constants
    const REPEL_R = 80;
    const REPEL_F = 5;
    const REST_K = 0.03;
    const SPRING_K = [0.3, 0.15, 0.075]; // offsets 1, 2, 3
    const DAMP = 0.93;

    function update() {
      for (let i = 0; i < n; i++) {
        const p = pts[i];

        // Spring back to rest position
        let fx = (p.rx - p.x) * REST_K;
        let fy = (p.ry - p.y) * REST_K;

        // Mouse repulsion
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < REPEL_R && md > 0.5) {
          const f = ((REPEL_R - md) / REPEL_R) * REPEL_F;
          fx += (mdx / md) * f;
          fy += (mdy / md) * f;
        }

        // Multi-distance neighbor springs
        for (let off = 0; off < 3; off++) {
          const k = SPRING_K[off];
          for (const dir of [-1, 1]) {
            const j = (i + dir * (off + 1) + n) % n;
            const nb = pts[j];
            const rd = dir === 1 ? restD[off][i] : restD[off][j];
            const dx = p.x - nb.x;
            const dy = p.y - nb.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > 0.5) {
              const diff = (d - rd) * k;
              fx -= (dx / d) * diff;
              fy -= (dy / d) * diff;
            }
          }
        }

        p.vx = (p.vx + fx) * DAMP;
        p.vy = (p.vy + fy) * DAMP;
        p.x += p.vx;
        p.y += p.vy;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      if (n < 3) return;

      ctx.fillStyle = "white";
      ctx.beginPath();

      // Smooth closed path using quadratic bezier midpoint technique
      const last = pts[n - 1];
      const first = pts[0];
      ctx.moveTo((last.x + first.x) / 2, (last.y + first.y) / 2);

      for (let i = 0; i < n; i++) {
        const curr = pts[i];
        const next = pts[(i + 1) % n];
        ctx.quadraticCurveTo(
          curr.x,
          curr.y,
          (curr.x + next.x) / 2,
          (curr.y + next.y) / 2,
        );
      }

      ctx.closePath();
      ctx.fill();
    }

    let raf;
    (function loop() {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    })();

    const onMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onTouch = (e) => {
      if (e.touches.length) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
    };
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0;
  }
</style>
