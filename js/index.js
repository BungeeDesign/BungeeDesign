// Index.js
// By James built with ❤
// Copyright Bungee Design Limited 2019

// Module Imports (Bundler Webpack - Transpiler Babel)
// import  charming  from "charming"; // Try require
import { TweenMax, Power2, TimelineLite, TweenLite } from 'gsap/TweenMax';
import jump from '../node_modules/jump.js/dist/jump.module.js';
import smoothScroll from 'smooth-scroll';

// import anime from '../node_modules/animejs/lib/anime.es.js';

// Preloader
const getRandomColour = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const loaderCirc = document.querySelectorAll('.loaderCircle');

anime({
  targets: loaderCirc,
  duration: 4500,
  delay(el, index) {
    return index * 500;
  },
  easing: 'easeOutExpo',
  opacity: 1,
  scale: '1.8',
  color: getRandomColour(),
  autoplay: true,
});

// Wait for DOM to load then run Init
window.addEventListener('load', e => {
  init(e);
});

// Globally scoped
const preloader = document.querySelector('.preloader');
const mainSection = document.querySelector('.main');
const introSection = document.querySelector('.intro');
const background = document.querySelector('.main-bg-image');
const titleContact = document.querySelector('.title-contact');
const mainBranding = document.querySelector('.main-branding');
const mainTitle = document.querySelector('.main-title');
const interfaceCursor = document.querySelector('.interfaceCursor');
const innerCircle = document.querySelector('.innerCircle');
const promptTitle = document.querySelector('.scrollPrompt');

/* 

Flags

*/

let isLoaded = false;
let isCursorStuck = false;

// Global Listeners
document.addEventListener('mousemove', e => {
  if (!isCursorStuck) {
    handleInterfaceCursor(e);
  }
});

promptTitle.addEventListener('mouseover', e => {
  cursorPromptAnimation();
});

// DOM has loaded
function init() {
  setTimeout(() => {
    preloaderLoaded();
  }, 1200);
}

function preloaderLoaded() {
  preloader.classList.add('preloader-loaded');
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1500);
  mainSection.classList.add('mainIn');
  isLoaded = true;
  titleEffect();
}

function titleEffect() {
  // Get all elements with data-effect attribute
  const charmingElems = document.querySelectorAll('[data-effect]');
  charmingElems.forEach(charElem => {
    charming(charElem, {
      classPrefix: 'letter',
    });
  });

  const chars = document.querySelectorAll('.main-title span');
  const subChars = document.querySelectorAll('.sub-title p span');

  const aniMainTitle = anime({
    targets: [chars, subChars],
    duration: 200,
    delay(el, index) {
      return index * 40;
    },
    easing: 'easeOutExpo',
    opacity: 1,
    translateY: '-100',
    autoplay: false,
  });

  aniMainTitle.play();
}

const promptAnimation = () => {
  // const scrollPromptPath = document.querySelector('.scrollPrompt svg path');
  anime({
    targets: '.scrollPrompt svg path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',
    duration: 30500,
    // delay: function(el, i) { return i * 10 },
    // direction: 'reverse',
    loop: true,
  });
};
promptAnimation();

const cursorPromptAnimation = () => {
  console.log('Cursor Prmopt Animation');
  isCursorStuck = true;

  const innerCircleStyle = window.getComputedStyle(innerCircle);
  const icpMatrix = new WebKitCSSMatrix(innerCircleStyle.webkitTransform);
  const innerCirclePosY = icpMatrix.m42;
  const toValueY = innerCirclePosY + 300;

  TweenMax.to([innerCircle, interfaceCursor], 0.9, {
    y: toValueY,
    ease: Power2.ease,
  });

  let scroll = new smoothScroll('.intro-scroll-anchor', {
    speed: 1000,
    speedAsDuration: true,
    easing: 'easeInOutQuint'
  });
  scroll.animateScroll(1500);

  // Set Intro Section to Overflow hidden once cursor has eneterd intro section
  introSection.style.overflow = 'hidden';

  // Inner Circle Intro Section Transition
  TweenMax.to(innerCircle, 0.9, {
    scale: 10,
    ease: Power2.ease
  }).delay(.3);

  // Animate The Cloned Circle
  const circleClone = document.querySelector('.inner-circle-clone');
  setTimeout(() => {
    circleClone.classList.add('inner-circle-clone-full');
    // Show the cursor again
    document.querySelector('body').style.cursor = 'default';
  }, 600);
};

const handleInterfaceCursor = e => {
  // Start position
  let clientX = -100;
  let clientY = -100;

  clientX = e.clientX;
  clientY = e.clientY;

  // interfaceCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;

  // Using TweenMax for animation performance other option would be requestAnimationFrame()
  TweenMax.to(interfaceCursor, 0.2, {
    x: clientX,
    y: clientY,
    ease: Power2.ease,
  });

  TweenMax.to(innerCircle, 0.6, {
    x: clientX,
    y: clientY,
    ease: Power2.ease,
  });
};
