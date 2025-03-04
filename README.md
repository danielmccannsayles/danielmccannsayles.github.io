I've been working with jupyter notebooks a lot, and they're used a lot in my desired field - ML.

I enjoy notebooks UX - it's nice having seperate sections for different pieces of code, the ability to run those sections individually or in order, and the ability to toggle information on and off the screen.

I wanted to recreate the look of my VSCode theme - `Default Dark Modern`.

The colors are accurate. I gave up on styling the code sections exactly the same - `semantic-highlight` contains some simple code to generate html in the same way that VSCode highlights. But copy and pasting all these HTML sections wasn't scalable - instead I switched to `highlight.js`, using the Atom theme, which allows me to use markdown. I also use `markdown.js` for the notebook cells, again to make this process scalable for new sections.

I started with html + js then switched to Svelte when I was copying hundreds of lines of boilerplate and managing state for toggled sections every time I added something new.

See it for yourself here!: https://danielmccannsayles.github.io/
