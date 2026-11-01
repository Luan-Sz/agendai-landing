(() => {
  'use strict';
  const plans = ['free', 'standard', 'premium'];
  const endpoint = (window.AGENDAAI_CONFIG?.formspreeEndpoint || '').trim();
  const isConfigured = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint);

  const availability = document.getElementById('waitlist-availability');
  if (availability && !isConfigured) {
    availability.hidden = false;
    availability.textContent = 'A lista de espera ainda não recebe cadastros: a equipe precisa configurar o formulário. Você pode conhecer os planos, sem enviar seus dados.';
  }
  document.querySelectorAll('[data-plan-button]').forEach(button => {
    button.addEventListener('click', async () => {
      const plan = button.dataset.planButton;
      if (!plans.includes(plan) || button.disabled) return;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      try { await window.agendaiTrack?.('plano_escolhido', { plano: plan }); }
      catch { /* Uma falha de medição não impede a navegação. */ }
      window.location.assign(`reserva.html?plano=${encodeURIComponent(plan)}`);
    });
  });
  window.addEventListener('pageshow', () => {
    document.querySelectorAll('[data-plan-button]').forEach(button => {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    });
  });

  const checks = [...document.querySelectorAll('.demo-check')];
  const progress = document.getElementById('demo-progress');
  const adaptButton = document.getElementById('adapt-toggle');
  let adjusted = false;
  function updateDemo() {
    if (!checks.length || !progress) return;
    const completed = checks.filter(check => check.checked).length;
    document.getElementById('demo-bar').style.width = `${completed / checks.length * 100}%`;
    document.getElementById('demo-score').textContent = `★ ${completed * 20} pontos`;
    document.getElementById('demo-message').textContent = completed === checks.length
      ? 'Todas concluídas. Você conseguiu!'
      : `${completed} de ${checks.length} tarefas concluídas`;
    progress.setAttribute('aria-valuenow', String(completed));
    checks.forEach((checkbox, index) => {
      const row = checkbox.closest('.demo-task');
      row.classList.toggle('checked', checkbox.checked);
      const times = ['09:00', adjusted ? '19:30' : '16:00', '18:00'];
      row.querySelector('small').textContent = `${times[index]} · ${checkbox.checked ? 'Concluída' : 'Planejada'}`;
    });
  }
  checks.forEach(check => check.addEventListener('change', updateDemo));
  adaptButton?.addEventListener('click', () => {
    adjusted = !adjusted;
    adaptButton.setAttribute('aria-pressed', String(adjusted));
    adaptButton.textContent = adjusted ? 'Desfazer ajuste ↶' : 'Testar ajuste ↗';
    document.getElementById('adapt-feedback').textContent = adjusted
      ? 'Imprevisto acolhido. Horário ajustado na demonstração.'
      : 'A rotina pode mudar com você.';
    document.getElementById('adapt-slot').textContent = adjusted
      ? 'Tarefa remarcada para 19:30' : 'Próxima tarefa às 16:00';
    updateDemo();
  });
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  updateDemo();
})();
