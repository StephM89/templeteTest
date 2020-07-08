// HEADER IMAGE SLIDER

const track = document.querySelector('.imgSlider__track');
const slides = Array.from(track.children); // Gets imgSlider__track(ul) children(li) into an array

const nextBtn = document.querySelector('.imgSlider__btn--right');
const prevBtn = document.querySelector('.imgSlider__btn--left');


const dotsNav = document.querySelector('.imgSlider__nav')
const dots = Array.from(dotsNav.children);


const slideWidth = slides[0].getBoundingClientRect().width;  // Gets width of the imgs

    // Find each individual slides, gets the index and moves them next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}


slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove("imgSlider__currentSlide");
    targetSlide.classList.add("imgSlider__currentSlide");



}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('imgSlider__nav__currentDot');
    targetDot.classList.add('imgSlider__nav__currentDot');
}


const hideShowArrow = (slides, prevBtn, nextBtn, targetIndex) => {
    if(targetIndex === 0) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden')
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden')
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden')
    }

}

// Next Button 

nextBtn.addEventListener('click', e => {

    const currentSlide = track.querySelector('.imgSlider__currentSlide'); // Finds the current Slide
    const nextSlide = currentSlide.nextElementSibling;    // From the current slide, it finds the next sibling(li)
    const currentDot = dotsNav.querySelector('.imgSlider__nav__currentDot');
    const nextDot = currentDot.nextElementSibling;

    // This loops through the array(the li), finding the index of each slide. 
    const nextIndex = slides.findIndex(slide => slide === nextSlide); 

    // Move to next slide
    moveToSlide(track, currentSlide, nextSlide);

    updateDots(currentDot, nextDot);
    hideShowArrow(slides, prevBtn, nextBtn, nextIndex);

});

// Previous Button

prevBtn.addEventListener('click', e => {

    const currentSlide = track.querySelector('.imgSlider__currentSlide'); 
    const prevSlide = currentSlide.previousElementSibling;    // From the current slide, it finds the previous sibling(li)
    const currentDot = dotsNav.querySelector('.imgSlider__nav__currentDot');
    const prevDot = currentDot.previousElementSibling;

    // This loops through the array(the li), finding the index of each slide. 
    const prevIndex = slides.findIndex(slide => slide === prevSlide); 

    // Move to next slide
    moveToSlide(track, currentSlide, prevSlide);

    updateDots(currentDot, prevDot);

    hideShowArrow(slides, prevBtn, nextBtn, prevIndex);



});


// Move the dot indicator and add click event 

dotsNav.addEventListener('click', e => {

    const targetDot = e.target.closest('button');

    if(!targetDot) return // Check if a dot is clicked on


    const currentSlide = track.querySelector('.imgSlider__currentSlide');
    const currentDot = dotsNav.querySelector('.imgSlider__nav__currentDot');


    const targetIndex = dots.findIndex(dot => dot === targetDot); // 'dot' is just a name. This return the first 'dot' of dots. targetDot is the one which was clicked on.

    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);

    hideShowArrow(slides, prevBtn, nextBtn, targetIndex);

});



// TESTIMONIAL SLIDER

const t_Slide = document.querySelectorAll(".testimonial__slide");
const t_next = document.querySelector('.testimonial__btn--right');
const t_prev = document.querySelector('.testimonial__btn--left');

let auto = false;
let intervalTime = 5000;
let slideInterval;



// const addRemoveClass = () => {
//     const currentTesti = document.querySelector('.testimonial__slideCurrent');
//     currentTesti.classList.remove('.testimonial__slideCurrent');
// }




const nextTestimonial = () => {
     
    const currentTesti = document.querySelector('.testimonial__slideCurrent');
    currentTesti.classList.remove('testimonial__slideCurrent');
  
     // Checks if there is a next silbling
    if(currentTesti.nextElementSibling) {
        // If so, add the current class to it

        currentTesti.nextElementSibling.classList.add('testimonial__slideCurrent');

    } else { //if there's no next sibling, it goes back to the first child in the array of slide
        t_Slide[0].classList.add('testimonial__slideCurrent');
    }



}




const prevTestimonial = () => {   
    const currentTesti = document.querySelector('.testimonial__slideCurrent');
    currentTesti.classList.remove('testimonial__slideCurrent');

    // Check for previous slide (Find the previous sibling from HTML)
   if(currentTesti.previousElementSibling) {       
        // Add current class to the previous sibling
        currentTesti.previousElementSibling.classList.add('testimonial__slideCurrent');

    } else {  // Add current class to the last slide 
        t_Slide[t_Slide.length - 1].classList.add('testimonial__slideCurrent');
    }



}


t_next.addEventListener('click', e => {
    clearSlideInterval();
    nextTestimonial();
})

t_prev.addEventListener('click', e => {
    clearSlideInterval();
    prevTestimonial();
})


// Checks if auto is true
if(auto) {

    // Run next slide at interval time

    slideInterval = setInterval(nextTestimonial, intervalTime);

}


function clearSlideInterval() {
    if(auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextTestimonial, intervalTime);

    }
}



    
