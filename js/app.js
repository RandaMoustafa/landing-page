/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: Eslint
 * 
*/


/**
 * Define Global Variables
 * 
*/

const nav = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
nav.forEach(e => {
    const navListElement = `<li class='menu__link ${e.className}' data-link=${e.id}>
<a href="#${e.id}">${e.dataset.nav}</li>`
    navList.insertAdjacentHTML('beforeend', navListElement);
    //console.log(e);
});

// Add class 'active' to section when near top of viewport
const callBack = top => {
    top.forEach(nearTop => {
        const navListElement = document.querySelector(
            `.menu__link[data-link='${nearTop.target.id}']`,
        )
        const section = document.getElementById(nearTop.target.id);

        if (nearTop && nearTop.isIntersecting) {
            navListElement.classList.add('active')
            section.classList.add('active')
        } else {
            if (navListElement.classList.contains('active')) {
                navListElement.classList.remove('active')
            }

            if (section.classList.contains('active')) {
                section.classList.remove('active')
            }
        }
    });
    //console.log(top);
};

// Scroll to anchor ID using scrollTO event
navList.addEventListener('click', e => {
    e.preventDefault();
    const p = e.target.hasAttribute('data-link')
        ? e.target
        : e.target.parentElement;
    const elementToScrollTo = document.getElementById(p.dataset.link);
    elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'});
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

// Scroll to section on link click

// Set sections as active


const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
};
const observer = new IntersectionObserver(callBack, options);
nav.forEach(e => {
    observer.observe(document.getElementById(e.id))
});