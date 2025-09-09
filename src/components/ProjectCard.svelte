<script>
  import ProjectContent from "./ProjectContent.svelte";
  import ProjectCode from "./ProjectCode.svelte";

  export let project;

  // Group consecutive content items and separate code blocks
  function processProjectContent(content) {
    if (!content || content.length === 0) return [];

    const processed = [];
    let currentGroup = null;

    content.forEach((item) => {
      if (item.type === "md") {
        if (currentGroup && currentGroup.type === "md") {
          // Combine consecutive markdown items
          currentGroup.content += "\n\n" + item.content;
        } else {
          // Start new markdown group
          currentGroup = { type: "md", content: item.content };
          processed.push(currentGroup);
        }
      } else if (item.type === "code") {
        // Always create new code group
        currentGroup = {
          type: "code",
          codeBlocks: item.contents || []
        };
        processed.push(currentGroup);
      }
    });

    return processed;
  }

  $: processedContent = processProjectContent(project.content || []);
</script>

<div class="project-card-content">
  {#each processedContent as section}
    {#if section.type === "md"}
      <ProjectContent markdown={section.content} />
    {:else if section.type === "code"}
      <ProjectCode codeBlocks={section.codeBlocks} />
    {/if}
  {/each}
</div>

<style>
  .project-card-content {
    padding: 0;
  }
</style>
