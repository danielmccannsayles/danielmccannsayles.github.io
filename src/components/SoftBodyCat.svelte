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

  // Compute center of local shape
  let lcx = 0,
    lcy = 0;
  for (const [x, y] of SHAPE) {
    lcx += x;
    lcy += y;
  }
  lcx /= SHAPE.length;
  lcy /= SHAPE.length;

  // Precompute inward unit vector for each point (toward center)
  const inward = SHAPE.map(([x, y]) => {
    const dx = lcx - x;
    const dy = lcy - y;
    const d = Math.sqrt(dx * dx + dy * dy);
    return { x: dx / d, y: dy / d };
  });

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let w, h;
    let mouseX = -9999,
      mouseY = -9999;

    const n = SHAPE.length;

    // Each point: rest position + 1D dent along inward axis
    const pts = SHAPE.map(([x, y]) => ({
      lx: x,
      ly: y,
      rx: 0,
      ry: 0,
      dent: 0,
      dentVel: 0,
    }));

    function reposition() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      let ox, oy, scale;
      if (w <= 600) {
        // Mobile: 85% size, center horizontally, sit at bottom
        scale = 0.85;
        ox = (w - 196 * scale) / 2;
        oy = h - 170;
      } else {
        // Desktop: full size, lower-right
        scale = 1;
        ox = w - 280;
        oy = h - 240;
      }
      for (const p of pts) {
        p.rx = p.lx * scale + ox;
        p.ry = p.ly * scale + oy;
      }
    }
    reposition();

    // Physics constants
    const REPEL_R = 100;
    const REPEL_F = 2.5;
    const SPRING_K = 0.08;
    const DAMP = 0.82;
    const MAX_DENT = 45;
    const NEIGHBOR_K = 0.12; // dent propagation to neighbors
    const NEIGHBOR2_K = 0.04; // weaker propagation to 2nd neighbors

    function update() {
      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const inv = inward[i];

        // Current world position of this point
        const wx = p.rx + inv.x * p.dent;
        const wy = p.ry + inv.y * p.dent;

        // Mouse distance to this point's current position
        const mdx = wx - mouseX;
        const mdy = wy - mouseY;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);

        let force = 0;

        if (md < REPEL_R && md > 0.5) {
          // Project mouse repulsion onto inward direction
          // Only keep the inward component (positive = push inward)
          const repelMag = ((REPEL_R - md) / REPEL_R) * REPEL_F;
          const repelX = (mdx / md) * repelMag;
          const repelY = (mdy / md) * repelMag;
          const inwardComponent = repelX * inv.x + repelY * inv.y;
          // Only apply if it pushes inward (positive)
          if (inwardComponent > 0) {
            force += inwardComponent;
          }
        }

        // Neighbor dent propagation — pull toward neighbors' dent (creates ripple/jiggle)
        const prev1 = pts[(i - 1 + n) % n].dent;
        const next1 = pts[(i + 1) % n].dent;
        force += ((prev1 + next1) / 2 - p.dent) * NEIGHBOR_K;

        const prev2 = pts[(i - 2 + n) % n].dent;
        const next2 = pts[(i + 2) % n].dent;
        force += ((prev2 + next2) / 2 - p.dent) * NEIGHBOR2_K;

        // Spring back to rest (dent = 0)
        force -= p.dent * SPRING_K;

        p.dentVel = (p.dentVel + force) * DAMP;
        p.dent += p.dentVel;

        // Never go outward past rest, clamp max inward
        if (p.dent < 0) {
          p.dent = 0;
          if (p.dentVel < 0) p.dentVel = 0;
        }
        if (p.dent > MAX_DENT) {
          p.dent = MAX_DENT;
          p.dentVel = 0;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      if (n < 3) return;

      ctx.fillStyle = "white";
      ctx.beginPath();

      // Get current world positions
      const wx = [],
        wy = [];
      for (let i = 0; i < n; i++) {
        wx.push(pts[i].rx + inward[i].x * pts[i].dent);
        wy.push(pts[i].ry + inward[i].y * pts[i].dent);
      }

      // Smooth closed path using quadratic bezier midpoint technique
      ctx.moveTo((wx[n - 1] + wx[0]) / 2, (wy[n - 1] + wy[0]) / 2);

      for (let i = 0; i < n; i++) {
        const ni = (i + 1) % n;
        ctx.quadraticCurveTo(
          wx[i],
          wy[i],
          (wx[i] + wx[ni]) / 2,
          (wy[i] + wy[ni]) / 2,
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
    const onResize = () => {
      reposition();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
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
