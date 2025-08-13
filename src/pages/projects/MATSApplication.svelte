<script>
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import Teaser from "../../components/Teaser.svelte";
</script>

<Section
  title="### AI Alignment Learning + MATS applications"
  subtitle="*Mar-Apr 2025*"
  hideToStart={true}
>
  <div slot="hiddenBlurb">
    <Teaser
      text="I took the application process to MATS 8.0 as an opportunity to get up to speed on the state of the field for AI alignment, and to learn what I could. "
    />
  </div>

  <MdCell
    md={`[MATS](https://www.matsprogram.org/apply) seemed like a good way to contribute to AI safety research while also learning.

I took the application process as an opportunity to get a state of the field. To do so, I read through each stream, and the representative papers I found intruiging.

This gave me a solid knowledge base. Alignment is hard to define: it's a very broad idea with no clear solution.

A few papers I find worth mentioning
1. Representation Engineering: An interesting paradigm to be sure. The general concept, taking a high top-down approach to interpretability, seems promising. Common mechanistic interpretability operates on such a low level that I'm convinced it has to miss out on representations hidden at higher levels. One thing this paper doesn't explore is concept representations over a temporal axis - it's concerned with the current state of the model, and averages concepts over many passes. 

2. Lean Agent (formal proof solving): Training LM to output in a formal language. Progress here would lead to more accurate AI agents (probably a good thing).

3. Distributed Control: Threat evaluation & control over distributed deployments of models - looking for stateless collusion. I hadn't thought of stateless collusion until this. 

4. Belief Geometry in the Residual Stream: Really cool. Results seem to suggest that future context is represented in the residual stream of models - that they're actually planning ahead! I'd like to see this be applied to SAE Interpretability - it's often not clear what SAE circuits or features represent - maybe some of this confusion can be explained by acknowledging that many features are probably pointing at future context.

5. Interpretability in Param Space: Another high-level method of interpreting LLM 'thoughts'.

_In case it's not clear from this list, I'm interested in the technical problems of alignment: creating minds that share our values._
`}
  />

  <MdCell
    md={`I applied to several streams. I'll share two proposals here. 
 
1. [Proposal for Black-box-monitor scheming environment](https://docs.google.com/document/d/1LqhQrE745_wDas8zSPTB06ZwgDqeagfXpaZamuZHX-I/edit?usp=sharing) (Includes code - I enjoyed making this a lot!)

2. [Proposal for Complex Agentic Deployment Environment](https://docs.google.com/document/d/12GFkZYAi_MsoVj30b4jGqRWvffch4nmC04ZUqkYReqI/edit?usp=sharing)

_These were for Marius Hobbhahn's and Samuel Albanie's streams respectively._

I don't agree anymore with the hardline stance I took in the second proposal (that superintelligent AI alignment research is less important than current 'practical' research).
But I think I hit on something crucial with Control. 

With the benefit of hindsight, I'd say I'm pointing to a disrepancy - Control will not be applicable to superintelligent AI - so what will it be used for? Why are we doing Control & also doing research into e.g. how a superintelligent AI could escape from any environment?

If I jump ahead a month and steal ideas from [John Wentworth](https://www.lesswrong.com/users/johnswentworth), I could say that I think our chief concern from Artifically Intelligent researchers doing AI Alignment/Research is death due to slop, not mal-intent.
Maybe I would point to the historical trend of capabilities coming from blindly stumbling around, and theoretical justification only coming after. 

_This is the closest to what I believe now (June 3rd)_`}
  />

  <MdCell
    md={`Unfortunately for past me I did not get into MATS - but fortunate for you, prospective employer/collaborator/peer :)
I plan on looking into representation engineering, and potentially other high level interpretability paradigms. `}
  />
</Section>
