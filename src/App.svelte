<script>
  import CodeCell from "./components/CodeCell.svelte";
  import MdCell from "./components/MDCell.svelte";
  import Summary from "./pages/Summary.svelte";
  import WorkExperience from "./pages/WorkExperience.svelte";
  import Section from "./components/Section.svelte";
  import MacmProject from "./pages/projects/MacmProject.svelte";
  import AiGenerationProject from "./pages/projects/AIGenerationProject.svelte";
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />
  <Summary />
  <WorkExperience />

  <Section md="## Projects">
    <MacmProject />
    <AiGenerationProject />
  </Section>

  <CodeCell
    htmlCode={`<pre><code><span class="source-python"></span><br><span class="source-python meta-function-python storage-type-function-python">def</span><span class="source-python meta-function-python"> </span><span class="source-python meta-function-python entity-name-function-python">greet</span><span class="source-python meta-function-python punctuation-definition-parameters-begin-python">(</span><span class="source-python meta-function-python meta-function-parameters-python variable-parameter-function-python">name</span><span class="source-python meta-function-python">)</span><span class="source-python meta-function-python punctuation-section-function-begin-python">:</span><br><span class="source-python">    </span><span class="source-python keyword-control-flow-python">return</span><span class="source-python"> </span><span class="source-python meta-identifier-python">f</span><span class="source-python string-quoted-double-single-line-python punctuation-definition-string-begin-python">"</span><span class="source-python string-quoted-double-single-line-python">Hello, </span><span class="source-python string-quoted-double-single-line-python constant-other-placeholder-python">{name}</span><span class="source-python string-quoted-double-single-line-python">!</span><span class="source-python string-quoted-double-single-line-python punctuation-definition-string-end-python">"</span><br><span class="source-python"></span><br></code></pre>`}
    truncatedCode={"def greet(name):"}
    output="some output"
  />
</main>

<style>
</style>
