// Index.js
// By James with ❤
// Copyright Bungee Design Limited 2019

// Node Module Imports
// import { charming } from "charming";

// Wait for DOM to load then run Init
window.addEventListener('load', () => {
    init();
});


// Globally scoped
const preloader = document.querySelector('.preloader');
const mainSection = document.querySelector('.main');
const background = document.querySelector('.main-bg-image');
const titleContact = document.querySelector('.title-contact');
const mainBranding = document.querySelector('.main-branding');
const mainTitle = document.querySelector('.main-title');

// DOM has loaded
function init() {
    setInterval(() => {
        preloaderLoaded();
    }, 700);
}

function preloaderLoaded() {
    preloader.classList.add('preloader-loaded');
}

function titleEffect() {
    // Get all elements with data-effect attribute
    const charmingElems = document.querySelectorAll('[data-effect]');
    charmingElems.forEach((charElem) => {

        charming(charElem);
        
    });
}
titleEffect();