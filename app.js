'use strict';
const content = window.AKCL_CONTENT;
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.nav-wrap')) closeMenu(); });
document.getElementById('year').textContent = String(new Date().getFullYear());
const videoDialog = document.getElementById('video-dialog');
const player = document.getElementById('player');
const grid = document.getElementById('video-grid');
if (content && Array.isArray(content.videos)) {
 const cards = content.videos.filter(v => /^[a-zA-Z0-9_-]{11}$/.test(v.id)).map(video => {
  const card = document.createElement('button'); card.type = 'button'; card.className = 'video-card'; card.setAttribute('aria-label', video.title + 'を再生');
  const thumb = document.createElement('div'); thumb.className = 'video-thumb';
  const img = document.createElement('img'); img.src = video.image; img.alt = video.title + ' 大会配信サムネイル'; img.width = 686; img.height = 386; img.loading = 'lazy';
  const play = document.createElement('div'); play.className = 'video-play'; play.setAttribute('aria-hidden', 'true'); const icon = document.createElement('span'); icon.textContent = '▶'; play.append(icon);
  const duration = document.createElement('span'); duration.className = 'duration'; duration.textContent = video.duration; thumb.append(img, play, duration);
  const meta = document.createElement('p'); meta.className = 'video-meta'; meta.textContent = video.label;
  const title = document.createElement('h3'); title.textContent = video.title; card.append(thumb, meta, title);
  card.addEventListener('click', () => {
   document.getElementById('video-dialog-title').textContent = video.title;
   document.getElementById('video-external').href = 'https://www.youtube.com/watch?v=' + video.id;
   const iframe = document.createElement('iframe'); iframe.src = 'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1'; iframe.title = video.title; iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; iframe.referrerPolicy = 'strict-origin-when-cross-origin'; iframe.allowFullscreen = true;
   player.replaceChildren(iframe); videoDialog.showModal(); document.body.classList.add('modal-open');
  }); return card;
 });
 if (cards.length) grid.replaceChildren(...cards);
}
const privacy = document.getElementById('privacy-dialog');
document.getElementById('privacy-open').addEventListener('click', () => { privacy.showModal(); document.body.classList.add('modal-open'); });
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('close', () => { if (dialog === videoDialog) player.replaceChildren(); document.body.classList.remove('modal-open'); });
 dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
});
const discord = content && content.fiveM && content.fiveM.discordUrl;
if (discord && /^https:\/\/(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9-]+\/?$/.test(discord)) {
 const link = document.getElementById('fivem-link'); link.href = discord; link.textContent = 'Discordで参加する';
}

let xLoading = false;
let xScriptReady = null;
const xEmbed = document.getElementById('x-embed');
const xStatus = document.getElementById('x-status');
const xNote = document.getElementById('x-note');
const xButton = document.getElementById('load-x');
function xUnavailable() { xStatus.hidden = false; xButton.hidden = false; xNote.textContent = 'フィードを表示できませんでした。最新投稿は公式Xでご覧ください。'; }
function loadXScript() {
 if (window.twttr && window.twttr.widgets) return Promise.resolve();
 if (xScriptReady) return xScriptReady;
 xScriptReady = new Promise((resolve,reject) => { const script = document.createElement('script'); script.src = 'https://platform.twitter.com/widgets.js'; script.async = true; script.onload = () => resolve(); script.onerror = () => { xScriptReady = null; script.remove(); reject(new Error('X unavailable')); }; document.head.append(script); });
 return xScriptReady;
}
async function loadXFeed() {
 if (xLoading) return;
 xLoading = true; xButton.hidden = true; xNote.textContent = '公式フィードを読み込み中です。';
 const link = document.createElement('a'); link.className = 'twitter-timeline'; link.href = content ? content.x : 'https://x.com/AKCL_WIN'; link.dataset.theme = 'dark'; link.dataset.height = '300'; link.dataset.chrome = 'noheader nofooter noborders transparent'; link.dataset.dnt = 'true'; link.dataset.lang = 'ja'; link.textContent = 'AKCLの公式Xで最新投稿を見る'; xEmbed.replaceChildren(link);
 const timeout = setTimeout(() => { if (!xTimelineVisible()) xUnavailable(); },12000);
 try { await loadXScript(); if (!window.twttr || !window.twttr.widgets) throw new Error('X unavailable'); await window.twttr.widgets.load(xEmbed); } catch (e) { clearTimeout(timeout); xUnavailable(); } finally { xLoading = false; }
}
function xTimelineVisible() { const frame = xEmbed.querySelector('iframe'); if (!frame) return false; const style = getComputedStyle(frame); return frame.getBoundingClientRect().height > 80 && style.visibility !== 'hidden' && style.display !== 'none'; }
function updateXDisplay() { if (xTimelineVisible()) { xStatus.hidden = true; xButton.hidden = true; xNote.textContent = 'Xの公式タイムライン。表示されない場合は公式Xをご覧ください。'; } }
new MutationObserver(updateXDisplay).observe(xEmbed,{childList:true,subtree:true,attributes:true,attributeFilter:['style','height','hidden']});
if ('ResizeObserver' in window) new ResizeObserver(updateXDisplay).observe(xEmbed);
xButton.addEventListener('click',loadXFeed);
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();loadXFeed();} },{rootMargin:'300px'}); observer.observe(xEmbed); } else { loadXFeed(); }
