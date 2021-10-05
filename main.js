/* Show the email contact form on click, and hide it when 
pressing "X" in the window */
let contactOnClick = document.getElementById('contact-onclick');
let body = document.getElementById('body');
let emailForm = document.getElementById('email-form')
let spinBtn = document.getElementById('spin-btn');
let spinner = document.getElementById('spinner');
let emailCross = document.getElementById('closing-cross');

emailForm.style.display = 'none';

const contactForm = () => {
    emailForm.style.display = 'block';
    
};

const emailHide = () => {
    emailForm.style.display = 'none';
}

emailCross.addEventListener('click', emailHide);
contactOnClick.addEventListener('click', contactForm);

spinner.style.display = 'none';

let timer;
spinBtn.onclick = function() {
    spinner.style.display = 'none';
    clearTimeout(timer);
    timer = setTimeout(function() {
        spinner.style.display = 'block';
    }, 1000);
};

