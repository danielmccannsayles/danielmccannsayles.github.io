<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";

  import Teaser from "../../components/Teaser.svelte";
</script>

<Section
  title="### ARENA AI safety (unaffiliated)"
  subtitle="*March 2025*"
  hideToStart={true}
>
  <div slot="hiddenBlurb">
    <Teaser
      text="To familiarize myself with AI safety & ML fundamentals, I self-learned Chapter 0 of the ARENA AI safety program"
    />
  </div>

  <MdCell
    md={`I completed the first chapter of the ARENA AI safety [course](https://www.arena.education/) on my own.

I originally planned to complete the course, but decided to pivo after the first chapter - there are higher impact things I could do for alignment.
    
My work can be seen on [github](https://github.com/danielmccannsayles/my-arena) 

I found this very helpful to shore up my fundamental knowledge of Tensors, Pytorch, and Neural networks and the training process (optimization, backprop, etc.). 

I really like the focus on implementing everything myself. It was hard, but rewarding, and I have a lot more confidence when doing ML projects/working with pytorch, and much more context when reading AI research. 

*In the future I may bring some code samples here, or clean up my repository (it's just the raw ARENA repo w/ my changes), or both. Not sure how much value this would add though since its pretty much just me following the course.* 
    `}
  />
</Section>
