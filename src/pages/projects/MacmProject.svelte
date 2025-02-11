<script>
  import HalfMdHalfImageCell from "../../components/HalfMdHalfImageCell.svelte";
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import macm from "../../imgs/macm.gif";
</script>

<Section md="### MACM Exploration">
  <HalfMdHalfImageCell
    md="During some downtime.
  
  I explored a Cisco research project  focused on agentic AI workflows to improve performance on math  problem-solving benchmarks. I optimized the code base, explored  asynchronous alternatives, and reduced costs while increasing speed. I  also explored alternative methods for connecting LLM calls and evaluated their effectiveness in  problem-solving.
  
  This experience sharpened my skills in prompt engineering, OpenAI APIs, and agentic workflows, which I plan to apply to future AI applications"
    imageSrc={macm}
  />

  <MdCell
    md="I wanted to explore. I took an exisitng benchmark. But it’s still so hard to measure success
  
  Timeline
  
  First, I looked at the existing MACM thing. They split things up into three different roles, determined ONLY by giving different prompts. 
  I rewrote a lot of their stuff. I had hard times determining benchmarks
  
  The first stage just involved switching everything to a simpler form of gpt, and adding async, and cleaning up the files.
  
  Next I started trying different methods. The goal is to improve how a series of GPT calls does on the MATH dataset. There were certain patterns I wanted to try. 
  
  This endeavor was not entirely fruitful. One big challenge is benchmarking. Every call to GPT has some element of randomness in its return. When adding multiple together, it gets very complex very quickly. Even one call can be hard since there’s no function or obvious way to calculate randomness (that I know of). It’s also kind of a nebulous problem.
  
  Another is how AI models are easily influenced. I imagine this is due to training that makes them agreeable to users, but when given a false idea (let’s say call #1 returned an incorrect assumption), it seems that call #2 often will not question that idea. 
  
  Taking this idea a bit further, each call seems to perform worse and worse. I’m not sure why this is, though it would be interesting to read more about it. It seems impossible to do error correcting *completely* with LLM’s right now. 
  
  In the end I did not achieve much noteworthy. But I understand a few things better now:
  python, in general. I’ve mostly used javascript. I wrote a lot of code, a lot of typed code, and I’m ready to do more in python!
  python asynchronous libraries - I used anyio w/ the default configuration of asyncio backend. I like anyio
  The complexities that arise in multi-LLM interactions
  Some ideas that I thought would do well - like chains of thought - did not do exactly as I had hoped
  I thought a lot about how we think, and about hiearchial forms of thought. For instance, starting at small provable concepts, using those to create higher level concepts, and so on. This is (very simplified) how we do things as humans. If I look at a complex belief I have, it’s predicated on lower and lower level ideas that have been lodged in my brain. It can be hard to change someones mind because even when a fact below is changed, humans are bad at updating. This leads me to something that I’ve been thinking about for a while, a way of creating a living essay.
  "
  />
</Section>
