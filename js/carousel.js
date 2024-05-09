const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--right');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slidesWidth = slides[0].getBoundingClientRect().width;

console.log(slidesWidth);


//arrangethe slides next to one another
slides[0].style.left = slidesWidth*0+'px';
slides[1].style.left = slidesWidth + 'px';
slides[2].style.left = slidesWidth *2 + 'px';
// when i click left move slies to the left
// when i click right move slides to the right
// when i click nav indicators move to slide of clicked indicator
