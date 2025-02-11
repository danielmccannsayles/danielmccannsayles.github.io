<script>
  import MdCell from "../components/MDCell.svelte";
  import Section from "../components/Section.svelte";
</script>

<Section md="## Work Experience">
  <MdCell md="I've been working as a FE engineer for around 2 years now. " />

  <MdCell
    md={`<p style="display: flex; justify-content: space-between; ">
  <span>Cisco Systems, Software Engineer</span>
  <span>Jul 2023 - Present </span>
</p>

- Ball out
- Study AI
- Do cool things
- Attend to all FE duties
`}
  />
  <MdCell
    md={`<p style="display: flex; justify-content: space-between; ">
    <span>Cisco Systems, Software Engineer Intern</span>
    <span>Jun 2022 - Sep 2022 </span>
  </p>

- Formed team of interns to collaborate on existing sentiment analysis model; Improved accuracy from ~65% to ~94%. Worked with different Hugging Face models, cleaned and managed data
- Assisted CXUI-Components team by building and implementing test harnesses to obscure internal workings of Angular components. Each component is used hundreds of times in CX-Cloud
- Created Electron application to automatically query websites such as MixPanel for CX-Cloud usage statistics, visualize that data in D3.js, and finally add those images to pptx files and automatically update them with the help of C# and OpenXML.

  `}
  />
</Section>
