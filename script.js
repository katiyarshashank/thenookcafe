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
          '! Your reservation request has been received.\n\n' +
          '(Demo only — connect this form to your booking system for live use.)'
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

  // Gallery — 28 photos, dual-row infinite scroll
  const GALLERY_PHOTOS = [
    { id: 'photo-1495474472287-4d71bcdd2085', alt: 'Pouring fresh coffee' },
    { id: 'photo-1509042239860-f550ce710b93', alt: 'Coffee cup on wooden table' },
    { id: 'photo-1555507036-ab1f4038808a', alt: 'Fresh croissant pastry' },
    { id: 'photo-1511920170033-f8396924c348', alt: 'Coffee beans close-up' },
    { id: 'photo-1445118496-781d9e5563d9', alt: 'Cozy cafe interior' },
    { id: 'photo-1554118811-1e0d58224f24', alt: 'Cafe seating area' },
    { id: 'photo-1514432324607-a09d9b4aefdd', alt: 'Latte art in a cup' },
    { id: 'photo-1461989326034-2e42a25da822', alt: 'Breakfast spread' },
    { id: 'photo-1501339846602-896c859a83dd', alt: 'Outdoor cafe terrace' },
    { id: 'photo-1493853846863-ef3891f1d780', alt: 'Avocado toast brunch' },
    { id: 'photo-1521307119712-d677d33159bc', alt: 'Bakery bread display' },
    { id: 'photo-1559056199-641a0ac8bfcf', alt: 'Coffee on cafe table' },
    { id: 'photo-1497935586351-8d4eeac4bf21', alt: 'Roasted coffee beans' },
    { id: 'photo-1541167760016-8257af8a5e1e', alt: 'Barista making coffee' },
    { id: 'photo-1504674900247-0877df9cc836', alt: 'Gourmet food platter' },
    { id: 'photo-15172481368-7f196658890b', alt: 'Modern cafe interior' },
    { id: 'photo-1551218808-94e220002810', alt: 'Fresh salad bowl' },
    { id: 'photo-1509044869330-672dda99f826', alt: 'Coffee cups on tray' },
    { id: 'photo-1511920170014-c55beb9c0556', alt: 'Coffee shop counter' },
    { id: 'photo-1447932383369-2821628ee1b9', alt: 'Steaming coffee mug' },
    { id: 'photo-1485968579580-b6d095bc9293', alt: 'Brunch with berries' },
    { id: 'photo-1504754524776-536eef8fb081', alt: 'Eggs benedict breakfast' },
    { id: 'photo-1482049016688-2d3e1ca7e7f1', alt: 'Pancakes with syrup' },
    { id: 'photo-1525351485923-f06989fc9644', alt: 'Friends at a cafe' },
    { id: 'photo-1498804633139-081fecd4cb37', alt: 'Laptop at a cafe table' },
    { id: 'photo-1459257913710-6daeba79bb8f', alt: 'Cafe window seating' },
    { id: 'photo-1515823662972-dbb5162be5ea', alt: 'Brunch plate with eggs' },
    { id: 'photo-1442512595331-e89e6b4e4e4e', alt: 'Autumn leaves at a cafe' }
  ];

  function buildGalleryTrack(photos, trackEl) {
    if (!trackEl || !photos.length) return;

    const inner = document.createElement('div');
    inner.className = 'gallery-track-inner';

    function appendPhotos(list) {
      list.forEach(function (photo, index) {
        const img = document.createElement('img');
        img.className = 'gallery-photo';
        img.src =
          'https://images.unsplash.com/' +
          photo.id +
          '?w=500&h=360&fit=crop&q=80';
        img.alt = photo.alt;
        img.loading = index < 6 ? 'eager' : 'lazy';
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
    const midpoint = Math.ceil(GALLERY_PHOTOS.length / 2);
    buildGalleryTrack(GALLERY_PHOTOS.slice(0, midpoint), galleryRow1);
    buildGalleryTrack(GALLERY_PHOTOS.slice(midpoint), galleryRow2);
  }
})();

