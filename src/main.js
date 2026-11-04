/**
 * Painter Portfolio - Dynamic header and lightbox functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  // Gallery images
  const galleryImages = document.querySelectorAll('.gallery-image img');
  
  // Header navigation
  const headerNav = document.querySelector('.header-nav');
  
  if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxDescription || !lightboxClose) {
    console.warn('Lightbox elements not found');
    return;
  }
  
  // Generate header navigation from gallery sections
  const gallerySections = document.querySelectorAll('.gallery-section');
  gallerySections.forEach(function(section) {
    const title = section.querySelector('.gallery-section-title');
    if (title) {
      const navLink = document.createElement('a');
      navLink.href = '#' + section.id;
      navLink.textContent = title.textContent.trim();
      navLink.classList.add('header-nav-link');
      headerNav.appendChild(navLink);
    }
  });
  
  // Open lightbox
  function openLightbox(imageSrc, altText, caption, description) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = altText;
    lightboxCaption.textContent = caption || '';
    lightboxDescription.textContent = description || '';
    lightbox.classList.add('active');
    lightboxImage.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImage.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Add click handlers to gallery images
  galleryImages.forEach(function(image) {
    image.addEventListener('click', function(e) {
      e.preventDefault();
      
      const figure = image.closest('.gallery-image');
      const src = image.src;
      const alt = image.alt;
      const caption = figure.querySelector('.gallery-caption')?.textContent || '';
      const description = figure.querySelector('.gallery-description')?.textContent || '';
      
      openLightbox(src, alt, caption, description);
    });
    
    // Add keyboard focus handler
    image.addEventListener('focus', function() {
      // Allow tab navigation
    });
  });
  
  // Close button handler
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
  
  // Ensure lightbox is not visible on initial load
  lightboxImage.setAttribute('aria-hidden', 'true');
  
  // Add fade-in animation for gallery images when they load
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const galleryImage = entry.target.closest('.gallery-image');
        if (galleryImage) {
          galleryImage.classList.add('loaded');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all gallery image figures
  document.querySelectorAll('.gallery-image').forEach(function(galleryImage) {
    observer.observe(galleryImage);
  });
});
