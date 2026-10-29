(()=>{'use strict';const pet=document.getElementById('takagiPet'),img=document.querySelector('.pet-body-layer'),speech=document.getElementById('speech');if(!pet||!img)return;let token=0;const cache=new Map();
const say={smile:'看，我在笑呢。',wink:'偷偷给你眨一下眼。',surprise:'诶？你竟然猜到了！',blush:'别一直看啦，我会害羞的。',wave:'嗨，今天也一起回家吧。',spin:'转一圈，跟上我的节奏！',cheer:'耶！这次一起赢了！',step:'一步、两步，一起回家吧。'};
function outfit(){try{let x=localStorage.getItem('takagi-outfit-v59');return ['winter','home'].includes(x)?x:'summer'}catch{return 'summer'}}
function base(o){return o==='summer'?document.querySelector('[data-takagi-embedded]').src:new URL('assets/takagi-'+o+'-v59.webp',location.href).href}
function frame(n,o){if(n==='smile')return base(o);if(['wink','surprise','blush'].includes(n))return new URL('assets/takagi-'+(o==='summer'?'expression-'+n:o+'-'+n+'-v69')+'.webp',location.href).href;if(n==='wave')return new URL('assets/takagi-'+(o==='summer'?'action-wave':o+'-wave-v59')+'.webp',location.href).href;if(n==='cheer')return new URL('assets/takagi-'+(o==='summer'?'action-cheer':o+'-cheer-v69')+'.webp',location.href).href;return null}
function preload(src){if(!cache.has(src)){const p=new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve();i.onerror=()=>reject(Error('动作图片加载失败'));i.src=src});cache.set(src,p);p.catch(()=>cache.delete(src))}return cache.get(src)}
function preloadExpressions(){const o=outfit();for(const n of ['wink','surprise','blush','wave','cheer']){const src=frame(n,o);if(src)preload(src).catch(()=>{});}}
const section=document.getElementById('characters');if(section&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){preloadExpressions();observer.disconnect()}},{rootMargin:'900px'});observer.observe(section)}else preloadExpressions();
document.querySelectorAll('[data-outfit]').forEach(b=>b.addEventListener('click',()=>{queueMicrotask(preloadExpressions)}));
function clearMotion(){pet.classList.remove('v69-spin','v69-step')}
function cancel(){token++;clearMotion();document.querySelectorAll('.pet-toolkit button').forEach(b=>b.setAttribute('aria-pressed','false'))}
async function run(n,b,category){cancel();window.cancelPetVisualAction?.();const own=token,o=outfit(),src=frame(n,o);b.setAttribute('aria-pressed','true');if(speech)speech.textContent=say[n];if(n==='spin'||n==='step'){window.gsap?.killTweensOf(pet);pet.style.removeProperty('transform');img.src=base(o);void pet.offsetWidth;pet.classList.add('v69-'+n)}
if(src){try{await preload(src);if(own!==token)return;img.src=src;await img.decode();if(own!==token||img.src!==src)return}catch(error){if(own===token&&speech)speech.textContent='图片未能加载：'+n;return}}
setTimeout(()=>{if(own!==token)return;clearMotion();img.src=base(outfit());b.setAttribute('aria-pressed','false')},1800);
}
for(const b of document.querySelectorAll('.pet-toolkit [data-expression],.pet-toolkit [data-action]'))b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();const isExpression=!!b.dataset.expression,n=b.dataset.expression||b.dataset.action;run(n,b,isExpression?'expression':'action');if(isExpression&&typeof recordPetEvent==='function')recordPetEvent('expression');if(typeof recordGesture==='function')recordGesture((isExpression?'expression:':'action:')+n)},true);
document.addEventListener('click',e=>{if(e.target.closest('[data-outfit],.pet-hotspots [data-interact]'))cancel()},true);
})();
