(() => {
  'use strict';
  const cfg = window.AGENDAAI_CONFIG || {};
  const id = (cfg.ga4MeasurementId || '').trim();
  const enabled = /^G-[A-Z0-9]+$/i.test(id);
  const consentKey = 'agendaai_analytics_consent';
  let sessionChoice = null;
  let initialized = false;
  let notice = null;
  const readConsent = () => {
    try { return sessionChoice ?? localStorage.getItem(consentKey); }
    catch { return sessionChoice; }
  };
  const saveConsent = choice => {
    sessionChoice = choice;
    try { localStorage.setItem(consentKey, choice); } catch {}
  };

  function startAnalytics() {
    if (!enabled || initialized) return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }

  window.agendaiTrack = (event, parameters = {}) => new Promise(resolve => {
    if (readConsent() !== 'yes' || !initialized || typeof window.gtag !== 'function') {
      resolve(false);
      return;
    }
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(true); } };
    const timeout = window.setTimeout(finish, 450);
    window.gtag('event', event, {
      ...parameters,
      event_callback: () => { window.clearTimeout(timeout); finish(); },
      event_timeout: 400
    });
  });

  function hideNotice() { notice?.remove(); notice = null; }
  function showNotice() {
    if (!enabled || notice) return;
    notice = document.createElement('div');
    notice.className = 'analytics-consent';
    notice.setAttribute('role', 'region');
    notice.setAttribute('aria-label', 'Preferências de análise');
    notice.innerHTML = '<div><strong>Podemos medir visitas e cliques?</strong><p>Usamos o Google Analytics somente com sua permissão. <a href="privacidade.html">Saiba mais</a>.</p></div><div class="analytics-actions"><button type="button" data-consent="no">Recusar</button><button type="button" data-consent="yes">Permitir</button></div>';
    document.body.appendChild(notice);
    notice.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
      const answer = button.dataset.consent;
      saveConsent(answer);
      hideNotice();
      if (answer === 'yes') startAnalytics();
      if (answer === 'no' && initialized) window.location.reload();
    }));
  }

  if (!enabled) return;
  const changeButton = document.getElementById('analytics-preferences');
  if (changeButton) {
    changeButton.hidden = false;
    changeButton.addEventListener('click', () => { hideNotice(); showNotice(); });
  }
  if (readConsent() === 'yes') startAnalytics();
  else if (readConsent() !== 'no') showNotice();
})();
