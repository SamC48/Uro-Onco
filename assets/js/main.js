/**
* Template Name: Selecao
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

 /**
   * Venue Section (Programme page)
   */

 /* Read More - Speakers page
  * ============== */

function readMore() {
  var dots = document.getElementById("dots1");
  var moreText = document.getElementById("more1");
  var btnText = document.getElementById("moreBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}



/* =====================================
   URO-ONCO 2027
   SPONSORSHIP & REGISTRATION TABS
===================================== */

jQuery(function ($) {

  $('#uo-explore').on('click', function (event) {

    // Prevent the link's default behaviour
    event.preventDefault();

    // Activate the Sponsorship tab
    $('#uo-tabs a[href="#uo-sponsor-pane"]').tab('show');

    // Locate sponsorship section
    var target = $('#uo-opportunities');

    // Smoothly scroll to the section
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 75
      }, 450);
    }

  });

});


/* =====================================
   URO-ONCO 2027 VENUE CAROUSEL
===================================== */

jQuery(function ($) {

  var venueCarousel = $('#uoVenueCarousel');

  if (venueCarousel.length) {

    // Respect reduced-motion preferences
    var reducedMotion = window.matchMedia &&
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    venueCarousel.carousel({
      interval: reducedMotion ? false : 6000,
      pause: 'hover'
    });

  }

});


/* ==========================================
   URO-ONCO CONGRESS 2027
   FAQ INTERACTIONS
   Compatible with jQuery + Bootstrap 2.3.2
========================================== */

(function ($) {

  $(function () {

    // Only initialise on the FAQ page
    var $root = $('#uoc27-faq-root');

    if (!$root.length) {
      return;
    }

    // Prevent accidental double initialisation
    if ($root.data('uoc27FaqReady')) {
      return;
    }

    $root.data('uoc27FaqReady', true);

    // FAQ elements
    var $search = $root.find('.uoc27-faq-search');
    var $mobileSelect = $root.find(
      '.uoc27-faq-topic-select'
    );

    // Currently selected category
    var currentTopic = 'general';

    // Category titles
    var topicTitles = {
      general: 'General Information',
      registration: 'Registration & Fees',
      programme: 'Programme & CPD',
      venue: 'Venue & Accommodation',
      sponsorship: 'Sponsorship'
    };

    /* ---------------------------------------
       CLOSE ALL ACCORDION ANSWERS
    --------------------------------------- */

    function closeAllAnswers() {

      $root.find('.uoc27-faq-trigger')
        .attr('aria-expanded', 'false');

      $root.find('.uoc27-faq-answer')
        .prop('hidden', true);

      $root.find('.uoc27-faq-symbol')
        .text('+');

    }

    /* ---------------------------------------
       UPDATE VISIBLE FAQ QUESTIONS
    --------------------------------------- */

    function updateFAQ() {

      var searchTerm = $.trim(
        $search.val()
      ).toLowerCase();

      var searching = searchTerm.length > 0;
      var visibleCount = 0;

      $root.toggleClass(
        'uoc27-faq-is-searching',
        searching
      );

      // Process each category
      $root.find('.uoc27-faq-group').each(
        function () {

          var $group = $(this);

          var groupTopic = $group.attr(
            'data-uoc27-topic'
          );

          var groupMatches = 0;

          // Process each question in this group
          $group.find('.uoc27-faq-item').each(
            function () {

              var $item = $(this);

              // Search both question and answer
              var itemText = $item.text()
                .toLowerCase();

              var matchesSearch =
                itemText.indexOf(searchTerm) !== -1;

              var shouldShow;

              if (searching) {

                // Search across all categories
                shouldShow = matchesSearch;

              } else {

                // Normal category filtering
                shouldShow =
                  groupTopic === currentTopic;

              }

              $item.prop(
                'hidden',
                !shouldShow
              );

              if (shouldShow) {
                groupMatches++;
              }

            }
          );

          // Hide empty groups
          $group.prop(
            'hidden',
            groupMatches === 0
          );

          visibleCount += groupMatches;

        }
      );

      /* UPDATE SIDEBAR BUTTONS */

      $root.find('.uoc27-faq-topic').each(
        function () {

          var $button = $(this);

          var isActive =
            !searching &&
            $button.attr('data-uoc27-topic') ===
              currentTopic;

          $button.toggleClass(
            'is-active',
            isActive
          );

          $button.attr(
            'aria-pressed',
            isActive ? 'true' : 'false'
          );

        }
      );

      /* UPDATE MOBILE SELECTOR */

      $mobileSelect.val(currentTopic);

      /* UPDATE CONTENT HEADING */

      var heading = searching
        ? 'Search Results'
        : topicTitles[currentTopic];

      $root.find(
        '#uoc27-faq-current-title'
      ).text(heading);

      /* UPDATE QUESTION COUNT */

      var countText =
        visibleCount +
        (visibleCount === 1
          ? ' question'
          : ' questions');

      $root.find(
        '.uoc27-faq-count'
      ).text(countText);

      /* SHOW NO RESULTS MESSAGE */

      $root.find('.uoc27-faq-empty')
        .prop('hidden', visibleCount !== 0);

    }

    /* ---------------------------------------
       DESKTOP CATEGORY BUTTONS
    --------------------------------------- */

    $root.on(
      'click.uoc27faq',
      '.uoc27-faq-topic',
      function () {

        currentTopic = $(this).attr(
          'data-uoc27-topic'
        );

        // Reset search when selecting category
        $search.val('');

        closeAllAnswers();
        updateFAQ();

      }
    );

    /* ---------------------------------------
       MOBILE CATEGORY SELECTOR
    --------------------------------------- */

    $mobileSelect.on(
      'change.uoc27faq',
      function () {

        currentTopic = $(this).val();

        $search.val('');

        closeAllAnswers();
        updateFAQ();

      }
    );

    /* ---------------------------------------
       LIVE SEARCH
    --------------------------------------- */

    $search.on(
      'input.uoc27faq',
      function () {

        closeAllAnswers();
        updateFAQ();

      }
    );

    /* ---------------------------------------
       QUESTION ACCORDION
    --------------------------------------- */

    $root.on(
      'click.uoc27faq',
      '.uoc27-faq-trigger',
      function () {

        var $button = $(this);

        var wasOpen =
          $button.attr('aria-expanded') ===
          'true';

        // Close any previously open answer
        closeAllAnswers();

        // Open the selected answer if needed
        if (!wasOpen) {

          $button.attr(
            'aria-expanded',
            'true'
          );

          $button.find(
            '.uoc27-faq-symbol'
          ).text('−');

          var answerId = $button.attr(
            'aria-controls'
          );

          $root.find('#' + answerId)
            .prop('hidden', false);

        }

      }
    );

    /* ---------------------------------------
       INITIALISE FAQ DISPLAY
    --------------------------------------- */

    closeAllAnswers();
    updateFAQ();

  });

})(jQuery);


