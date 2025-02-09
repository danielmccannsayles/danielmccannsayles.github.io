/** Add handlers to the arrows. Button is old func. */

/** Pass 'this' to edit css on button, and id of div you want to control */
function toggleButton(button, id) {
  button.textContent = button.textContent === "^" ? "v" : "^";
  let content = document.getElementById(id);
  content.style.display = content.style.display === "none" ? "block" : "none";
}

function toggleArrow(arrow, id) {
  if (arrow.classList.contains("codicon-chevron-right")) {
    arrow.classList.replace("codicon-chevron-right", "codicon-chevron-down");
  } else {
    arrow.classList.replace("codicon-chevron-down", "codicon-chevron-right");
  }

  // hide/show content
  let content = document.getElementById(id);
  content.style.display = content.style.display === "none" ? "block" : "none";

  //TODO: add a 'x cells hidden' - add an element that shows this.
  // Make its id the content one + placeholder. Switch its display, and update the number
}
