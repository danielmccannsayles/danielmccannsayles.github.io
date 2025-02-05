const fs = require("fs");
const vscodeTextmate = require("vscode-textmate");
const onigasm = require("onigasm");
const { OnigScanner, OnigString } = require("onigasm"); // Import OnigScanner and OnigString

// Load the Onigasm regex engine
async function loadOnigasm() {
  const wasmBuffer = fs.readFileSync(
    require.resolve("./node_modules/onigasm/lib/onigasm.wasm")
  );
  const wasmArrayBuffer = wasmBuffer.buffer.slice(
    wasmBuffer.byteOffset,
    wasmBuffer.byteOffset + wasmBuffer.byteLength
  );
  await onigasm.loadWASM(wasmArrayBuffer);
  console.log("Onigasm WASM loaded successfully!");
}

// Tokenize and convert to HTML
async function highlightCode(code) {
  await loadOnigasm();

  const registry = new vscodeTextmate.Registry({
    onigLib: Promise.resolve({
      createOnigScanner: (patterns) => new OnigScanner(patterns),
      createOnigString: (s) => new OnigString(s),
    }),
    loadGrammar: async () => {
      const grammar = fs.readFileSync("./Python.tmLanguage", "utf-8");
      return vscodeTextmate.parseRawGrammar(grammar);
    },
  });

  const grammar = await registry.loadGrammar("source.python");
  const lines = code.split("\n");

  let result = "<pre><code>";
  let ruleStack = null;

  for (const line of lines) {
    const lineTokens = grammar.tokenizeLine(line, ruleStack);
    ruleStack = lineTokens.ruleStack;

    for (const token of lineTokens.tokens) {
      const content = line
        .slice(token.startIndex, token.endIndex)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      const classes = token.scopes
        .map((scope) => scope.replace(/\./g, "-"))
        .join(" ");
      result += `<span class="${classes}">${content}</span>`;
    }
    result += "<br>";
  }

  result += "</code></pre>";
  return result;
}

// Example Python code
const code = `
def greet(name):
    return f"Hello, {name}!"
`;

highlightCode(code).then((html) => {
  fs.writeFileSync("output.html", html);
  console.log("Syntax highlighted code saved to output.html");
});
