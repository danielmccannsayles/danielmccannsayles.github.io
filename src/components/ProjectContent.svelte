<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

  export let markdown = "";
  const content = marked.parse(markdown);
</script>

<div class="project-content">
  {@html content}
</div>

<style>
  .project-content {
    line-height: 1.6;
    color: var(--text-primary);
  }
</style>
