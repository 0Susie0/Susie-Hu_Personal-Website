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
    
  // Carousel variables
  var $sliderWrapper = $('.slider-wrapper');
  var $slider = $('.project-slider');
  var $originalCards = $('.project-card'); // Original cards
  var numOriginal = $originalCards.length;
  
  // Clone the first and last card
  var $firstClone = $originalCards.first().clone();
  var $lastClone = $originalCards.last().clone();
  
  // Append the first clone and prepend the last clone
  $slider.append($firstClone);
  $slider.prepend($lastClone);
  
  // Update the cards collection to include the clones
  var $cards = $('.project-card'); 
  var totalCards = $cards.length; // totalCards = numOriginal + 2
  
  // Set currentIndex to 1 (the first actual card)
  var currentIndex = 1;
  
  var autoSlideInterval = 3000; // 3 seconds interval
  var autoSlideTimer;
  var hoverDelay = 1000; // 1 second delay for hover navigation
  var hoverTimerLeft, hoverTimerRight;
  
  // Function to update slider position (with optional transition)
  function updateSlider(withTransition = true) {
    if (!withTransition) {
      $slider.css('transition', 'none');
    } else {
      $slider.css('transition', 'transform 0.5s ease');
    }
    var wrapperWidth = $sliderWrapper.width();
    var cardWidth = $cards.outerWidth(true); // including margins
    // Calculate offset: center the current card in the wrapper
    var offset = (wrapperWidth - cardWidth) / 2 - currentIndex * cardWidth;
    $slider.css('transform', 'translateX(' + offset + 'px)');
    
    // Update active class: only actual cards (not clones)
    $cards.removeClass('active');
    if (currentIndex > 0 && currentIndex < totalCards - 1) {
      $cards.eq(currentIndex).addClass('active');
    }
  }
  
  // Initial update (without transition)
  updateSlider(false);
  // Re-enable transition shortly after
  setTimeout(function() {
    $slider.css('transition', 'transform 0.5s ease');
  }, 50);
  
  // Auto-play: move to next card automatically
  function startAutoSlide() {
    autoSlideTimer = setInterval(function() {
      moveToNext();
    }, autoSlideInterval);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }
  
  function moveToNext() {
    currentIndex++;
    updateSlider();
  }
  
  function moveToPrev() {
    currentIndex--;
    updateSlider();
  }
  
  // After transition ends, check if we are at a clone and jump to the corresponding actual card
  $slider.on('transitionend', function() {
    // If we moved to the clone of the first card (last element)
    if (currentIndex === totalCards - 1) {
      currentIndex = 1;
      updateSlider(false);
      setTimeout(function() {
        $slider.css('transition', 'transform 0.5s ease');
      }, 50);
    }
    // If we moved to the clone of the last card (first element)
    if (currentIndex === 0) {
      currentIndex = totalCards - 2;
      updateSlider(false);
      setTimeout(function() {
        $slider.css('transition', 'transform 0.5s ease');
      }, 50);
    }
  });
  
  // Start auto-play
  startAutoSlide();
  
  // Pause auto-play when hovering over the slider wrapper; resume when leaving
  $sliderWrapper.on('mouseenter', stopAutoSlide);
  $sliderWrapper.on('mouseleave', startAutoSlide);
  
  // Hover navigation: when mouse hovers on left overlay, slide to previous card after a delay
  $('.nav-left').on('mouseenter', function() {
    hoverTimerLeft = setTimeout(function() {
      moveToPrev();
    }, hoverDelay);
  }).on('mouseleave', function() {
    clearTimeout(hoverTimerLeft);
  });
  
  // When mouse hovers on right overlay, slide to next card after a delay
  $('.nav-right').on('mouseenter', function() {
    hoverTimerRight = setTimeout(function() {
      moveToNext();
    }, hoverDelay);
  }).on('mouseleave', function() {
    clearTimeout(hoverTimerRight);
  });
  
  // Update slider on window resize for responsiveness
  $(window).on('resize', function() {
    updateSlider(false);
    setTimeout(function() {
      $slider.css('transition', 'transform 0.5s ease');
    }, 50);
  });
});