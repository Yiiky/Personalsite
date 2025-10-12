// Smooth section reveal and minimalist interactivity

(function () {
  // Update footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle with cool animations
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  var navBackdrop = document.getElementById('nav-backdrop');
  var navAnimationOverlay = document.getElementById('nav-animation-overlay');
  var navFooter = document.querySelector('.nav-menu__footer');
  
  function closeMobileMenu() {
    // Trigger closing animation first
    if (navAnimationOverlay) {
      navAnimationOverlay.classList.remove('is-active');
      navAnimationOverlay.classList.add('is-closing');
      
      // Close menu after closing animation completes
      setTimeout(function() {
        navMenu.classList.remove('is-open');
        navBackdrop.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        if (navFooter) navFooter.classList.remove('is-open');
        document.body.style.overflow = '';
        
        // Remove closing class after menu is closed
        navAnimationOverlay.classList.remove('is-closing');
      }, 700); // Start menu close 300ms before animation ends (1000ms - 300ms)
    } else {
      // Fallback if no animation overlay
      navMenu.classList.remove('is-open');
      navBackdrop.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (navFooter) navFooter.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }
  
  function openMobileMenu() {
    // First, make the menu visible
    navMenu.classList.add('is-open');
    navBackdrop.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (navFooter) navFooter.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    
    // Then trigger the animation after a short delay to sync with menu visibility
    if (navAnimationOverlay) {
      // Get the position of the nav toggle button relative to the nav-menu container
      var toggleRect = navToggle.getBoundingClientRect();
      var menuRect = navMenu.getBoundingClientRect();
      
      // Calculate position relative to the menu container
      var centerX = toggleRect.left + toggleRect.width / 2 - menuRect.left;
      var centerY = toggleRect.top + toggleRect.height / 2 - menuRect.top;
      
      // Set CSS custom properties for the animation origin
      navAnimationOverlay.style.setProperty('--animation-x', centerX + 'px');
      navAnimationOverlay.style.setProperty('--animation-y', centerY + 'px');
      
      // Delay animation start to sync with menu visibility
      setTimeout(function() {
        // Remove any existing classes and add opening animation
        navAnimationOverlay.classList.remove('is-closing');
        navAnimationOverlay.classList.add('is-active');
      }, 100); // Small delay to let menu become visible
    }
  }
  
  if (navToggle && navMenu && navBackdrop) {
    navToggle.addEventListener('click', function () {
      if (navMenu.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close menu when clicking backdrop
    navBackdrop.addEventListener('click', closeMobileMenu);
    
    // Close menu after clicking a link
    navMenu.addEventListener('click', function (e) {
      var target = e.target;
      if (target && target.matches('a')) {
        closeMobileMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  // IntersectionObserver for reveal-on-scroll animations
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once visible, stop observing to avoid repeated work
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  // Highlight active nav link while scrolling
  var sectionIds = ['about', 'testimonials', 'process', 'portfolio', 'contact'];
  var sections = sectionIds
    .map(function (id) { var el = document.getElementById(id); return el ? el : null; })
    .filter(Boolean);
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));

  function setActive(id) {
    links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });
  }

  var scrollHandler = function () {
    var scrollPos = window.scrollY + 120; // offset for sticky header
    var current = sections[0] && sections[0].id;
    sections.forEach(function (sec) {
      if (sec && sec.offsetTop <= scrollPos) current = sec.id;
    });
    if (current) setActive(current);
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler();

  // Analytics tracking for CTA clicks
  document.querySelectorAll('.button--primary').forEach(function(button) {
    button.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          'event_category': 'engagement',
          'event_label': this.textContent.trim()
        });
      }
    });
  });

  // Track form submissions
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'conversion',
          'event_label': 'contact_form'
        });
      }
    });
  }

  // Track external link clicks
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'external_link_click', {
          'event_category': 'engagement',
          'event_label': this.href
        });
      }
    });
  });

  // Mobile menu UI detection and optimization
  function optimizeMobileMenuForBrowser() {
    var navLinks = document.querySelector('.nav-links');
    var navFooter = document.querySelector('.nav-menu__footer');
    
    if (!navLinks || !navFooter) return;
    
    // Detect if browser supports modern viewport units
    var supportsDvh = CSS.supports('height', '100dvh');
    var supportsSafeArea = CSS.supports('padding', 'env(safe-area-inset-bottom)');
    
    // Fallback for browsers without modern CSS support
    if (!supportsDvh || !supportsSafeArea) {
      var viewportHeight = window.innerHeight;
      var isLandscape = window.innerWidth > window.innerHeight;
      
      // Calculate appropriate bottom padding based on viewport
      var bottomPadding = 80; // Base padding
      
      // Adjust for different screen sizes and orientations
      if (viewportHeight < 600) {
        bottomPadding = 60;
      } else if (viewportHeight < 500) {
        bottomPadding = 40;
      }
      
      if (isLandscape) {
        bottomPadding = Math.min(bottomPadding, 60);
      }
      
      // Apply calculated padding
      navLinks.style.paddingBottom = bottomPadding + 'px';
      navFooter.style.paddingBottom = Math.max(bottomPadding * 0.6, 20) + 'px';
    }
  }
  
  // Run optimization on load and resize
  optimizeMobileMenuForBrowser();
  window.addEventListener('resize', optimizeMobileMenuForBrowser);
  window.addEventListener('orientationchange', function() {
    setTimeout(optimizeMobileMenuForBrowser, 100);
  });
})();


