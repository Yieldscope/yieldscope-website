'use strict';
/* Theme — shared by every page (header toggle + brand logo swap). */
const themeButton=document.querySelector('#theme');
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  if(themeButton){
    const label=`Switch to ${theme==='light'?'dark':'light'} mode`;
    themeButton.setAttribute('aria-label',label);themeButton.title=label;
  }
  const brandLogo=document.querySelector('.brand img');
  if(brandLogo)brandLogo.src=`asset/logo-${theme}.png`;
}
try{setTheme(localStorage.getItem('theme')==='dark'?'dark':'light')}catch{setTheme('light')}
if(themeButton)themeButton.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='light'?'dark':'light';setTheme(next);
  try{localStorage.setItem('theme',next)}catch{}
});

/* Comparison demo table — homepage only. */
if(document.querySelector('.comparison')){
  const data = {
    deposits: [
      {name:'Example bank A',type:'Time deposit',yield:5.10,term:'6 months',condition:'New funds only',detail:'Fictional example: HKD 100,000 minimum, a six-month term and a new-funds condition. This annualised rate does not mean a 5.10% return over six months. Confirm eligibility and early-withdrawal terms with the bank.'},
      {name:'Example bank B',type:'Time deposit',yield:3.80,term:'3 months',condition:'Minimum deposit',detail:'Fictional example: HKD 10,000 minimum and a three-month term. A lower annualised rate may come with different minimums or a shorter commitment. This is not an available offer.'},
      {name:'Example bank C',type:'Time deposit',yield:2.70,term:'1 month',condition:'Shorter commitment',detail:'Fictional example: HKD 10,000 minimum and a one-month term. Look at when your money becomes available, not just the annualised rate. This is not an available offer.'}
    ],
    bonds: [
      {name:'Example bond A',type:'Corporate bond',yield:5.40,term:'5 years',condition:'Issuer credit risk',detail:'Fictional example: a 5.40% coupon, paid on the bond’s face value. Coupon is not the same as yield to maturity. The purchase price, issuer credit risk and maturity all matter. Capital is at risk.'},
      {name:'Example bond B',type:'Corporate bond',yield:4.20,term:'3 years',condition:'Price may fluctuate',detail:'Fictional example: a 4.20% coupon and a three-year maturity. Selling before maturity may result in a loss. These figures do not describe any actual security.'},
      {name:'Example bond C',type:'Government bond',yield:2.90,term:'2 years',condition:'Check maturity date',detail:'Fictional example: a 2.90% coupon and a two-year maturity. Check the full issue terms and the purchase price; coupon alone does not show your expected return.'}
    ],
    stocks: [
      {name:'Example stock A',type:'Dividend stock',yield:6.20,term:'Variable',condition:'Dividends can change',detail:'Fictional example: historical dividend yield of 6.20%. Dividends are not guaranteed and the share price can fall. A high historical yield is not a promise of future income.'},
      {name:'Example stock B',type:'Dividend stock',yield:3.60,term:'Variable',condition:'Capital at risk',detail:'Fictional example: historical dividend yield of 3.60%. Look at payout history and the share price together. Past payouts do not guarantee future dividends.'},
      {name:'Example stock C',type:'Dividend stock',yield:2.30,term:'Variable',condition:'Past payouts only',detail:'Fictional example: historical dividend yield of 2.30%. This is an illustration, not a quoted security or a recommendation. Both income and capital can change.'}
    ]
  };
  const chevron='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
  let category='deposits', descending=true;
  const body=document.querySelector('#products');
  const detail=document.querySelector('#product-detail');
  function render(){
    const rows=[...data[category]].sort((a,b)=>descending?b.yield-a.yield:a.yield-b.yield);
    body.innerHTML=rows.map(p=>`<tr><td><span class="product-name">${p.name}</span><span class="product-type">${p.type}</span></td><td><span class="yield ${p.yield>=5?'high':p.yield>=3?'medium':'low'}">${p.yield.toFixed(2)}%</span></td><td class="term-cell"><span class="term">${p.term}</span></td><td class="condition-cell"><span class="condition">${p.condition}</span></td><td><button class="details-button" aria-label="Show conditions for ${p.name}" aria-expanded="false" aria-controls="product-detail" data-name="${p.name}">${chevron}</button></td></tr>`).join('');
    detail.replaceChildren();
    const sortButton=document.querySelector('#sort');
    sortButton.firstChild.textContent=category==='bonds'?'Coupon p.a.':'Yield p.a.';
    sortButton.setAttribute('aria-label',`Sort ${category==='bonds'?'coupon':'yield'} from ${descending?'lowest to highest':'highest to lowest'}`);
    document.querySelector('#yield-heading').setAttribute('aria-sort',descending?'descending':'ascending');
  }
  document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
    category=button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    render();
  }));
  document.querySelector('#sort').addEventListener('click',()=>{descending=!descending;render()});
  body.addEventListener('click',event=>{
    const button=event.target.closest('[data-name]');if(!button)return;
    const wasOpen=button.getAttribute('aria-expanded')==='true';
    body.querySelectorAll('[data-name]').forEach(b=>{b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',`Show conditions for ${b.dataset.name}`)});
    detail.replaceChildren();
    if(!wasOpen){
      const product=data[category].find(p=>p.name===button.dataset.name);
      const heading=document.createElement('strong');heading.textContent=product.name+' — the conditions';
      detail.append(heading,document.createTextNode(product.detail));
      button.setAttribute('aria-expanded','true');button.setAttribute('aria-label',`Hide conditions for ${product.name}`);
    }
  });
  render();
}
