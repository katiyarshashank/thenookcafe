(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');
  const contactForm = document.querySelector('.contact-form');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header scroll state
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Menu tabs
  menuTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.getAttribute('data-tab');

      menuTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      menuPanels.forEach(function (panel) {
        const isTarget = panel.id === targetId;
        panel.classList.toggle('active', isTarget);
        panel.hidden = !isTarget;
      });
    });
  });

  // Reservation form demo
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      alert(
        'Thanks, ' +
          name +
          '! Your party booking request has been received. We will call you on 9682414350 to confirm.\n\n' +
          '(Demo form — for live bookings, connect to WhatsApp or your booking system.)'
      );
      contactForm.reset();
    });
  }

  // Set minimum date to today for reservation picker
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Gallery — The Nook photos, dual-row infinite scroll
  const GALLERY_PHOTOS = [
    { src: 'images/TheNook1.png', alt: 'Veg burger, sandwiches, fries and mojitos at The Nook' },
    { src: 'images/TheNook2.png', alt: 'Golden french fries with sauces at The Nook' },
    { src: 'images/theNook3.png', alt: 'Club sandwich, fries and Coke at The Nook' }
  ];

  function buildGalleryTrack(photos, trackEl) {
    if (!trackEl || !photos.length) return;

    const inner = document.createElement('div');
    inner.className = 'gallery-track-inner';

    function appendPhotos(list) {
      list.forEach(function (photo, index) {
        const img = document.createElement('img');
        img.className = 'gallery-photo';
        img.src = photo.src;
        img.alt = photo.alt;
        img.loading = index < 3 ? 'eager' : 'lazy';
        img.width = 500;
        img.height = 360;
        inner.appendChild(img);
      });
    }

    appendPhotos(photos);
    appendPhotos(photos);
    trackEl.appendChild(inner);
  }

  const galleryRow1 = document.getElementById('gallery-row-1');
  const galleryRow2 = document.getElementById('gallery-row-2');

  if (galleryRow1 && galleryRow2) {
    buildGalleryTrack(GALLERY_PHOTOS, galleryRow1);
    buildGalleryTrack(GALLERY_PHOTOS, galleryRow2);
  }

  // About section image slideshow
  const aboutSlides = document.querySelectorAll('.about-slide');
  const aboutDots = document.querySelectorAll('.about-dot');

  if (aboutSlides.length > 1) {
    let aboutIndex = 0;

    function showAboutSlide(index) {
      aboutSlides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === index);
      });
      aboutDots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === index);
      });
      aboutIndex = index;
    }

    setInterval(function () {
      showAboutSlide((aboutIndex + 1) % aboutSlides.length);
    }, 4500);

    aboutDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showAboutSlide(i);
      });
    });
  }
})();

