<script>
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";
  import HalfMdHalfImageCell from "../../components/HalfMdHalfImageCell.svelte";
  import hackathon from "../../imgs/hackathon.png";
  import MdCell from "../../components/MDCell.svelte";
  import Chips from "../../components/Chips.svelte";
  import Teaser from "../../components/Teaser.svelte";
</script>

<Section title="### Cisco Hackathon" hideToStart={true}>
  <div slot="hiddenBlurb">
    <Teaser
      imgSrc={hackathon}
      imgAlt="A graphic I created showing the hackathon flow"
      text="A Cisco Hackathon exploring generative AI that my team won!"
    />
  </div>

  <HalfMdHalfImageCell
    md={`I competed in an internal Cisco hackathon to explore how we could improve customer experience use cases with AI. 

My team won 1st place out of over 20 teams!

The competition took place over the span of two weeks. It was hosted by a different organization in Cisco, so it was different products and a different setting than I'm used to. Luckily my team had some experience we were able to draw on. `}
    imageSrc={hackathon}
    imageWidthPercentage="40"
  />
  <MdCell
    md={`I played a few key roles on the team: 
1. Collaborating closely with our team lead to hash out his ideas and customer knowledge, and come up with a winning idea. He has a lot of knowledge around the specific field; *together* we were able to turn this into an implementation. 
2. Executing on this; I quickly learned how to build, and built, a smart AI assistant using Streamlit and a RAG system with FAISS and LangChain.

This showcases my holistic skill set. <span id="text-accent">I’m at my best when I have the ability to work closely with the product, with stakeholders, and with the implementation itself!</span>

My team lead graciously said this about me:

> "Daniel continuously demonstrated his ability to navigate high-level business strategy and translate that into ideas, concepts, code, and connections that support the achievement of those goals."

Overall, I had a lot of fun meeting people, collaborating, and creating our project.
 `}
  />

  <CodeCell
    code={`unfortunately I have no code I'm allowed to share here :(`}
    language="raw"
  />

  <Chips items={["LangChain", "FAISS", "RAG", "Streamlit"]} />
</Section>
