/* ==========================================================================
   CivicPulse 2026 - Main JavaScript File
   Handles Theme Toggle, RTL Switching, Navigation Active States,
   Form Interactivity, Back-To-Top Button, Animated Counters & Gallery Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Light / Dark Mode)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('civicpulse_theme') || 'light';
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = `<i class="bi bi-sun-fill"></i> <span>Light</span>`;
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = `<i class="bi bi-moon-stars-fill"></i> <span>Dark</span>`;
      });
    }
    localStorage.setItem('civicpulse_theme', theme);
  }

  // Initialize theme on load
  applyTheme(storedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // 2. RTL Toggle Switcher
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const storedDir = localStorage.getItem('civicpulse_dir') || 'ltr';

  function applyDirection(dir) {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      rtlToggleBtns.forEach(btn => {
        btn.innerHTML = `<i class="bi bi-globe"></i> <span>LTR</span>`;
      });
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      rtlToggleBtns.forEach(btn => {
        btn.innerHTML = `<i class="bi bi-globe"></i> <span>RTL</span>`;
      });
    }
    localStorage.setItem('civicpulse_dir', dir);
  }

  // Initialize direction on load
  applyDirection(storedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      applyDirection(currentDir === 'rtl' ? 'ltr' : 'rtl');
    });
  });

  // 3. Navigation Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'home-1.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Back-To-Top Button Handler
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Password Eye Visibility Toggle
  const eyeToggles = document.querySelectorAll('.password-toggle-eye');
  eyeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        toggle.classList.toggle('bi-eye');
        toggle.classList.toggle('bi-eye-slash');
      }
    });
  });

  // 6. Animated Counter Numbers
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current >= target) {
              counter.innerText = target.toLocaleString();
            } else {
              counter.innerText = current.toLocaleString();
              requestAnimationFrame(updateCounter);
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // 7. Gallery Interactive Filter Buttons Handler
  const filterBtns = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item, .filter-item, .masonry-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle active button highlight
        filterBtns.forEach(b => {
          b.classList.remove('active', 'btn-tertiary-custom');
          b.classList.add('btn-secondary-custom');
        });
        
        btn.classList.remove('btn-secondary-custom');
        btn.classList.add('active', 'btn-tertiary-custom');

        const filterVal = btn.getAttribute('data-filter');

        // Filter gallery cards with smooth show/hide transitions
        galleryItems.forEach(item => {
          item.classList.remove('scale-rotate-enter');

          if (filterVal === 'all' || item.classList.contains(filterVal)) {
            item.style.display = 'block';
            void item.offsetWidth; // Force reflow
            item.classList.add('scale-rotate-enter');
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      });
    });
  }
});
