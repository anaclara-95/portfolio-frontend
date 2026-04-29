/* =========================================
   PROJECTS PAGE - projects-page.js
   ========================================= */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initProjectsPage();
});

function initProjectsPage() {
  // Wait for main.js to load content
  const wait = setInterval(() => {
    if (window.contentData) {
      clearInterval(wait);
      renderProjectsPage();
      initFilters();
    }
  }, 80);

  // Fallback timeout
  setTimeout(() => clearInterval(wait), 5000);
}

function renderProjectsPage() {
  const lang = localStorage.getItem('lang') || 'es';
  const data = window.contentData?.[lang];
  if (!data) return;

  // Update page text
  const backLabel = document.getElementById('back-label');
  if (backLabel) backLabel.textContent = lang === 'es' ? 'Volver' : 'Back';

  const filterAll = document.getElementById('filter-all');
  if (filterAll) filterAll.textContent = lang === 'es' ? 'Todos' : 'All';

  renderAllProjects(data);
}

function renderAllProjects(data) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const items = data.projects?.items || [];
  const btnVisit = data.projects?.btnVisit || 'Ver proyecto';
  const btnCode = data.projects?.btnCode || 'Código';

  grid.innerHTML = items.map((p, i) => `
    <article class="project__card reveal reveal-delay-${Math.min(i + 1, 4)}"
             data-tags="${p.tags.join(',')}">
      <div class="project__image-wrap">
        <img src="../${p.image}" alt="${p.alt}" loading="lazy">
        <div class="project__overlay">
          <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project__overlay-btn">
            <i class="ri-external-link-line"></i> ${btnVisit}
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
          ${p.skills.map(s => `<img src="../assets/img/${s}" alt="${s.replace('.svg','')}" title="${s.replace('.svg','')}">`).join('')}
        </div>
        <div class="project__actions">
          <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project__btn project__btn--primary">
            <i class="ri-external-link-line"></i> ${btnVisit}
          </a>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project__btn project__btn--secondary">
            <i class="ri-github-fill"></i> ${btnCode}
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Re-trigger reveal
  requestAnimationFrame(() => {
    if (typeof reObserve === 'function') reObserve();
  });
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.project__card');

      cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });
}
