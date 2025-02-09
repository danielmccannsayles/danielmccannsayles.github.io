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

/** Add onclick to textbar*/
const elements = document.querySelectorAll(".text-bar");
elements.forEach((element) => {
  element.addEventListener("click", () => {
    const textCell = element.nextElementSibling;
    if (!textCell) return;

    // Select the bar (make it blue)
    if (lastSelectedBar !== element) {
      if (lastSelectedBar) lastSelectedBar.classList.remove("bar-selected");

      element.classList.add("bar-selected");
      lastSelectedBar = element;
    }

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
  });
});

/** Code bar - assumes that inside the div is a pre, and then a code. */
document.querySelectorAll(".code-bar").forEach((element) => {
  element.addEventListener("click", () => {
    const codeCell = element.nextElementSibling;
    if (!codeCell) return;

    // Select the bar (make it blue)
    if (lastSelectedBar !== element) {
      if (lastSelectedBar) lastSelectedBar.classList.remove("bar-selected");

      element.classList.add("bar-selected");
      lastSelectedBar = element;
    }

    const maxLength = 20;

    //TODO: get rid of padding on front when squished.

    // Store original HTML (this keeps all spans, classes, formatting)
    if (!codeCell.dataset.fullHTML)
      codeCell.dataset.fullHTML = codeCell.innerHTML;

    if (codeCell.classList.contains("code-cell-truncated")) {
      // Restore original spans and classes
      codeCell.innerHTML = codeCell.dataset.fullHTML;
      codeCell.classList.remove("code-cell-truncated");
      codeCell.style.whiteSpace = "pre-wrap"; // Keep format
    } else {
      let charCount = 0;
      let truncatedHTML = "";

      // Get the <code>. div > pre > code
      const codeElement = codeCell.querySelector("pre code");

      // Iterate over els while tracking count
      Array.from(codeElement.children).forEach((el) => {
        // Remove br
        if (el.tagName == "BR") return;
        if (charCount >= maxLength) return; // Stop if max length reached
        const span = el;

        const spanText = span.textContent;
        const remainingChars = maxLength - charCount;
        if (spanText.length > remainingChars) {
          truncatedHTML += `<span class="${span.className}">${spanText.slice(
            0,
            remainingChars
          )}</span>`;
          charCount = maxLength; // Stop at max length
        } else {
          truncatedHTML += span.outerHTML; // Keep full span
          charCount += spanText.length;
        }
      });

      codeElement.innerHTML = truncatedHTML + `<span>...</span>`; // Set truncated HTML
      codeCell.classList.add("code-cell-truncated");
    }
  });
});
