/**
 * Slide Engine - CivilTech Presentation Builder
 *
 * Drop this script at the end of body in any generated HTML deck.
 * It handles keyboard navigation, click navigation, URL hash sync,
 * breadcrumb nav bar, footer updates, and the nav hint overlay.
 *
 * Usage:
 *   Inline the contents of this file in a script tag.
 *
 * Expects:
 *   - Slides marked as div class="slide" data-slide="N"
 *   - A div class="nav-hint" id="navHint" element for the keyboard hint overlay
 *   - Optional: div class="slide-number" inside each slide - auto-populated
 *   - Optional: div class="slide-breadcrumb" with .breadcrumb-nav-item elements
 *   - Optional: footer.slide-footer with .footer-counter element
 *
 * Navigation:
 *   - ArrowRight / ArrowDown / Space -> next slide
 *   - ArrowLeft / ArrowUp -> previous slide
 *   - Home -> first slide
 *   - End -> last slide
 *   - Click left third of screen -> previous slide
 *   - Click right two-thirds -> next slide
 *   - URL hash #N -> jump to slide N on load
 *   - Breadcrumb items -> jump to section
 */
(function () {
  'use strict';

  var slides = Array.from(document.querySelectorAll('.slide'));
  var current = 0;
  var total = slides.length;

  // Populate slide-number elements
  slides.forEach(function (s, i) {
    var numEl = s.querySelector('.slide-number');
    if (numEl) numEl.textContent = (i + 1) + ' / ' + total;
  });

  // Respect hash on load (e.g. #3 -> slide index 2)
  var hashIndex = parseInt(window.location.hash.replace('#', ''), 10) - 1;
  if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < total) {
    current = hashIndex;
  }

  // Show initial slide
  slides[current].classList.add('active');

  function isOnDark(slide) {
    return slide.classList.contains('dark') || slide.classList.contains('teal-hero');
  }

  function updateChrome() {
    var dark = isOnDark(slides[current]);
    var breadcrumb = document.querySelector('.slide-breadcrumb');
    var footer = document.querySelector('.slide-footer');

    if (breadcrumb) {
      breadcrumb.className = 'slide-breadcrumb ' + (dark ? 'chrome--dark' : 'chrome--light');
      var sectionId = slides[current].dataset.section || '';
      var items = breadcrumb.querySelectorAll('.breadcrumb-nav-item');
      items.forEach(function (item) {
        item.classList.toggle('active', item.dataset.section === sectionId);
      });
    }

    if (footer) {
      footer.className = 'slide-footer ' + (dark ? 'chrome--dark' : 'chrome--light');
      var counter = footer.querySelector('.footer-counter');
      if (counter) counter.textContent = (current + 1) + ' / ' + total;
    }
  }

  function goTo(index) {
    if (index < 0 || index >= total) return;
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    history.replaceState(null, '', '#' + (current + 1));
    updateChrome();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function hideHint() {
    var hint = document.getElementById('navHint');
    if (hint) hint.style.opacity = '0';
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(total - 1);
    }
    hideHint();
  });

  // Click navigation: left third = prev, right two-thirds = next
  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button, input, select, textarea, .breadcrumb-nav-item')) return;
    var x = e.clientX / window.innerWidth;
    if (x < 0.33) prev(); else next();
    hideHint();
  });

  // Touch swipe support
  var touchStartX = 0;
  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next(); else prev();
      hideHint();
    }
  }, { passive: true });

  // Breadcrumb click navigation
  var breadcrumb = document.querySelector('.slide-breadcrumb');
  if (breadcrumb) {
    breadcrumb.addEventListener('click', function (e) {
      var item = e.target.closest('.breadcrumb-nav-item');
      if (!item) return;
      var targetSection = item.dataset.section;
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].dataset.section === targetSection) {
          goTo(i);
          hideHint();
          break;
        }
      }
    });
  }

  // Initial chrome update
  updateChrome();

})();
