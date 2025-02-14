<script>
  import HalfMdHalfImageCell from "../../components/HalfMdHalfImageCell.svelte";
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";
  import { AIcode1 } from "./code";

  import diff from "../../imgs/diff.png";
</script>

<Section title="### AI Generation" hideToStart={true}>
  <HalfMdHalfImageCell
    md="** There are (at least) two obvious things wrong with this graph - one is that the dots overlap, meaning the last applied (gpt diff) is overrepresented. The other is that its not super helpful, except for a preliminary visualization. If I was still working on this, the next thing I would do would be sorting/clustering these data points based on how they do - e.g. these do well w/ the gpt diff, these do well with the semantic diff. "
    imageSrc={diff}
  />

  <MdCell
    md={`
This visualization would look cool, but would only be marginally more helpful, since it would end up with me diving back in to looking data point by data point. Ideally would be to find some way to extract similarities in the text itself, to avoid looking through each one myself. This idea of general pattern recognition reminds me of visual nn and makes me think I could train a simple model to predict how well a sample text would do on the different diff methods, and then extract the features it found. **

I had the opportunity to work on a project exploring how well an AI generated email was doing. An internal Cisco system generates emails which are looked over, optionally changed, and then sent.

I learned that ‘data analysis’ is a surprisingly difficult thing to do. This motif appears later in my AI MATh solving exploration as well. There are so many different ways of calculating metrics, and so many different metrics. 

These metrics also depend on the stakeholders - the metrics you would show to an executive are completely different than those you might show to a technical stakeholder, and again different than those a customer might care about.

I was tasked with exploring how this metric (how well it’s doing) can be calculated. I wrote multiple Jupyter notebooks, and I spent a few weeks immersing myself in the data. I pored over hundreds of examples, explored different ways of sorting and filtering. I made a bunch of different ways of visualizing the differences to make this easier. I explored cleaning the data using GPT, semantic similarity, and some more things.

I wish I had more revolutionary conclusions, but I couldn’t improve the differences that much. 

I did find that the diff library they were using was comparing sentences, so by changing this to match every single character the similarity score increased - which was, technically, the objective. 

Something that interested me, but I did not have the chance to explore, was  using the diff scores to improve the generation process. We have each diff, we could collate these and sort them by similar corrections, and then dive into the top x, or automate this to produce recommendations or common problems. 

Whenever I can, I like to automate!

The lead of the project remarked:
   "[Daniel's] curiosity, ability to learn new concepts, and come up with out-of-the-box ideas are impressive.”
    `}
  />

  <CodeCell
    htmlCode={AIcode1}
    truncatedCode="# Code to detect common"
    output="none"
  />
</Section>
