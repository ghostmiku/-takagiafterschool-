(()=>{'use strict';
const pet=document.getElementById('takagiPet'),img=document.querySelector('.pet-body-layer'),speech=document.getElementById('speech');if(!pet||!img)return;
let version=0;const cache=new Map();
const lines={greet:'嗨，今天也一起回家吧。',highfive:'击掌！这次算你赢了。',laugh:'呵呵，西片，你又被我发现了。',walk:'一起慢慢走回家吧。',jump:'看，我跳起来了！',run:'快来追我！',talk:'今天有什么想告诉我的？',photo:'准备好了吗？笑一个！'};
const actionFiles={greet:'wave',highfive:'highfive',laugh:'laugh'};
function outfit(){try{const n=localStorage.getItem('takagi-outfit-v59');return ['winter','home'].includes(n)?n:'summer'}catch{return 'summer'}}
function imagePath(n,o){const act=actionFiles[n];if(!act)return null;if(act==='laugh')return 'assets/takagi-laugh-'+o+'-v59.webp';if(o==='summer')return 'assets/takagi-action-'+act+'.webp';return 'assets/takagi-'+o+'-'+act+'-v59.webp'}
function baseImage(o){return o==='summer'?document.querySelector('[data-takagi-embedded]').src:new URL('assets/takagi-'+o+'-v59.webp',location.href).href}
function load(src){if(!cache.has(src)){const promise=new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(src);image.onerror=()=>reject(Error('动作图片加载失败：'+src));image.src=src});cache.set(src,promise);promise.catch(()=>cache.delete(src))}return cache.get(src)}
function preloadOutfit(){const o=outfit();for(const key of ['greet','highfive','laugh']){const file=imagePath(key,o);if(file)load(new URL(file,location.href).href).catch(()=>{});}}
const section=document.getElementById('characters');if(section&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){preloadOutfit();observer.disconnect()}},{rootMargin:'900px'});observer.observe(section)}else preloadOutfit();
document.querySelectorAll('[data-outfit]').forEach(b=>b.addEventListener('click',()=>{queueMicrotask(preloadOutfit)}));
function stopAnimations(){for(const c of ['pet-walk-together','v59-jump','v59-run'])pet.classList.remove(c)}
window.cancelPetVisualAction=()=>{version++;stopAnimations();delete pet.dataset.action};
async function run(key){const token=++version,o=outfit(),file=imagePath(key,o);stopAnimations();if(speech)speech.textContent=lines[key]||'嗯，我在听。';if(key==='walk'||key==='jump'||key==='run'){let cls=key==='walk'?'pet-walk-together':'v59-'+key;void pet.offsetWidth;pet.classList.add(cls)}
if(file){try{const src=new URL(file,location.href).href;await load(src);if(token!==version)return;img.src=src;await img.decode();if(token!==version||img.src!==src)return;pet.dataset.action=key}catch(error){if(token===version&&speech)speech.textContent=error.message;return}}
setTimeout(()=>{if(token!==version)return;stopAnimations();if(file){img.src=baseImage(outfit());delete pet.dataset.action}},1600)}
document.querySelectorAll('.pet-hotspots [data-interact]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();run(b.dataset.interact);if(typeof triggerPetReaction==='function')triggerPetReaction(b.dataset.interact,true)},true));
document.querySelectorAll('[data-outfit]').forEach(b=>b.addEventListener('click',()=>{version++;stopAnimations();delete pet.dataset.action},true));
})();
