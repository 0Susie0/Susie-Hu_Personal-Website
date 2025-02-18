$(document).ready(function() {
  // Initialize water ripple effect and AOS 
  $('body').ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04
  });
  
  AOS.init({
    duration: 800,
    once: true
  });
    
    // Check if there are any project cards; if not, exit early.
    const $originalCards = $('.project-card');
    if ($originalCards.length === 0) return;
  
    const $sliderWrapper = $('.slider-wrapper');
    const $slider = $('.project-slider');
    const numOriginal = $originalCards.length;
  
    // Clone the first and last cards for infinite looping.
    const $firstClone = $originalCards.first().clone();
    const $lastClone = $originalCards.last().clone();
  
    // Append the first clone to the end and prepend the last clone to the beginning.
    $slider.append($firstClone);
    $slider.prepend($lastClone);
  
    // Update the cards collection to include clones.
    let $cards = $('.project-card');
    const totalCards = $cards.length; // should equal numOriginal + 2
  
    // Set the initial current index to 1 (first actual card).
    let currentIndex = 1;
    const autoSlideInterval = 3000; // in milliseconds
    let autoSlideTimer;
    const hoverDelay = 1000; // 1 second delay for hover navigation
    let hoverTimerLeft = null;
    let hoverTimerRight = null;
  
    // Update the slider position to center the current card.
    function updateSlider(withTransition = true) {
      if (!withTransition) {
        $slider.css('transition', 'none');
      } else {
        $slider.css('transition', 'transform 0.5s ease');
      }
      const wrapperWidth = $sliderWrapper.width();
      const cardWidth = $cards.outerWidth(true); // include margins
      // Calculate offset to center current card.
      const offset = (wrapperWidth - cardWidth) / 2 - currentIndex * cardWidth;
      $slider.css('transform', `translateX(${offset}px)`);
      
      // Update the active class (only for actual cards, not clones).
      $cards.removeClass('active');
      if (currentIndex > 0 && currentIndex < totalCards - 1) {
        $cards.eq(currentIndex).addClass('active');
      }
    }
  
    // Initial slider update.
    updateSlider(false);
    setTimeout(() => {
      $slider.css('transition', 'transform 0.5s ease');
    }, 50);
  
    // Auto-play functions.
    function moveToNext() {
      currentIndex++;
      updateSlider();
    }
    function moveToPrev() {
      currentIndex--;
      updateSlider();
    }
  
    // Handle transition end to reset position when reaching clones.
    $slider.on('transitionend', () => {
      // If we are on the clone of the first card, jump to the actual first card.
      if (currentIndex === totalCards - 1) {
        currentIndex = 1;
        updateSlider(false);
        setTimeout(() => {
          $slider.css('transition', 'transform 0.5s ease');
        }, 50);
      }
      // If we are on the clone of the last card, jump to the actual last card.
      if (currentIndex === 0) {
        currentIndex = totalCards - 2;
        updateSlider(false);
        setTimeout(() => {
          $slider.css('transition', 'transform 0.5s ease');
        }, 50);
      }
    });
  
    // Auto-play: start interval to move to next card.
    function startAutoSlide() {
      autoSlideTimer = setInterval(moveToNext, autoSlideInterval);
    }
    function stopAutoSlide() {
      clearInterval(autoSlideTimer);
    }
    startAutoSlide();
  
    // Pause auto-play when mouse enters slider area; resume on leave.
    $sliderWrapper.on('mouseenter', stopAutoSlide);
    $sliderWrapper.on('mouseleave', startAutoSlide);
  
    // Hover navigation for left overlay.
    $('.nav-left').on('mouseenter', () => {
      hoverTimerLeft = setTimeout(() => {
        moveToPrev();
      }, hoverDelay);
    }).on('mouseleave', () => {
      clearTimeout(hoverTimerLeft);
    });
  
    // Hover navigation for right overlay.
    $('.nav-right').on('mouseenter', () => {
      hoverTimerRight = setTimeout(() => {
        moveToNext();
      }, hoverDelay);
    }).on('mouseleave', () => {
      clearTimeout(hoverTimerRight);
    });
  
    // Recalculate slider position on window resize.
    $(window).on('resize', () => {
      updateSlider(false);
      setTimeout(() => {
        $slider.css('transition', 'transform 0.5s ease');
      }, 50);
    });
  });
  
  