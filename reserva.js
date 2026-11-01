(() => {
  'use strict';
  const plans = {
    free: { name: 'Free', price: 'Grátis' },
    premium: { name: 'Premium', price: 'R$ 19,90/mês*' }
  };
  const chosen = new URLSearchParams(window.location.search).get('plano');
  const plan = Object.hasOwn(plans, chosen) ? chosen : null;
  if (!plan) {
    window.location.replace('index.html#planos');
    return;
  }
  document.getElementById('selected-plan').textContent = plans[plan].name;
  document.getElementById('selected-price').textContent = plans[plan].price;
  document.getElementById('success-plan').textContent = plans[plan].name;
  const form = document.getElementById('waitlist-form');
  const msg = document.getElementById('form-status');
  const button = document.getElementById('join-btn');
  const endpoint = (window.AGENDAAI_CONFIG?.formspreeEndpoint || '').trim();
  const configured = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint);
  if (!configured) {
    form.hidden = true;
    const notice = document.createElement('p');
    notice.className = 'notice';
    notice.setAttribute('role', 'status');
    notice.textContent = 'A lista de espera ainda não recebe inscrições. A equipe está configurando o formulário. Nenhum dado foi coletado nesta etapa.';
    form.before(notice);
    return;
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    msg.textContent = '';
    msg.classList.remove('error');
    if (!form.reportValidity() || button.disabled) return;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = 'Confirmando inscrição…';
    const data = new FormData();
    data.append('plan', plan);
    data.append('name', document.getElementById('lead-name').value.trim());
    data.append('email', document.getElementById('lead-email').value.trim());
    data.append('consent', 'sim');
    data.append('_subject', `Agenda.ai: interesse no plano ${plans[plan].name}`);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!response.ok) throw new Error('Não foi possível confirmar a inscrição. Tente novamente.');
      window.agendaiTrack?.('lista_espera_confirmada', { plano: plan });
      document.getElementById('reserve-content').hidden = true;
      document.getElementById('success-box').classList.add('active');
      document.getElementById('success-box').focus();
    } catch (error) {
      msg.classList.add('error');
      msg.textContent = error.message || 'Falha no envio. Tente novamente.';
      button.disabled = false;
      button.removeAttribute('aria-busy');
      button.textContent = 'Entrar na lista de espera ↗';
    }
  });
})();
