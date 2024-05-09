const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--right');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slidesWidth = slides[0].getBoundingClientRect().width;

console.log(slidesWidth);


//arrangethe slides next to one another
slides.forEach((slide,  index) => {
    slide.style.left = slidesWidth * index + 'px';
})
// when i click left move slies to the left
// when i click right move slides to the right
// when i click nav indicators move to slide of clicked indicator
