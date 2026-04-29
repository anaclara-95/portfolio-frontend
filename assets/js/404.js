/* =========================================
   404 PAGE - 404.js
   ========================================= */
'use strict';

const lang = localStorage.getItem('lang') || 'es';
const theme = localStorage.getItem('theme') || 'light';

// Apply theme
document.documentElement.setAttribute('data-theme', theme);
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.innerHTML = theme === 'dark' ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.innerHTML = next === 'dark' ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
  });
}

// Lang toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.lang === lang);
  btn.addEventListener('click', () => {
    localStorage.setItem('lang', btn.dataset.lang);
    location.reload();
  });
});

// i18n content
const copy = {
  es: {
    title: 'Página no encontrada',
    desc: 'La página que buscás no existe o fue movida. ¡Volvé al inicio!',
    btnHome: 'Volver al inicio',
    btnContact: 'Contactarme'
  },
  en: {
    title: 'Page not found',
    desc: "The page you're looking for doesn't exist or has been moved. Head back home!",
    btnHome: 'Go back home',
    btnContact: 'Contact me'
  }
};

const c = copy[lang] || copy.es;
document.title = `404 - ${c.title} | Anaclara Ferrando`;
document.documentElement.lang = lang;

const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
set('error-title', c.title);
set('error-desc', c.desc);
set('error-btn-home', c.btnHome);
set('error-btn-contact', c.btnContact);
