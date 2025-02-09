/** This file contains code to control the clickable bars on the left side of text content */

/** Keep reference to lastSelectedBar*/
let lastSelectedBar = null;

//TODO: code to replicate the effect where on leaving the page the selected bar turns gray but still selected
// // user left
// window.addEventListener("blur", () => {
//   if (lastSelectedBar)
//     lastSelectedBar.classList.remove("bar-selected");
//   lastSelectedBar = null
// });

// //user returned
// window.addEventListener("focus", () => {
//   if (lastSelectedBar) lastSelectedBar.classList.add("bar-selected");
// });

/** Add onclick to hover bars*/
const elements = document.querySelectorAll(".cell-container");
elements.forEach((element) => {
  element.addEventListener("click", (event) => {
    const cell = element.querySelector(".cell");
    const hoverBar = element.querySelector(".hover-bar");
    if (!(cell && hoverBar)) return;

    // Always select the bar
    if (lastSelectedBar !== element) {
      if (lastSelectedBar) lastSelectedBar.classList.remove("bar-selected");
      hoverBar.classList.add("bar-selected");
      lastSelectedBar = hoverBar;
    }

    // If hover bar clicked, toggle using text or code
    if (event.target == hoverBar) {
      if (element.classList.contains("code-container")) {
        toggleCode(cell);
      } else {
        toggleText(cell);
      }
    }
  });
});

/** Controls truncating/showing for text cells */
function toggleText(textCell) {
  // Check if text is long enough to truncate
  const maxLength = 25;
  if (textCell.dataset.fullText < maxLength) return;

  // Assign fulltext once
  if (!textCell.dataset.fullText)
    textCell.dataset.fullText = textCell.textContent;

  // Toggle - add three to max length to account for the ellipses..
  if (textCell.textContent.length > maxLength + 3) {
    textCell.textContent =
      textCell.dataset.fullText.slice(0, maxLength) + "...";
  } else {
    textCell.textContent = textCell.dataset.fullText;
  }
}

/** Controls truncating/showing for code cells */
function toggleCode(codeCell) {
  const maxLength = 20;
  // Store original HTML (this keeps all spans, classes, formatting)
  if (!codeCell.dataset.fullHTML)
    codeCell.dataset.fullHTML = codeCell.innerHTML;

  if (codeCell.classList.contains("code-cell-truncated")) {
    codeCell.classList.remove("code-cell-truncated");
    codeCell.innerHTML = codeCell.dataset.fullHTML;
  } else {
    let charCount = 0;
    let truncatedHTML = "";

    // Get the <code>. div > pre > code
    const codeElement = codeCell.querySelector("pre code");
    if (!codeElement) return;

    // Iterate over els while tracking count
    for (const el of Array.from(codeElement.children)) {
      // Remove br
      if (el.tagName == "BR") continue;
      if (charCount >= maxLength) break;
      const span = el;

      const spanText = span.textContent;
      const remainingChars = maxLength - charCount;
      if (spanText.length > remainingChars) {
        truncatedHTML += `<span class="${span.className}">${spanText.slice(
          0,
          remainingChars
        )}</span>`;
        break;
      } else {
        truncatedHTML += span.outerHTML;
        charCount += spanText.length;
      }
    }

    codeElement.innerHTML = truncatedHTML + `<span>...</span>`;
    codeCell.classList.add("code-cell-truncated");
  }
}
