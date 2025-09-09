export const portfolioWebsite = {
  id: "portfolio-website",
  title: "This website",
  date: "Feb 2025",
  summary:
    "I thought it would be fun to style this like a Jupyter notebook, since I've been using those a lot the past year. I tried to replicate my VSCode theme, Default Dark Modern",
  content: [
    {
      type: "md",
      content:
        "I started off with raw HTML & CSS to avoid bloat. A few days later I switched to Svelte since I was handling so much state in raw JS.\n\nI use a library called `highlight.js` to make syntax-highlighted code blocks, stylized like Jupyter\n\nI mostly stuck with the colors from the VSCode theme, but I added a few highlight colors that I enjoy (I use them in my old websites!).",
    },
    {
      type: "md",
      content:
        "Here are the [figma](https://www.figma.com/design/KNDGLOnLBGOMOtokZkl8wO/Showcase-November-2024?node-id=319-2&t=qUygRzLqeLDNKF3R-1) and [github](https://github.com/danielmccannsayles/portfolio-notebook) for this website.",
    },
    {
      type: "code",
      contents: [
        {
          content: "// Example of syntax highlighting setup\nimport hljs from 'highlight.js';\nimport 'highlight.js/styles/atom-one-dark.css';\n\n// Highlight code element\nhljs.highlightElement(codeElement);",
          language: "javascript"
        },
        {
          content: "<!-- Example HTML structure -->\n<div class=\"project-card\">\n  <h3>{project.title}</h3>\n  <p>{project.summary}</p>\n</div>",
          language: "html"
        }
      ]
    },
    {
      type: "md",
      content:
        "I hope its readable and helpful in getting to know me! The website showcases my technical skills with modern web technologies while maintaining a clean, notebook-style aesthetic that reflects my data science background.\n\nThe color scheme draws from VSCode's Default Dark Modern theme, creating a familiar environment for developers while remaining accessible to all visitors. The responsive design works seamlessly across desktop and mobile devices.\n\nTechnical implementation includes Svelte for state management, highlight.js for code syntax highlighting, and custom CSS variables for theming. The modular component structure makes it easy to maintain and extend.\n\nI particularly enjoyed working on the interactive elements and ensuring the notebook metaphor felt authentic while remaining functional as a portfolio website.",
    },
  ],
};