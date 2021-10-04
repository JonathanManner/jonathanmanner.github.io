/* Show the email contact form on click, and hide it when 
pressing "X" in the window */
let contactOnClick = document.getElementById('contact-onclick');
let body = document.getElementById('body');
let emailForm = document.getElementById('email-form')

emailForm.hidden = true;

const contactForm = () => {
    emailForm.hidden = false;
    // body.style.backdropFilter = 'blur(5px)';
}
contactOnClick.addEventListener('click', contactForm);