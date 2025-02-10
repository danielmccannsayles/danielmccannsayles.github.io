<script>
  import MdCell from "./MDCell.svelte";
</script>

<main>
  <MdCell
    md="
This is a paragraph.

* This is a list
* With two items
  "
  />

  <MdCell
    md="
Hi!!

- l1
- l2
-not list
"
  />
</main>

<style>
</style>
