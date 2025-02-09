/** This file contains code to control the clickable bars on the left side of text content */

/** Keep reference to lastSelectedBar*/
let lastSelectedBar = null;

//TODO: code to replicate the effect where on leaving the page the selected bar turns gray but still selected
// // user left
// window.addEventListener("blur", () => {
//   if (lastSelectedBar)
//     lastSelectedBar.classList.remove("text-bar-selected");
//   lastSelectedBar = null
// });

// //user returned
// window.addEventListener("focus", () => {
//   if (lastSelectedBar) lastSelectedBar.classList.add("text-bar-selected");
// });

/** Add onclick to textbar*/
const elements = document.querySelectorAll(".hover-text-bar");
elements.forEach((element) => {
  element.addEventListener("click", () => {
    const textCell = element.nextElementSibling;
    if (!textCell) return;

    // Select the bar (make it blue)
    if (lastSelectedBar !== element) {
      if (lastSelectedBar)
        lastSelectedBar.classList.remove("text-bar-selected");

      element.classList.add("text-bar-selected");
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
