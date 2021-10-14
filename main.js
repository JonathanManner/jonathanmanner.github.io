/* Global Variable Declarations */
let contactBtn = document.getElementById("contact-me");
let body = document.getElementById("body");
let emailForm = document.getElementById("contact-popup");
let spinBtn = document.getElementById("spin-btn");
let spinner = document.getElementById("spinner");
let emailCross = document.getElementById("closing-cross");
let localWindsCell = document.getElementById("local-winds");

/* Hiding and showing the contact form */
// emailForm.style.display = "none";

const emailShow = () => {
  emailForm.style.visibility = "visible";
};
const emailHide = () => {
  emailForm.style.visibility = "hidden";
};

emailCross.addEventListener("click", emailHide);
contactBtn.addEventListener("click", emailShow);

/* Links for the grid items */
localWindsCell.addEventListener("click", () => {
  location.href = "project-local-winds/LWIndex.html";
});

/* Logic for the spinner */
/* Will show the spinner one second */
/* after the button is pressed, unless */
/* the button is pressed again before */
/* 1 second has passes, in which case it */
/* will reset the timer. */

// spinner.style.display = "none";

let timer;
spinBtn.onclick = function () {
  spinner.style.visibility = "hidden";
  clearTimeout(timer);
  timer = setTimeout(function () {
    spinner.style.visibility = "visible";
  }, 1000);
};
