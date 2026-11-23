
(function(){
  var routes={
    '':'view-home',
    '/':'view-home',
    '/project/pos-lending':'view-pos-lending',
    '/project/aggregated-payments':'view-aggregated-payments',
    '/project/restaurant-saas':'view-restaurant-saas',
    '/project/enterprise-pmo':'view-enterprise-pmo',
    '/project/gov-gis':'view-gov-gis',
    '/project/uk-cross-border':'view-uk',
    '/project/sme-open-banking':'view-sme',
    '/project/payment-conversion-lab':'view-pcl'
  };
  var meta={
    'view-home':['Jingyun He — Senior Product Manager · Payments & Embedded Finance','UK-based Senior Product Manager with 10+ years building regulated payments, merchant lending and B2B SaaS products.'],
    'view-uk':['UK Cross-Border Payment — Checkout Optimisation · Jingyun He','Remittance checkout analysed against FCA Consumer Duty findings: journey mapping, RICE prioritisation and a full product proposal.'],
    'view-pcl':['Payment Conversion Lab — Evidence-Based Experiment Decisions · Jingyun He','A self-directed interactive case study: from a payment conversion drop to an evidence-based decision, with guardrails, missing-data rules and a clear rollout boundary. Synthetic data.'],
    'view-sme':['SME Open Banking — Affordability Assessment · Jingyun He','An Open Banking-enabled SME lending journey, with Consumer Duty scope turning on borrower legal structure.'],
    'view-restaurant-saas':['Restaurant SaaS + Embedded Finance · Jingyun He','Vertical SaaS turning daily restaurant operations into a live credit signal, then into embedded lending.'],
    'view-pos-lending':['Merchant Cash Advance — POS Lending · Jingyun He','Bank-funded working capital underwritten on POS transaction flow, repaid as a share of daily takings.'],
    'view-aggregated-payments':['Aggregated Payment Platform · Jingyun He','Value-aware routing across QR and card-present rails, unified on a single auditable double-entry ledger.'],
    'view-enterprise-pmo':['Enterprise Delivery — PMO Governance & Group ERP · Jingyun He','CMMI Level 3 certification, delivery governance across 100+ project managers, and a group ERP built 0→1.'],
    'view-gov-gis':['Government Digital Transformation — GIS Platform · Jingyun He','One authoritative geospatial data layer replacing per-department point solutions across government agencies.']
  };
  function setMeta(id){
    var m=meta[id]||meta['view-home'];
    document.title=m[0];
    var pairs=[['name','description'],['property','og:title'],['property','og:description'],['name','twitter:title'],['name','twitter:description']];
    var vals=[m[1],m[0],m[1],m[0],m[1]];
    pairs.forEach(function(p,i){
      var el=document.querySelector('meta['+p[0]+'="'+p[1]+'"]');
      if(el){el.setAttribute('content',vals[i]);}
    });
    var canon=document.querySelector('link[rel="canonical"]');
    if(canon){canon.setAttribute('href','https://qing-yunh.github.io/jingyun-portfolio/'+(location.hash||''));}
  }

  var pendingAnchor=null;

  var revealObserver=null;
  if('IntersectionObserver' in window && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    revealObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');revealObserver.unobserve(e.target)}
      });
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  }
  function setupReveal(viewEl){
    if(!revealObserver)return;
    var sel='.block,.pcard,.legacy-ledger,figure.fig,figure.prodshot,.shot-grid,.impact-grid,.domain,.philo-item,.decision,.uk-card,.uk-persona-box,.uk-callout,.uk-story-box,.uk-metric';
    viewEl.querySelectorAll(sel).forEach(function(el){
      if(el.dataset.revealed)return;
      el.dataset.revealed='1';
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  function render(){
    var hash=location.hash.replace(/^#/,'');
    var id=routes[hash]||'view-home';
    document.querySelectorAll('.view').forEach(function(v){v.classList.remove('active')});
    var activeView=document.getElementById(id);
    activeView.classList.add('active');
    setMeta(id);
    setupReveal(activeView);
    if(pendingAnchor && id==='view-home'){
      var el=document.getElementById(pendingAnchor);
      pendingAnchor=null;
      if(el){el.scrollIntoView({behavior:'smooth'});return}
    }
    window.scrollTo(0,0);
  }

  document.querySelectorAll('[data-home-link]').forEach(function(a){
    a.addEventListener('click',function(){
      pendingAnchor=a.getAttribute('data-home-link');
      if(location.hash===''||location.hash==='#/'){render()}
    });
  });

  var ml=document.getElementById('mailLink');
  if(ml){
    ml.addEventListener('click',function(e){
      e.preventDefault();
      var a=atob(ml.getAttribute('data-k')).split('').reverse().join('');
      window.location.href='mailto:'+a+'?subject='+encodeURIComponent('Hello from your portfolio');
    });
  }

  window.addEventListener('hashchange',function(){
    var h=location.hash.replace(/^#/,'');
    if(h.charAt(0)!=='/')return;                                                                                                                        
    render();
  });
  render();
})();
