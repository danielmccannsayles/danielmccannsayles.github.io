<script>
  import Chips from "../components/Chips.svelte";
  import MdCell from "../components/MDCell.svelte";
  import Section from "../components/Section.svelte";
</script>

<Section
  title="## Work Experience"
  subtitle="I've been working as a *software engineer* for around 2 years now. Since early 2024 I've been pushing to learn more about ML and LLMs. I've looked for opportunities both at work and on my own"
  hideToStart="True"
>
  <MdCell
    md={`
### Cisco Systems, *Software Engineer*

Frontend Developer, *Jul 2023 - Present*
- Developed modern, high-performance Angular applications, leveraging RxJS, NgRx, Signals, Cypress, and Jest.
- Took initiative to explore AI/LLM applications, contributing to a hackathon-winning project on AI use cases.
- Researched, maintained, and enforced best practices across frontend projects.
- Collaborated with team members and cross-functional teams, mentoring, sharing knowledge, and fostering strong relationships.
- Worked on various out of domain projects - getting up to speed quickly - many on AI

Backend Developer, *Mar - May 2025*
- Recognized for initiative in AI/LLM → joined team building agentic LLM querying process for sentiment
- Got up to speed quickly and contributing high quality code w/ python, langchain, langchain, weaviate, SQL

Data-viz AI Agent team, *May 2025 - Present*
- Worked with a team building simple data-visualizing agentic AI application for internal & customer use.
- Built evaluation pipeline for validating agent improvement, using Typscript, Genkit
`}
  />
  <Chips items={["Python", "LLMs", "Typescript", "Angular", "Jest"]} />

  <MdCell
    md={`
### Cisco Systems, *Software Engineer Intern*
*Jun 2022 - Sep 2022*

- Formed team of interns to improve sentiment analysis project - improved accuracy from ~65% to ~94%. Worked with different Hugging Face models, cleaned and managed data
- Built test harnesses for shared Angular components to improve robustness
- Created Electron application to pull data from Mixpanel, visualize w/ D3.js, and automatically generate/update ppts w/ C# and OpenXML.

  `}
  />
  <Chips items={["Hugging Face", "Angular", "Jest", "C#"]} />
</Section>
