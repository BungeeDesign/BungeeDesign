// Contains all page effects & Interactive animations
// By James Rogers with ❤
// Copyright Bungee Design Limited 2018


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

// DOM has loaded
function init() {

    setInterval(() => {
        preloaderLoaded();
    }, 700);

    backgroundAnimation();
    landingItems();
}

function preloaderLoaded() {
    preloader.classList.add('preloader-loaded');
}

function backgroundAnimation() {

    // Get mouse position
    mainSection.addEventListener('mousemove', (e) => {

        // Get center point of image
        let imageLeft = getElementOffset(background).left;
        let imageTop =  getElementOffset(background).top;

        let imageCenterX = imageLeft + background.width / 2;
        let imageCenterY = imageTop + background.height / 2;

        let x = e.clientX - imageCenterX;
        let y = e.clientY - imageCenterY;

        x = x / 30;
        y = y / 30;

        // Add roate 3D property via TweenMax this makes the movement smooth and removes lag!
        TweenMax.to(background, 2, {rotationX:`${x}deg`, rotationY:`${y}deg`, scale:".9", ease:Elastic.easeOut});
    });

    mainSection.addEventListener('mouseout', () => {
        TweenMax.to(background, 2, {rotationX:"0deg", rotationY:"0deg", scale:".9", ease:Elastic.easeOut});
    });
}

function landingItems() {
    titleWebsite.addEventListener('mouseover', () => { borderAdd('0085ff'); });
    titleWebsite.addEventListener('mouseout', () => { borderRemove(); });
    titleWebsite.addEventListener('click', () => { websiteSection(); });

    titleBranding.addEventListener('mouseover', () => { borderAdd('ff2870'); });
    titleBranding.addEventListener('mouseout', () => { borderRemove(); });

    titleFilm.addEventListener('mouseover', () => { borderAdd('6e28ff'); });
    titleFilm.addEventListener('mouseout', () => { borderRemove(); });
}

function borderAdd(color) {
    background.style.animation = 'none';
    background.style.borderLeft = `solid #${color} 870px`;
}

function borderRemove() {
    background.style.animation = 'colorCycle infinite linear 8s alternate-reverse';
    background.style.borderLeft = 'solid #0085ff 0px';
}











// Blotter Setup Global
let text = new Blotter.Text(rotatingText, {
    family : "'museo-sans-display', sans-serif",
    size : 77,
    fill : "#fff",
    paddingLeft : 40,
    paddingRight : 40
  });

material = new Blotter.LiquidDistortMaterial();

material.uniforms.uSpeed.value = 0.05;

// Liquid
material.uniforms.uVolatility.value = blotterVola;

let blotter = new Blotter(material, {
texts : text
});

let scope = blotter.forText(text);
scope.appendTo(mainTitle);

const MathUtils = {
    // Equation of a line.
    lineEq: (y2, y1, x2, x1, currentVal) => {
        var m = (y2 - y1) / (x2 - x1),
            b = y1 - m * x1;
        return m * currentVal + b;
    },
    // Linear Interpolation function.
    lerp: (a, b, n) => (1 - n) * a + n * b
};


let currentScroll = window.pageYOffset;
let volatility = 0;
const maxscroll = 10;
const uniformValuesRange = [0,0.9];

const render = () => {
  // Current scroll position
  const newScroll = window.pageYOffset;
  // How much was scrolled from the last repaint.
  const scrolled = Math.abs(newScroll - currentScroll);
  // Get the new value of volatility.
  volatility =  MathUtils.lerp(volatility, Math.min(MathUtils.lineEq(uniformValuesRange[1], uniformValuesRange[0], maxscroll, 0, scrolled), 0.9), 0.05);
  // Set the volatility.
  material.uniforms.uVolatility.value = volatility;
  // Update the current scroll.
  currentScroll = newScroll;
  // Repeat.
  requestAnimationFrame(render);
}
requestAnimationFrame(render);