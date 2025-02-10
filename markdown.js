test = document.getElementById("test");
console.log(test);

const md = marked.parse("# Marked in the browser\n\nRendered by **marked**.");
console.log(md);

test.innerHTML = md;
