<script>
  import TitleCell from "./TitleCell.svelte";

  function handleToggle() {
    sectionRef.classList.toggle("hidden");
  }

  export let title;
  export let subtitle;
  export let hideToStart = false;
  // Inset changes title color and adds 40px inset. Usually used for toggleable code sections
  export let inset = false;
  let sectionRef;

  import { onMount } from "svelte";
  onMount(() => {
    if (hideToStart) {
      handleToggle();
    }
  });
</script>

<div style={inset ? "margin-left: 40px;" : ""}>
  <TitleCell
    style={inset ? "color: #9B9B9B;" : ""}
    {title}
    {subtitle}
    {hideToStart}
    onToggle={handleToggle}
  >
    <slot name="hiddenBlurb" />
  </TitleCell>
  <div bind:this={sectionRef}>
    <slot />
  </div>
</div>
