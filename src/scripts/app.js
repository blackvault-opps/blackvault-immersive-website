const ageDialog=document.getElementById('ageDialog');
const infoDialog=document.getElementById('infoDialog');
const enterCasino=document.getElementById('enterCasino');
const exploreBlackVault=document.getElementById('exploreBlackVault');
const declineAge=document.getElementById('declineAge');
const menuToggle=document.getElementById('menuToggle');
const quickMenu=document.getElementById('quickMenu');
const cursorAura=document.querySelector('.cursor-aura');

function openAgeGate(){
  if(typeof ageDialog.showModal==='function') ageDialog.showModal();
  else alert('Age confirmation required: this 18+ prototype is intended for adults only.');
}

enterCasino.addEventListener('click',openAgeGate);
exploreBlackVault.addEventListener('click',()=>{if(typeof infoDialog.showModal==='function') infoDialog.showModal();});

ageDialog.addEventListener('close',()=>{
  if(ageDialog.returnValue==='confirm'){
    localStorage.setItem('blackvaultAgeConfirmed','true');
    document.body.classList.add('age-confirmed');
    setTimeout(()=>alert('Age confirmed. BlackVault Nexus entry is unlocked in this prototype.'),60);
  }
});

declineAge.addEventListener('click',()=>localStorage.removeItem('blackvaultAgeConfirmed'));

menuToggle.addEventListener('click',()=>{
  const isOpen=quickMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(isOpen));
  quickMenu.setAttribute('aria-hidden',String(!isOpen));
});

document.addEventListener('click',event=>{
  if(!event.target.closest('.floating-menu')){
    quickMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded','false');
    quickMenu.setAttribute('aria-hidden','true');
  }
});

document.querySelectorAll('[data-prototype-action]').forEach(control=>{
  control.addEventListener('click',event=>{
    event.preventDefault();
    alert(`${control.getAttribute('data-prototype-action')} is a placeholder in this hero-stage prototype.`);
  });
});

if(window.matchMedia('(pointer: fine)').matches){
  let mouseX=-100,mouseY=-100,auraX=-100,auraY=-100;
  document.body.classList.add('cursor-live');
  window.addEventListener('mousemove',event=>{mouseX=event.clientX;mouseY=event.clientY;});
  function animateCursor(){
    auraX+=(mouseX-auraX)*0.16;
    auraY+=(mouseY-auraY)*0.16;
    cursorAura.style.left=`${auraX}px`;
    cursorAura.style.top=`${auraY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

document.querySelectorAll('button,a').forEach(el=>{
  el.addEventListener('mouseenter',()=>{if(cursorAura){cursorAura.style.width='42px';cursorAura.style.height='42px';}});
  el.addEventListener('mouseleave',()=>{if(cursorAura){cursorAura.style.width='26px';cursorAura.style.height='26px';}});
});
