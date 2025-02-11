<script>
  import TitleCell from "./TitleCell.svelte";

  function handleToggle() {
    sectionRef.classList.toggle("hidden");
  }

  export let md;
  let sectionRef;
</script>

<div>
  <TitleCell {md} onToggle={handleToggle} />
  <div bind:this={sectionRef}>
    <slot />
  </div>
</div>
