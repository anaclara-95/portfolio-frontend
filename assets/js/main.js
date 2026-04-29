/* =========================================
   PORTFOLIO - ANACLARA FERRANDO
   main.js
   ========================================= */

'use strict';

/* -------- STATE -------- */
let currentLang = localStorage.getItem('lang') || 'es';
let currentTheme = localStorage.getItem('theme') || 'light';
let contentData = null;

// Detect if we're inside /pages/ subdirectory
const IS_SUBPAGE = window.location.pathname.includes('/pages/');
const ROOT = IS_SUBPAGE ? '../' : './';

/* =========================================
   1. LOAD JSON DATA
   ========================================= */
async function loadContent() {
  try {
    const res = await fetch(`${ROOT}data/content.json`);
    if (!res.ok) throw new Error('Failed to load content');
    contentData = await res.json();
    window.contentData = contentData; // expose globally for page scripts
    initApp();
  } catch (err) {
    console.error('Could not load content.json', err);
  }
}

/* =========================================
   2. INIT
   ========================================= */
function initApp() {
  applyTheme(currentTheme);
  renderPage();
  initNav();
  initThemeToggle();
  initLangToggle();
  initScrollReveal();
  initScrollUp();
  initContactForm();
  initActiveLink();
}

/* =========================================
   3. THEME
   ========================================= */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  localStorage.setItem('theme', theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark'
      ? '<i class="ri-sun-line"></i>'
      : '<i class="ri-moon-line"></i>';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

/* =========================================
   4. LANGUAGE / i18n
   ========================================= */
function t(key) {
  if (!contentData) return '';
  const keys = key.split('.');
  let val = contentData[currentLang];
  for (const k of keys) {
    if (val == null) return '';
    val = val[k];
  }
  return val ?? '';
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  renderPage();
  updateLangButtons();
  updateMetaTags();
    window.location.reload();
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
    
  });
}

function initLangToggle() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  updateLangButtons();
  
}

function updateMetaTags() {
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', t('meta.keywords'));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('meta.title'));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('meta.description'));
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', t('meta.title'));
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', t('meta.description'));
  document.documentElement.lang = currentLang;
}

/* =========================================
   5. RENDER PAGE - Dynamic content injection
   ========================================= */
function renderPage() {
  if (!contentData) return;
  updateMetaTags();
  renderNav();
  renderHome();
  renderAbout();
  renderSkills();
  renderProjects();
  renderServices();
  renderExperience();
  renderCTA();
  renderContact();
  renderFooter();
}

/* ---- NAV ---- */
function renderNav() {
  const logo = document.getElementById('nav-logo');
  if (logo) logo.textContent = 'Anaclara';

  const links = ['home', 'projects', 'services', 'experience', 'contact'];
  const icons = ['ri-home-2-fill', 'ri-folder-3-fill', 'ri-file-2-fill', 'ri-honour-fill', 'ri-send-plane-fill'];

  // On index.html use anchors; on subpages link back to index with anchors
  const hrefs = IS_SUBPAGE
    ? ['../index.html#home', '../index.html#projects', '../index.html#services', '../index.html#experience', '../index.html#contact']
    : ['#home', '#projects', '#services', '#experience', '#contact'];

  const navList = document.getElementById('nav-list');
  if (!navList) return;

  navList.innerHTML = links.map((key, i) => `
    <li>
      <a href="${hrefs[i]}" title="${t('nav.' + key)}" class="nav__link" data-section="${links[i]}">
        <i class="${icons[i]}"></i>
        <span class="nav__link-text">${t('nav.' + key)}</span>
      </a>
    </li>
  `).join('');
}

/* ---- HOME ---- */
function renderHome() {
  setText('home-greeting', t('home.greeting'));
  setText('home-name', t('home.name'));
  setText('home-role', t('home.role'));
  setText('home-tagline', t('home.tagline'));
  setText('home-btn-projects', t('home.btnProjects'));
  setText('home-btn-services', t('home.btnServices'));
  setText('home-btn-cv', t('home.btnCV'));
}

/* ---- ABOUT ---- */
function renderAbout() {
  setAttr('about-tag', 'textContent', t('about.title'));
  setHTML('about-description', t('about.description'));
  setHTML('about-note', t('about.note'));
  setText('about-btn-contact', t('about.btnContact'));
}

/* ---- SKILLS ---- */
function renderSkills() {
  setText('skills-title', t('skills.title'));
  setText('skills-description', t('skills.description'));
}

