/* Global Variable Declarations */
let contactBtn = document.getElementById("contact-me");
let body = document.getElementById("body");
let emailForm = document.getElementById("contact-popup");
let spinBtn = document.getElementById("spin-btn");
let spinner = document.getElementById("spinner");
let emailCross = document.getElementById("closing-cross");

/* Hiding and showing the contact form */
emailForm.style.display = "none";

const emailShow = () => {
  emailForm.style.display = "block";
};
const emailHide = () => {
  emailForm.style.display = "none";
};

emailCross.addEventListener("click", emailHide);
contactBtn.addEventListener("click", emailShow);

/* Logic for the spinner */
/* Will show the spinner one second */
/* after the button is pressed, unless */
/* the button is pressed again before */
/* 1 second has passes, in which case it */
/* will reset the timer. */

spinner.style.display = "none";

let timer;
spinBtn.onclick = function () {
  spinner.style.display = "none";
  clearTimeout(timer);
  timer = setTimeout(function () {
    spinner.style.display = "block";
  }, 1000);
};