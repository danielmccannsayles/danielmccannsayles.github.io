export const portfolioWebsite2 = {
  id: "portfolio-website2",
  title: "Portfolio Website",
  subtitle: "(notebook)",
  series: { name: "portfolio", number: "2.0" },
  date: ["02/2025"],
  format: "write-up",
  summary:
    "Portfolio website styled like a Jupyter notebook, since I've been using those a lot the past year.",
  content: [
    {
      type: "md",
      content: `I started off with raw HTML & CSS to avoid bloat. A few days later I switched to Svelte since I was handling so much state in raw JS. 

I use a library called \`highlight.js\` to make syntax-highlighted code blocks, stylized like Jupyter.

I mostly stuck with the colors from my VSCode theme (Default Dark Modern), but I added a few highlight colors that I enjoy. 

Here is the [github](https://github.com/danielmccannsayles/danielmccannsayles.github.io/tree/notebook-old) (note this is a branch on the current portfolio)

TODO: add some code here & show some pictures, now that I've deprecated this site :)`,
    },
  ],
};
