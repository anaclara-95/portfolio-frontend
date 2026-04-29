/* =========================================
   SERVICES PAGE - services-page.js
   ========================================= */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const wait = setInterval(() => {
    if (window.contentData) {
      clearInterval(wait);
      renderServicesPage();
    }
  }, 80);
  setTimeout(() => clearInterval(wait), 5000);
});

function renderServicesPage() {
  const lang = localStorage.getItem('lang') || 'es';
  const data = window.contentData?.[lang];
  if (!data) return;

  renderProcessSection(lang);
}

function renderProcessSection(lang) {
  const processGrid = document.getElementById('process-grid');
  if (!processGrid) return;

  const steps = {
    es: [
      { num: '1', title: 'Consulta', desc: 'Conversamos sobre tu proyecto, objetivos y necesidades específicas.' },
      { num: '2', title: 'Propuesta', desc: 'Diseño una propuesta con tiempos y costos adaptados a tu presupuesto.' },
      { num: '3', title: 'Desarrollo', desc: 'Construyo tu sitio con código limpio, responsive y optimizado.' },
      { num: '4', title: 'Entrega', desc: 'Te entrego el proyecto listo para producción con soporte post-lanzamiento.' }
    ],
    en: [
      { num: '1', title: 'Consultation', desc: 'We talk about your project, goals and specific needs.' },
      { num: '2', title: 'Proposal', desc: 'I design a proposal with timelines and costs adapted to your budget.' },
      { num: '3', title: 'Development', desc: 'I build your site with clean, responsive and optimized code.' },
      { num: '4', title: 'Delivery', desc: 'I deliver the project ready for production with post-launch support.' }
    ]
  };

  const list = steps[lang] || steps.es;

  processGrid.innerHTML = list.map((s, i) => `
    <div class="process__step reveal reveal-delay-${i + 1}">
      <div class="process__step-num">${s.num}</div>
      <h3 class="process__step-title">${s.title}</h3>
      <p class="process__step-desc">${s.desc}</p>
    </div>
  `).join('');

  const processTag = document.getElementById('process-tag');
  const processTitle = document.getElementById('process-title');
  if (processTag) processTag.textContent = lang === 'es' ? 'Proceso' : 'Process';
  if (processTitle) processTitle.textContent = lang === 'es' ? '¿Cómo trabajo?' : 'How I work';

  requestAnimationFrame(() => {
    if (typeof reObserve === 'function') reObserve();
  });
}
