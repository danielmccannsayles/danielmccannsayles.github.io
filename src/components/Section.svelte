<script>
  import TitleCell from "./TitleCell.svelte";

  function handleToggle() {
    sectionRef.classList.toggle("hidden");
  }

  export let title;
  export let subtitle;
  export let hideToStart = false;
  let sectionRef;

  import { onMount } from "svelte";
  onMount(() => {
    if (hideToStart) {
      handleToggle();
    }
  });
</script>

<div>
  <TitleCell {title} {subtitle} {hideToStart} onToggle={handleToggle}>
    <slot name="hiddenBlurb" />
  </TitleCell>
  <div bind:this={sectionRef}>
    <slot />
  </div>
</div>
