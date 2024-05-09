const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--right');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slidesWidth = slides[0].getBoundingClientRect().width;

console.log(slidesWidth);


//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slidesWidth * index + 'px';
}
slides.forEach(setSlidePosition);

// TODO: when i click left move slies to the left

// TODO: when i click right move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const amountToMove = nextSlide.style.left;
    //move to the next slide
    track.style.transform = translateX(-' + amountToMove + ');
});
// TODO: when i click nav indicators move to slide of clicked indicator