/* ---- PROJECTS ---- */
function renderProjects() {
  const tag = document.getElementById('projects-tag');
  const title = document.getElementById('projects-title');
  const subtitle = document.getElementById('projects-subtitle');
  if (tag) tag.textContent = t('projects.title');
  if (title) title.textContent = t('projects.title');
  if (subtitle) subtitle.textContent = t('projects.subtitle');

  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const items = t('projects.items');
  if (!items || !Array.isArray(items)) return;

  grid.innerHTML = items.map((p, i) => `
    <article class="project__card reveal reveal-delay-${Math.min(i + 1, 4)}">
      <div class="project__image-wrap">
        <img src="${p.image}" alt="${p.alt}" loading="lazy">
        <div class="project__overlay">
          <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project__overlay-btn">
            <i class="ri-external-link-line"></i> ${t('projects.btnVisit')}
          </a>
        </div>
      </div>
      <div class="project__body">
        <div class="project__tags">
          ${p.tags.map(tag => `<span class="project__tag">${tag}</span>`).join('')}
        </div>
        <h3 class="project__name">${p.name}</h3>
        <p class="project__description">${p.description}</p>
        <div class="project__skills">
          ${p.skills.map(s => `<img src="./assets/img/${s}" alt="${s.replace('.svg', '')}" title="${s.replace('.svg', '')}">`).join('')}
        </div>
        <div class="project__actions">
          <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project__btn project__btn--primary">
            <i class="ri-external-link-line"></i> ${t('projects.btnVisit')}
          </a>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project__btn project__btn--secondary">
            <i class="ri-github-fill"></i> ${t('projects.btnCode')}
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* ---- SERVICES ---- */
function renderServices() {
  setAttr('services-tag', 'textContent', t('services.title'));
  setText('services-title', t('services.title'));
  setText('services-subtitle', t('services.subtitle'));

  const grid = document.getElementById('services-grid');
  if (!grid) return;

  const items = t('services.items');
  if (!items || !Array.isArray(items)) return;

  grid.innerHTML = items.map((s, i) => `
    <article class="service__card reveal reveal-delay-${Math.min(i + 1, 4)}">
      <div class="service__icon-wrap">
        <i class="${s.icon}"></i>
      </div>
      <h3 class="service__name">${s.name}</h3>
      <p class="service__description">${s.description}</p>
    </article>
  `).join('');
}

/* ---- EXPERIENCE ---- */
function renderExperience() {
  setAttr('experience-tag', 'textContent', t('experience.title'));
  setText('experience-title', t('experience.title'));
  setText('experience-subtitle', t('experience.subtitle'));

  const timeline = document.getElementById('experience-timeline');
  if (!timeline) return;

  const items = t('experience.items');
  if (!items || !Array.isArray(items)) return;

  timeline.innerHTML = items.map((e, i) => `
    <div class="experience__item reveal reveal-delay-${Math.min(i + 1, 4)}">
      <div class="experience__dot-wrap">
        <div class="experience__dot"></div>
      </div>
      <div class="experience__card">
        <div class="experience__header">
          <h2 class="experience__company">${e.company}</h2>
          <span class="experience__date">${e.date}</span>
        </div>
        <p class="experience__role">${e.role}</p>
        <p class="experience__description">${e.description}</p>
      </div>
    </div>
  `).join('');
}

/* ---- CTA ---- */
function renderCTA() {
  setText('cta-title', t('cta.title'));
  setText('cta-description', t('cta.description'));
  setText('cta-btn-email', t('cta.btnEmail'));
  setText('cta-btn-whatsapp', t('cta.btnWhatsapp'));
}

/* ---- CONTACT ---- */
function renderContact() {
  setText('contact-title', t('contact.title'));
  setText('contact-subtitle', t('contact.subtitle'));
  setAttr('contact-name', 'placeholder', t('contact.namePlaceholder'));
  setAttr('contact-email', 'placeholder', t('contact.emailPlaceholder'));
  setAttr('contact-message', 'placeholder', t('contact.messagePlaceholder'));
  setText('contact-submit', t('contact.btnSend'));
  setText('contact-info-title', t('contact.infoTitle'));
  setText('contact-availability', t('contact.availability'));
}

/* ---- FOOTER ---- */
function renderFooter() {
  const logo = document.getElementById('footer-logo');
  if (logo) logo.textContent = 'Anaclara';

  const links = t('footer.links');
  const hrefs_base = t('footer.hrefs');
  const hrefs = IS_SUBPAGE
    ? hrefs_base.map(h => `../index.html${h}`)
    : hrefs_base;

  const nav = document.getElementById('footer-nav');
  if (nav && Array.isArray(links)) {
    nav.innerHTML = links.map((l, i) => `
      <li><a href="${hrefs[i]}" class="footer__link">${l}</a></li>
    `).join('');
  }

  setText('footer-copy', t('footer.copyright'));
}

/* =========================================
   6. DOM HELPERS
   ========================================= */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
function setAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el) el[attr] = val;
}

/* =========================================
   7. NAV SCROLL BEHAVIOUR
   ========================================= */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    toggleScrollUp();
    setActiveLink();
  }, { passive: true });
}

/* =========================================
   8. ACTIVE NAV LINK
   ========================================= */
function initActiveLink() {
  setActiveLink();
}

function setActiveLink() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links = document.querySelectorAll('.nav__link[data-section]');
  let current = '';

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) current = sec.id;
  });

  links.forEach(link => {
    link.classList.toggle('active-link', link.dataset.section === current);
  });
}

/* =========================================
   9. SCROLL UP BUTTON
   ========================================= */
function initScrollUp() {
  const btn = document.getElementById('scroll-up');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function toggleScrollUp() {
  const btn = document.getElementById('scroll-up');
  if (btn) btn.classList.toggle('show-scroll', window.scrollY >= 350);
}

/* =========================================
   10. SCROLL REVEAL
   ========================================= */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* Re-observe after dynamic content */
function reObserve() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => {
    observer.observe(el);
  });
}

/* =========================================
   11. CONTACT FORM (EmailJS)
   ========================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('#contact-submit');
    const msgEl = document.getElementById('contact-message-status');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite"></i> Enviando...';

    try {
      // EmailJS - replace with real service/template IDs
      if (typeof emailjs !== 'undefined') {
        await emailjs.sendForm(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          form
        );
      }

      if (msgEl) {
        msgEl.textContent = t('contact.successMessage');
        msgEl.className = 'contact__message success';
      }
      form.reset();
    } catch {
      if (msgEl) {
        msgEl.textContent = t('contact.errorMessage');
        msgEl.className = 'contact__message error';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="ri-send-plane-line"></i> ${t('contact.btnSend')}`;
    }
  });
}

/* Spin animation for loader */
const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(styleEl);

/* Expose reObserve globally for page scripts */
window.reObserve = reObserve;

/* =========================================
   BOOT
   ========================================= */
document.addEventListener('DOMContentLoaded', loadContent);
