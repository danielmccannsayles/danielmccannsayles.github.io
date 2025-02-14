<script>
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";
  import HalfMdHalfImageCell from "../../components/HalfMdHalfImageCell.svelte";
  import hackathon from "../../imgs/hackathon.png";
  import MdCell from "../../components/MDCell.svelte";
</script>

<Section title="### Cisco Hackathon" hideToStart={true}>
  <HalfMdHalfImageCell
    md={`
    I competed in an internal Cisco hackathon to explore how we could improve certain aspects of customer experience with AI. My team won 1st place out of over 20 teams!

I played a few key roles on the team:
Collaborating closely with our team lead to hash out his ideas and customer knowledge, and come up with a winning idea. He has a lot of knowledge around the specific work than I; together we were able to turn this into an implementation. 
Executing on this; I quickly learned how to build, and built, a smart AI assistant using Streamlit and a RAG system with FAISS and LangChain.
    `}
    imageSrc={hackathon}
  />
  <MdCell
    md={`This showcases my holistic skill set. I’m at my best when I have the ability to work closely with the product, with stakeholders, and with the implementation itself!

My team lead graciously said this about me:

    "Daniel continuously demonstrated his ability to navigate high-level  business strategy and translate that into ideas, concepts, code, and  connections that support the achievement of those goals." 

** add some more about this showing my ideation, prototyping, and ability to see the big picture, while also coding it! ** `}
  />

  <CodeCell htmlCode={`<div>NO CODE :p<div>`} truncatedCode="" output="none" />
</Section>
