let contactOnClick = document.getElementById('contact-onclick');
let body = document.getElementById('body');

contactOnClick.hidden = true;

const contactForm = () => {
    contactOnClick.hidden = false;
    body.style.backdrop-filter = 'blur(5px)';
}
contactOnClick.addEventListener('click', contactForm);