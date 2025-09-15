<script>
  import { resume } from "$assets";
</script>

<div class="container">
  <a href="https://github.com/danielmccannsayles">Github</a>
  <a href={resume}>Resume</a>
  <a href="https://www.linkedin.com/in/daniel-mccann-sayles/">LinkedIn</a>
  <!-- <a href="/personal-website-version-2-build">Old Website (2022)</a> -->
</div>

<style>
  .container {
    display: flex;
    gap: 30px;
    justify-content: center;
  }
  a {
    text-decoration: underline;
  }
  a:nth-child(1) {
    color: var(--text-accent-red);
  }
  a:nth-child(2) {
    color: var(--text-accent-green);
  }
  a:nth-child(3) {
    color: var(--text-accent-blue);
  }
  a:nth-child(4) {
    color: var(--text-accent);
  }
</style>