/* ==========================================
   URO-ONCO 2027 — CONTACT FORM
   jQuery compatible
   Isolated from existing page scripts
========================================== */

(function ($) {

  $(function () {

    // Only run on the Contact page
    var $root = $('#uoc27-contact-root');

    if (!$root.length) {
      return;
    }

    var $form = $root.find('#uoc27-contact-form');

    if (!$form.length) {
      return;
    }

    // Prevent duplicate initialisation
    if ($form.data('uoc27ContactReady')) {
      return;
    }

    $form.data('uoc27ContactReady', true);

    var $button = $form.find(
      '.uoc27-contact-submit'
    );

    var $buttonText = $button.find('span').first();

    var $feedback = $root.find(
      '#uoc27-contact-feedback'
    );

    var originalButtonText = $buttonText.text();

    /* DISPLAY FEEDBACK */

    function showFeedback(message, isSuccess) {

      $feedback
        .removeClass('is-success is-error')
        .addClass(
          isSuccess ? 'is-success' : 'is-error'
        )
        .text(message)
        .prop('hidden', false);

      $feedback.attr(
        'role',
        isSuccess ? 'status' : 'alert'
      );

      // Move keyboard focus to feedback
      $feedback.focus();
    }

    /* RESET FEEDBACK */

    function clearFeedback() {

      $feedback
        .removeClass('is-success is-error')
        .text('')
        .prop('hidden', true);

    }

    /* SUBMIT CONTACT FORM */

    $form.on('submit.uoc27contact', function (event) {

      event.preventDefault();

      // Prevent duplicate submissions
      if ($button.prop('disabled')) {
        return;
      }

      // Browser-side validation
      if (
        typeof this.checkValidity === 'function' &&
        !this.checkValidity()
      ) {

        if (typeof this.reportValidity === 'function') {
          this.reportValidity();
        }

        return;
      }

      clearFeedback();

      // Update button while sending
      $button.prop('disabled', true);
      $buttonText.text('Sending...');

      $.ajax({

        url: $form.attr('action'),
        type: 'POST',
        data: $form.serialize(),
        dataType: 'json',
        timeout: 20000

      })

      .done(function (response) {

        if (response && response.success === true) {

          showFeedback(
            response.message ||
            'Your enquiry has been submitted.',
            true
          );

          // Clear the form after success
          $form[0].reset();

        } else {

          showFeedback(
            response.message ||
            'We could not submit your enquiry.',
            false
          );

        }

      })

      .fail(function (xhr) {

        var message =
          'We could not submit your enquiry. ' +
          'Please try again or contact the organisers directly.';

        // Display any server-provided error
        if (
          xhr.responseJSON &&
          xhr.responseJSON.message
        ) {

          message = xhr.responseJSON.message;

        }

        showFeedback(message, false);

      })

      .always(function () {

        $button.prop('disabled', false);
        $buttonText.text(originalButtonText);

      });

    });

  });

})(jQuery);
