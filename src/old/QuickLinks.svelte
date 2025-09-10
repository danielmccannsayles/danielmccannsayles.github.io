<script>
  import { resume } from "$assets";
</script>

<div class="container">
  <a href="https://github.com/danielmccannsayles">Github</a>
  <a href={resume}>Resume</a>
  <a href="https://www.linkedin.com/in/daniel-mccann-sayles/">LinkedIn</a>
  <a href="/personal-website-version-2-build">Old Website (2022)</a>
</div>

<style>
  .container {
    display: flex;
    gap: 30px;
    margin-left: 40px;
  }
  a {
    text-decoration: underline;
  }
  a:nth-child(1) {
    color: #f06a6a;
  }
  a:nth-child(2) {
    color: #93da68;
  }
  a:nth-child(3) {
    color: #6fc3e8;
  }
  a:nth-child(4) {
    color: #a182f8;
  }
</style>
