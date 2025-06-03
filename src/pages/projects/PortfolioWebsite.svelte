<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";

  import Teaser from "../../components/Teaser.svelte";
</script>

<Section
  title="### This portfolio website :)"
  subtitle="*February 2025*"
  hideToStart={true}
>
  <div slot="hiddenBlurb">
    <Teaser
      text="I thought it would be fun to style this like a Jupyter notebook, since I've been using those a lot the past year. I tried to replicate my VSCode theme, Default Dark Modern"
    />
  </div>

  <MdCell
    md={`I started off w/ raw HTML & CSS to avoid bloat. 
A few days later I switched to Svelte since I was handling so much state in raw js. 

I use a library called highlight.js to make syntax-highlighted code blocks. 
Originally these were going to be block level, like in Jupyter, but I found this to be less helpful so it's in '> Code:' sections. 

I mostly stuck with the colors from the VSCode theme. 
I added a few highlight colors that I enjoy (I use them in my old websites!). 
Here's the [figma](https://www.figma.com/design/KNDGLOnLBGOMOtokZkl8wO/Showcase-November-2024?node-id=319-2&t=qUygRzLqeLDNKF3R-1) file for this website. 
Also you can see the animation I made for the MACM project - I was being stubborn and made it in figma instead of literally any easier software. 

I hope its readable, and more importantly helpful in getting to know me!

Here is the [github](https://github.com/danielmccannsayles/portfolio-notebook)

A future idea I'd like to explore (very low on my priority list) is combining the work/project sections. 
Rough plan: Chronological list of entries, w/ some amount of nesting (or other indicator) to show timespan, and tags on entries for 'paid', 'learning', etc. 
This would lend itself well to sorting. 
    `}
  />
</Section>
