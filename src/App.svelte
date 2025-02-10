<script>
  import CodeCell from "./CodeCell.svelte";
  import MdCell from "./MDCell.svelte";
  import TitleCell from "./TitleCell.svelte";

  function handleToggle(sectionRef) {
    if (sectionRef) sectionRef.classList.toggle("hidden");
  }

  // Sections
  let summarySection;
  let workSection;
</script>

<main>
  <MdCell md="# Daniel McCann-Sayles' Portfolio" />

  <TitleCell md="## Summary" onToggle={() => handleToggle(summarySection)} />
  <div bind:this={summarySection}>
    <MdCell
      md="
* Engineering degree
* Background in UI - design, frontend dev
* Growing experience in Python/ data science
* Interested in improving the world through **safe** AI led research
* Passionate, Creative, Collaborative
* I want to combine design, FE, my creativity and passion, and python backend. 

"
    />
  </div>

  <TitleCell
    md="## Work Experience"
    onToggle={() => handleToggle(workSection)}
  />
  <div bind:this={workSection}>
    <MdCell
      md={`<p style="display: flex; justify-content: space-between; margin-right: 10vw; ">
    <span>Cisco Systems</span>
    <span>July 2023 - Now </span>
  </p>
  `}
    />
  </div>

  <CodeCell
    htmlCode={`<pre><code><span class="source-python"></span><br><span class="source-python meta-function-python storage-type-function-python">def</span><span class="source-python meta-function-python"> </span><span class="source-python meta-function-python entity-name-function-python">greet</span><span class="source-python meta-function-python punctuation-definition-parameters-begin-python">(</span><span class="source-python meta-function-python meta-function-parameters-python variable-parameter-function-python">name</span><span class="source-python meta-function-python">)</span><span class="source-python meta-function-python punctuation-section-function-begin-python">:</span><br><span class="source-python">    </span><span class="source-python keyword-control-flow-python">return</span><span class="source-python"> </span><span class="source-python meta-identifier-python">f</span><span class="source-python string-quoted-double-single-line-python punctuation-definition-string-begin-python">"</span><span class="source-python string-quoted-double-single-line-python">Hello, </span><span class="source-python string-quoted-double-single-line-python constant-other-placeholder-python">{name}</span><span class="source-python string-quoted-double-single-line-python">!</span><span class="source-python string-quoted-double-single-line-python punctuation-definition-string-end-python">"</span><br><span class="source-python"></span><br></code></pre>`}
    truncatedCode={"def greet(name):"}
    output="some output"
  />

  <!-- Cell block -->

  <!-- Title 1 -->
  <!-- Title/ Daniel McCann-Sayles -->

  <!-- Summary -->

  <!-- Work Experience -->

  <!-- Projects -->

  <!-- title 2 -->
  <!--    kid fight -->

  <!-- title 3 -->
  <!--       intro -->

  <!--       code -->
</main>

<style>
</style>
