<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";

  import Teaser from "../../components/Teaser.svelte";
</script>

<Section title="### This website" subtitle="*February 2025*" hideToStart={true}>
  <div slot="hiddenBlurb">
    <Teaser
      text="I thought it would be fun to style this like a Jupyter notebook, since I've been using those a lot the past year. I tried to replicate my VSCode theme, Default Dark Modern"
    />
  </div>

  <MdCell
    md={`I started off with raw HTML & CSS to avoid bloat. A few days later I switched to Svelte since I was handling so much state in raw JS. 

I use a library called \`highlight.js\` to make syntax-highlighted code blocks, stylized like Jupyter

I mostly stuck with the colors from the VSCode theme, but I added a few highlight colors that I enjoy (I use them in my old websites!). 

Here are the [figma](https://www.figma.com/design/KNDGLOnLBGOMOtokZkl8wO/Showcase-November-2024?node-id=319-2&t=qUygRzLqeLDNKF3R-1) and [github](https://github.com/danielmccannsayles/portfolio-notebook) for this website. 

I hope its readable and helpful in getting to know me!`}
  />
</Section>

<!-- A future idea I'd like to explore (very low on my priority list) is combining the work/project sections. 
Rough plan: Chronological list of entries, w/ some amount of nesting (or other indicator) to show timespan, and tags on entries for 'paid', 'learning', etc. 
This would lend itself well to sorting.  -->
