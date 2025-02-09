/** This file contains code to control the clickable bars on the left side of text content */

/** Global function to deselect the last selected hoverBar.  */
let deselectOldBars = () => {};

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

/** Setup hover bar functionality on all cell containers*/
document.querySelectorAll(".cell-container").forEach((container) => {
  container.addEventListener("click", (event) => {
    const cell = container.querySelector(".cell");
    const hoverBar = container.querySelector(".hover-bar");
    if (!(cell && hoverBar)) return;

    // Always select hoverBar
    if (container.classList.contains("code-container")) {
      const otherHoverBar =
        container.nextElementSibling.querySelector(".hover-bar");
      selectCodeBars(hoverBar, otherHoverBar);
    } else if (container.classList.contains("output-container")) {
      const otherHoverBar =
        container.previousElementSibling.querySelector(".hover-bar");
      selectCodeBars(hoverBar, otherHoverBar);
    } else {
      // Default
      if (!hoverBar.classList.contains("bar-selected")) {
        deselectOldBars();
        hoverBar.classList.add("bar-selected");
        deselectOldBars = () => {
          hoverBar.classList.remove("bar-selected");
        };
      }
    }

    // If hover bar clicked, toggle using text or code
    if (event.target == hoverBar) {
      if (container.classList.contains("code-container")) {
        toggleCode(cell);
      } else if (container.classList.contains("output-container")) {
        toggleOutput(cell);
      } else {
        toggleText(cell);
      }
    }
  });
});

/** Code bars are linked so we do it in this way. mainContainer is clicked element, other is linked */
function selectCodeBars(hoverBar, otherHoverBar) {
  if (
    !(
      hoverBar.classList.contains("bar-selected") &&
      otherHoverBar.classList.contains("bar-selected")
    )
  ) {
    deselectOldBars();
    hoverBar.classList.add("bar-selected");
    otherHoverBar.classList.add("bar-selected");
    deselectOldBars = () => {
      hoverBar.classList.remove("bar-selected");
      otherHoverBar.classList.remove("bar-selected");
    };
  }
}

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

/** Controls truncating/showing for output cells */
function toggleOutput(outputCell) {
  if (!outputCell.dataset.fullText)
    outputCell.dataset.fullText = outputCell.textContent;

  const collapsed = outputCell.dataset.collapsed;
  if (collapsed) outputCell.textContent = outputCell.dataset.fullText;
  else outputCell.textContent = "Outputs are collapsed ...";
  outputCell.dataset.collapsed = !collapsed;
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

    // TODO: update this to save it in dataset to avoid recalc?
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
