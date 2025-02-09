/** Title show */
function toggleArrow(arrow, id) {
  if (arrow.classList.contains("codicon-chevron-right")) {
    arrow.classList.replace("codicon-chevron-right", "codicon-chevron-down");
  } else {
    arrow.classList.replace("codicon-chevron-down", "codicon-chevron-right");
  }

  // hide/show content
  let content = document.getElementById(id);
  content.classList.toggle("hidden");

  //TODO: add a 'x cells hidden' - add an element that shows this.
  // Make its id the content one + placeholder. Switch its display, and update the number
}

//TOOD: consider doing the for each on the container, and using target?? Is this even better?
/** Add onclick to show output from code cell */
document.querySelectorAll(".code-run-button").forEach((codeButton) => {
  codeButton.addEventListener("click", () => {
    // Get parent of code button. Then get next code container
    const container = codeButton.parentElement;
    if (!container) return;

    const output = container.nextElementSibling;
    if (!output) return;

    if (!output.classList.contains("output-container")) return;

    // Show code container if hidden. Can't clear output from here
    if (output.classList.contains("hidden")) {
      output.classList.remove("hidden");
    }
  });
});
