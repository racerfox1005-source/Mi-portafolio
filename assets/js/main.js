
const HOME_ID = 'inicio';

function pauseAllVideos() {
  document.querySelectorAll('.commission-card__video').forEach((video) => {
    video.pause();
  });
}

function showSection(id) {
  const hero = document.getElementById(`${HOME_ID}-section`);
  const views = document.querySelectorAll('.view');
  const header = document.getElementById('siteHeader');
  const isHome = id === HOME_ID;

  hero.hidden = !isHome;
  views.forEach((view) => {
    view.hidden = view.id !== `${id}-section`;
  });
  header.hidden = isHome;

  if (id !== 'comisiones') pauseAllVideos();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigation() {
  document.querySelectorAll('[data-target]').forEach((el) => {
    el.addEventListener('click', () => showSection(el.dataset.target));
  });
}

function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const list = document.getElementById('siteNavList');
  if (!toggle || !list) return;

  const closeMenu = () => {
    list.classList.remove('site-header__nav-list--open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = list.classList.toggle('site-header__nav-list--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  list.querySelectorAll('[data-target]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    const isOpen = list.classList.contains('site-header__nav-list--open');
    if (isOpen && !list.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

function initLazyVideos() {
  document.querySelectorAll('.commission-card__media').forEach((media) => {
    const playBtn = media.querySelector('.commission-card__play');
    const video = media.querySelector('.commission-card__video');
    if (!playBtn || !video) return;

    playBtn.addEventListener('click', () => {
      if (!video.src && media.dataset.videoSrc) {
        video.src = media.dataset.videoSrc;
      }
      video.controls = true;
      video.play();
      playBtn.hidden = true;
    });

    video.addEventListener('pause', () => {
      playBtn.hidden = false;
      video.controls = false;
    });
  });
}

function initCommissionThumbnails() {
  const cards = document.querySelectorAll('.commission-card__media');
  if (!cards.length) return;

  const loadThumbnail = (media) => {
    const video = media.querySelector('.commission-card__video');
    const src = media.dataset.videoSrc;
    if (!video || !src || video.src) return;

    video.preload = 'metadata';
    video.src = src;

    video.addEventListener('loadeddata', () => {
      video.classList.add('commission-card__video--ready');
    }, { once: true });
  };

  if (!('IntersectionObserver' in window)) {
    cards.forEach(loadThumbnail);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadThumbnail(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '200px 0px' }
  );

  cards.forEach((card) => observer.observe(card));
}

function abrirTikTok() {
  const url = 'https://www.tiktok.com/@dav_serrano1005';
  const win = window.open(url, '_blank');

  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = url;
  }
}

function initTikTokButton() {
  const btn = document.querySelector('[data-action="tiktok"]');
  if (btn) btn.addEventListener('click', abrirTikTok);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initNavToggle();
  initLazyVideos();
  initCommissionThumbnails();
  initTikTokButton();
});
