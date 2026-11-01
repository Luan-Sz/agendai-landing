(() => {
  'use strict';
  const cfg=window.AGENDAAI_CONFIG || {};
  const id=(cfg.ga4MeasurementId || '').trim();
  const enabled=/^G-[A-Z0-9]+$/i.test(id);
  const consentKey='agendaai_analytics_consent';
  let initialized=false;
  let sessionChoice=null;
  const readConsent=()=>{try{return sessionChoice ?? localStorage.getItem(consentKey)}catch{return sessionChoice}};
  const saveConsent=(choice)=>{sessionChoice=choice;try{localStorage.setItem(consentKey,choice)}catch{}};

  function startAnalytics(){
    if(!enabled || initialized)return;
    initialized=true;
    window.dataLayer=window.dataLayer || [];
    window.gtag=function(){window.dataLayer.push(arguments)};
    window.gtag('js',new Date());
    window.gtag('config',id,{send_page_view:true});
    const script=document.createElement('script');
    script.async=true;
    script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
  }

  window.agendaiTrack=(event,parameters={})=>{
    if(readConsent()==='yes' && initialized && typeof window.gtag==='function'){
      window.gtag('event',event,parameters);
    }
  };

  if(!enabled)return;
  const choice=readConsent();
  if(choice==='yes'){
    startAnalytics();
    return;
  }
  if(choice==='no')return;
  const notice=document.createElement('div');
  notice.className='analytics-consent';
  notice.setAttribute('role','region');
  notice.setAttribute('aria-label','Preferências de análise');
  notice.innerHTML='<div><strong>Podemos medir visitas e cliques?</strong><p>Usamos o Google Analytics para analisar interesse nos planos, apenas com sua permissão. <a href="privacidade.html">Saiba mais</a>.</p></div><div class="analytics-actions"><button type="button" data-consent="no">Recusar</button><button type="button" data-consent="yes">Permitir</button></div>';
  document.body.appendChild(notice);
  notice.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{
    const answer=button.dataset.consent;
    saveConsent(answer);
    notice.remove();
    if(answer==='yes')startAnalytics();
  }));
})();
