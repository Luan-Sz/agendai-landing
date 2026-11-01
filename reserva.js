(() => {
  'use strict';
  const plans={free:{name:'Free',price:'Grátis'},standard:{name:'Standard',price:'R$ 9,90/mês*'},premium:{name:'Premium',price:'R$ 19,90/mês*'}};
  const raw=new URLSearchParams(window.location.search).get('plano');
  const plan=Object.hasOwn(plans,raw)?raw:'free';
  document.getElementById('selected-plan').textContent=plans[plan].name;
  document.getElementById('selected-price').textContent=plans[plan].price;
  document.getElementById('success-plan').textContent=plans[plan].name;
  const form=document.getElementById('waitlist-form');
  const msg=document.getElementById('form-status');
  const btn=document.getElementById('join-btn');
  const endpoint=(window.AGENDAAI_CONFIG?.formspreeEndpoint || '').trim();
  const configured=/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
  if(!configured){
    btn.disabled=true;
    btn.textContent='Inscrições ainda não configuradas';
    msg.textContent='A lista de espera será ativada depois que a equipe conectar o Formspree.';
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    msg.textContent='';
    msg.classList.remove('error');
    if(!configured || !form.reportValidity())return;
    btn.disabled=true;
    btn.textContent='Enviando inscrição…';
    const formData=new FormData();
    formData.append('plan',plan);
    formData.append('name',document.getElementById('lead-name').value.trim());
    formData.append('email',document.getElementById('lead-email').value.trim());
    formData.append('consent','sim');
    formData.append('_subject',`Agenda.ai: interesse no plano ${plans[plan].name}`);
    try{
      const response=await fetch(endpoint,{method:'POST',headers:{Accept:'application/json'},body:formData});
      if(!response.ok)throw new Error('Não foi possível confirmar sua inscrição. Tente novamente.');
      window.agendaiTrack?.('lista_espera_confirmada',{plano:plan});
      document.getElementById('reserve-content').style.display='none';
      document.getElementById('success-box').classList.add('active');
    }catch(error){
      msg.classList.add('error');
      msg.textContent=error.message||'Falha no envio. Tente novamente.';
      btn.disabled=false;
      btn.textContent='Entrar na lista de espera ↗';
    }
  });
})();
