(() => {
  'use strict';
  const plans=['free','standard','premium'];
  document.querySelectorAll('[data-count]').forEach(el=>{
    el.textContent='Interesse medido sem exibir contagens públicas';
  });
  document.querySelectorAll('[data-plan-button]').forEach(button=>{
    button.addEventListener('click',()=>{
      const plan=button.dataset.planButton;
      if(!plans.includes(plan))return;
      window.agendaiTrack?.('plano_escolhido',{plano:plan});
      // Sem backend: a escolha avança para a etapa de inscrição.
      window.location.assign(`reserva.html?plano=${encodeURIComponent(plan)}`);
    });
  });
  const checks=[...document.querySelectorAll('.demo-check')];
  let adjusted=false;
  const progress=document.getElementById('demo-progress');
  function updateDemo(){
    if(!checks.length || !progress)return;
    const completed=checks.filter(check=>check.checked).length;
    document.getElementById('demo-bar').style.width=`${completed/checks.length*100}%`;
    document.getElementById('demo-score').textContent=`★ ${completed*20} pontos`;
    document.getElementById('demo-message').textContent=completed===3?'Todas concluídas. Você conseguiu!':`${completed} de ${checks.length} tarefas concluídas`;
    progress.setAttribute('aria-valuenow',String(completed));
    checks.forEach((checkbox,index)=>{
      const row=checkbox.closest('.demo-task');
      row.classList.toggle('checked',checkbox.checked);
      const times=['09:00',adjusted?'19:30':'16:00','18:00'];
      row.querySelector('small').textContent=`${times[index]} · ${checkbox.checked?'Concluída':'Planejada'}`;
    });
  }
  checks.forEach(check=>check.addEventListener('change',updateDemo));
  const adjustBtn=document.getElementById('adapt-toggle');
  adjustBtn?.addEventListener('click',()=>{
    adjusted=!adjusted;
    adjustBtn.setAttribute('aria-pressed',String(adjusted));
    adjustBtn.textContent=adjusted?'Desfazer ajuste ↶':'Testar ajuste ↗';
    document.getElementById('adapt-feedback').textContent=adjusted?'Tudo bem. Ajustamos a tarefa na demonstração.':'A rotina pode mudar com você.';
    document.getElementById('adapt-slot').textContent=adjusted?'Tarefa remarcada para 19:30':'Próxima tarefa às 16:00';
    updateDemo();
  });
  document.getElementById('year').textContent=new Date().getFullYear();
  updateDemo();
})();
