<script>
  import TitleCell from "./TitleCell.svelte";

  function handleToggle() {
    sectionRef.classList.toggle("hidden");
  }

  export let title;
  export let subtitle;
  let sectionRef;
</script>

<div>
  <TitleCell {title} {subtitle} onToggle={handleToggle} />
  <div bind:this={sectionRef}>
    <slot />
  </div>
</div>
