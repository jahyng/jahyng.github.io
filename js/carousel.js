const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slidesWidth = slides[0].getBoundingClientRect().width;

console.log(slidesWidth);


// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slidesWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    
}

// When I click left move slies to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    
    moveToSlide(track,currentSlide,prevSlide);
});

//When I click right move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    
    moveToSlide(track,currentSlide,nextSlide);
});

// TODO: when i click nav indicators move to slide of clicked indicator
dotsNav.addEventListener('click', e => {
    // what indicator was clicked
    const targetDot = e;

    console.log(e.target);
});