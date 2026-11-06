(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const year = document.getElementById('year');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (year) year.textContent = String(new Date().getFullYear());

  if (themeToggle) {
    const updateThemeToggle = () => {
      const isDark = document.documentElement.dataset.theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      themeToggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☀' : '☾';
      themeToggle.querySelector('.theme-toggle-label').textContent = `${isDark ? 'Light' : 'Dark'} mode`;
      if (themeColor) themeColor.content = isDark ? '#111019' : '#fff7fa';
    };

    updateThemeToggle();
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
      updateThemeToggle();
      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch (error) {
        console.warn('Could not save the selected portfolio theme.', error);
      }
    });
  }

  const pageLoader = document.querySelector('.page-loader');
  const loaderMessage = document.querySelector('.loader-message');
  const loaderProgress = document.querySelector('.loader-progress');
  const loaderFill = document.querySelector('.loader-progress-fill');
  const loaderPercent = document.querySelector('.loader-percent');
  const loaderRideway = document.querySelector('.loader-rideway');
  const loaderScooter = document.querySelector('.loader-scooter');

  if (pageLoader && loaderMessage && loaderProgress && loaderFill && loaderPercent && loaderRideway && loaderScooter) {
    const loadingDuration = 7000;
    const startTime = performance.now();
    let previousPercent = -1;
    const updateProgress = (now) => {
      const progress = Math.min((now - startTime) / loadingDuration, 1);
      const percent = Math.floor(progress * 100);
      const scooterTravel = Math.max(0, loaderRideway.clientWidth - loaderScooter.getBoundingClientRect().width);
      const scooterPosition = Math.min(scooterTravel, Math.max(0, loaderRideway.clientWidth * progress - loaderScooter.getBoundingClientRect().width / 2));
      pageLoader.style.setProperty('--loader-scooter-left', `${scooterPosition}px`);
      if (percent !== previousPercent) {
        previousPercent = percent;
        loaderFill.style.width = `${percent}%`;
        loaderPercent.textContent = `${percent}%`;
        loaderProgress.setAttribute('aria-valuenow', String(percent));
      }

      if (progress < 1) {
        window.requestAnimationFrame(updateProgress);
        return;
      }

      pageLoader.classList.add('is-complete');
      pageLoader.querySelector('.loader-complete')?.setAttribute('aria-hidden', 'false');
      window.setTimeout(() => {
        pageLoader.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('loading');
      }, 2000);
    };
    window.requestAnimationFrame(updateProgress);
  }

  const starField = document.querySelector('.ambient-lights');
  if (starField) {
    const starColors = ['#d7799a', '#a991d1', '#79bfc2'];
    for (let index = 0; index < 22; index += 1) {
      const star = document.createElement('span');
      star.className = 'ambient-star';
      star.style.setProperty('--star-x', `${Math.random() * 100}%`);
      star.style.setProperty('--star-y', `${Math.random() * 100}%`);
      star.style.setProperty('--star-color', starColors[index % starColors.length]);
      star.style.setProperty('--star-duration', `${5 + Math.random() * 7}s`);
      star.style.setProperty('--star-delay', `${Math.random() * -10}s`);
      starField.append(star);
    }
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.getAttribute('href') === `#${entry.target.id}`;
          if (current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
          link.classList.toggle('active', current);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const roleElement = document.querySelector('.typed-role');
  if (roleElement && !reducedMotion) {
    let roles;
    try {
      roles = JSON.parse(roleElement.dataset.roles || '[]');
    } catch (error) {
      throw new Error('The hero role list must contain valid JSON.', { cause: error });
    }
    if (roles.length > 1 && roles.every((role) => typeof role === 'string')) {
      let roleIndex = 0;
      let characterIndex = roles[0].length;
      let deleting = true;
      roleElement.textContent = roles[0];
      const typeNext = () => {
        const role = roles[roleIndex];
        if (deleting) {
          characterIndex -= 1;
          roleElement.textContent = role.slice(0, characterIndex);
          if (characterIndex <= 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        } else {
          const nextRole = roles[roleIndex];
          characterIndex += 1;
          roleElement.textContent = nextRole.slice(0, characterIndex);
          if (characterIndex >= nextRole.length) {
            deleting = true;
            window.setTimeout(typeNext, 1500);
            return;
          }
        }
        window.setTimeout(typeNext, deleting ? 38 : 65);
      };
      window.setTimeout(typeNext, 1700);
    }
  }

  const portrait = document.querySelector('[data-tilt]');
  if (portrait && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    portrait.addEventListener('pointermove', (event) => {
      const bounds = portrait.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const card = portrait.querySelector('.portrait-card');
      if (card) card.style.transform = `rotateX(${-y * 5}deg) rotateY(${x * 7}deg)`;
    });
    portrait.addEventListener('pointerleave', () => {
      const card = portrait.querySelector('.portrait-card');
      if (card) card.style.transform = '';
    });
  }

  document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
