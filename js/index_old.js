// Index.js
// By James Rogers with ❤
// Copyright Bungee Design Limited 2019

// Wait for DOM to load then run Init
window.addEventListener('load', () => {
    init();
});

// Globally scoped
const preloader = document.querySelector('.preloader');
const mainSection = document.querySelector('.main');
const background = document.querySelector('.main-bg-image');
const titleWebsite = document.querySelector('.title-websites');
const titleBranding = document.querySelector('.title-branding');
const titleFilm = document.querySelector('.title-film');
const titleContact = document.querySelector('.title-contact');
const mainBranding = document.querySelector('.main-branding');

// Check device type
// window.addEventListener('deviceorientation', mobileBackgroundAnimation);

if (isMobileDevice == true) {
    window.addEventListener('deviceorientation', mobileBackgroundAnimation);
} else {
    mainSection.addEventListener('mousemove', backgroundAnimation);
    mainSection.addEventListener('mouseout', backgroundAnimationOut);
}

// Event flag
let mousemove = true;

// DOM has loaded
function init() {

    setInterval(() => {
        preloaderLoaded();
    }, 700);

    landingItems();
}

function preloaderLoaded() {
    preloader.classList.add('preloader-loaded');
}

function backgroundAnimation(e, type, alpha, beta, gamma) {
    let x = 0;
    let y = 0;
    let z = 0;

    // Get center point of image
    let imageLeft = getElementOffset(background).left;
    let imageTop =  getElementOffset(background).top;

    let imageCenterX = imageLeft + background.offsetWidth / 2;
    let imageCenterY = imageTop + background.offsetHeight / 2;

    // Cursor or Gyro values

    if (type == 'gyro') {
        x = beta + 90;
        y = gamma + 180;
        // z = alpha - 180;
        // x = x / 30;
        // y = y / 30;
        // z = z / 30;
    } else {
        // Cursor
        x = e.clientX - imageCenterX;
        y = e.clientY - imageCenterY;
        z = 0;
        x = x / 30;
        y = y / 30;
        z = 0;
    }

    // Add roate 3D property via TweenMax this makes the movement smooth and removes lag!
    TweenMax.to(background, 2, {rotationX:`${x}deg`, rotationY:`${y}deg`, scale:".9", ease:Elastic.easeOut});

}

function backgroundAnimationOut() {
    TweenMax.to(background, 2, {rotationX:"0deg", rotationY:"0deg", scale:".9", ease:Elastic.easeOut});
}

function mobileBackgroundAnimation() {
    let x = event.alpha;
    let y = event.beta;
    let z = event.gamma;

    // Call backgroundAnimation function
    backgroundAnimation(undefined, 'gyro', x, y, z);

    // Log device value
    console.log('Device Position: ' + x, y, z);
}

function landingItems() {

    titleWebsite.addEventListener('mouseover', borderAdd)
    titleWebsite.addEventListener('mouseout', borderRemove);
    titleWebsite.addEventListener('click', (e) => { initSection(e, 'websites'); });

    titleBranding.addEventListener('mouseover', borderAdd)
    titleBranding.addEventListener('mouseout', borderRemove);
    titleBranding.addEventListener('click', (e) => { initSection(e, 'branding'); });
    
    titleFilm.addEventListener('mouseover', borderAdd);
    titleFilm.addEventListener('mouseout', borderRemove);
    titleFilm.addEventListener('click', (e) => { initSection(e, 'film'); });
}

function borderAdd(e) {

    let item = e.currentTarget.textContent;
    let colour = '';

    console.log(item);

    if (item == 'Websites') {
        colour = '0085ff';
    } else if (item == 'Branding') {
        colour = 'ff2870';
    } else if (item == 'Film') {
        colour = '6e28ff';
    }

    background.style.animation = 'none';
    background.style.borderLeft = `solid #${colour} 870px`;
}

function borderRemove() {
    background.style.animation = 'colorCycle infinite linear 8s alternate-reverse';
    background.style.borderLeft = 'solid #0085ff 0px';
}


// Sections

function initSection(e, section) {

    // Remove menu/landing items events due to mouse event movement on transition
    titleWebsite.removeEventListener('mouseout', borderRemove);
    titleWebsite.removeEventListener('mouseover', borderAdd);

    titleBranding.removeEventListener('mouseout', borderRemove);
    titleBranding.removeEventListener('mouseover', borderAdd);

    titleFilm.removeEventListener('mouseout', borderRemove);
    titleFilm.removeEventListener('mouseover', borderAdd);

    // Remove mousemove/out events due to conflicting property changes
    mainSection.removeEventListener('mousemove', backgroundAnimation); 
    mainSection.removeEventListener('mouseout', backgroundAnimationOut);

    // Get the current matrix3D value and set to the element
    let matrix3D = background.style.transform;
    background.style.transform = matrix3D;
  
    // Start the transition animation
    background.style.borderLeftWidth = '2500px';
    TweenMax.to(background, 4, {scale:"4.9", ease:Power3.easeInOut});

    // Set out transition for menu items and logo
    titleWebsite.classList.toggle('exitPage');
    titleBranding.classList.toggle('exitPage');
    titleFilm.classList.toggle('exitPage');
    titleContact.classList.toggle('exitPage');
    mainBranding.classList.toggle('exitPage');

    if (section == 'websites') {
        setInterval(() => {
            window.location = 'websites.html';
        }, 1600)
    } else if (section == 'branding') {
        console.log('brnading');
    } else if (section == 'film') {
        console.log('film');
    }

}

