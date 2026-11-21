(() => {
 'use strict';
 const c=window.COURSE;
 const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
 const el=id=>document.getElementById(id);
 const storageKey='ai-onepage-class-progress-v3-claude';
 let saved=[];
 try{const current=localStorage.getItem(storageKey);if(current!==null){saved=JSON.parse(current);}else{const previous=JSON.parse(localStorage.getItem('ai-onepage-class-progress-v2-lovable')||'[]');if(Array.isArray(previous))saved=previous.filter(i=>Number.isInteger(i)&&i>=0&&i<10).map(i=>i===9?10:i);}if(!Array.isArray(saved))saved=[];}catch{}
 function renderSchedule(mode){
  const short=mode==='short',hour=mode==='hour';
  el('schedule').innerHTML=(hour?window.HOUR_COURSE.schedule:(short?c.short_schedule:c.schedule)).map(r=>'<tr>'+r.map(t=>'<td>'+esc(t)+'</td>').join('')+'</tr>').join('');
  document.querySelector('.detail-heading').hidden=short;
  el('schedule-note').textContent=hour?window.HOUR_COURSE.note:(short?'課前完成登入，仍以 Lovable 開場，保留同步、靜態匯出與 Pages。最後依序簡介 ChatGPT、Claude。':'休息時間已列入安排。課前完成登入，開場先在 Lovable 產生第一版。');
  el('onehour-sheet').hidden=!hour;el('learn').hidden=hour;
  el('learn-nav').href=hour?'#onehour-sheet':'#learn';document.querySelector('.hero-actions .action').href=hour?'#onehour-sheet':'#learn';
  document.querySelectorAll('.route-strip>a').forEach((a,i)=>a.href=hour?['#hour-lovable','#hour-github','#hour-pages'][i]:['#lesson-0','#lesson-4','#lesson-6'][i]);
  document.querySelectorAll('[data-mode]').forEach(x=>{x.classList.toggle('chosen',x.dataset.mode===mode);x.setAttribute('aria-pressed',String(x.dataset.mode===mode));});
 }
 renderSchedule('hour');
 document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-mode]').forEach(x=>{x.classList.toggle('chosen',x===b);x.setAttribute('aria-pressed',String(x===b));});renderSchedule(b.dataset.mode);}));
 el('preparation').innerHTML=c.preparation.map(x=>'<li>'+esc(x)+'</li>').join('');
 el('capabilities').innerHTML=c.capabilities.map(row=>'<tr>'+row.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('');
 el('lessons').innerHTML=c.lessons.map((l,i)=>`<details id="lesson-${i}"${i===0?' open':''}><summary><span>${esc(l.title)}</span><span class="lesson-time">${esc(l.minutes)}</span></summary><div><p class="lesson-meta">時間：${esc(l.minutes)}</p><p><strong>這一步要學會：</strong>${esc(l.goal)}</p><ol class="steps">${l.steps.map(t=>'<li>'+esc(t)+'</li>').join('')}</ol><div class="lecturer-question"><p><strong>講師提問：</strong>${esc(l.ask)}</p><details class="answer-toggle"><summary>查看參考解答</summary><small class="reference-answer">參考解答：${esc(l.answer)}</small></details></div><p><strong>卡關備案：</strong>${esc(l.rescue)}</p><label class="checkline"><input type="checkbox" data-progress="${i}" ${saved.includes(i)?'checked':''}><span>完成檢查：${esc(l.check)}</span></label></div></details>`).join('');
 function progress(){const inputs=[...document.querySelectorAll('[data-progress]')];saved=inputs.filter(x=>x.checked).map(x=>Number(x.dataset.progress));inputs.forEach(x=>x.closest('details').dataset.complete=String(x.checked));el('learning-progress').max=c.lessons.length;el('learning-progress').value=saved.length;el('progress-label').textContent=`已完成 ${saved.length} / ${c.lessons.length} 個檢查點`;const next=inputs.find(x=>!x.checked);el('continue-learning').href=next?'#lesson-'+next.dataset.progress:'#practice';el('continue-learning').textContent=next?'繼續下一步 →':'前往練習作業 →';try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{}}
 document.querySelectorAll('[data-progress]').forEach(x=>x.addEventListener('change',progress));progress();
 el('reset-progress').addEventListener('click',()=>{document.querySelectorAll('[data-progress]').forEach(x=>x.checked=false);progress();});
 el('prompt-list').innerHTML=c.prompts.map(([t,p],i)=>`<details><summary>${esc(t)}</summary><div><pre id="prompt-${i}"><code>${esc(p)}</code></pre><button type="button" class="copy" data-copy="prompt-${i}">複製這段提示詞</button></div></details>`).join('');
 function brief(){const f=new FormData(el('brief-form'));const route=el('prompt-route').value;const instruction=route==='lovable'?'先在 Lovable 產生最小可操作第一版，不加登入、資料庫、付款、內建 AI 或 API。手機、平板、桌機依寬度重排，每個按鈕都有作用。內容與外觀確認後，我會另請你匯出 docs/index.html 供 GitHub Pages 使用。':(route==='claude'?'請在 Claude 製作可編輯的網頁作品，並提供 standalone HTML 或完整 index.html。CSS 與 JavaScript 內嵌，不依賴伺服器、外部套件、平台資料儲存或內建 AI。離開 Claude 後仍需可操作，檔案將由我手動提交 GitHub。':'輸出一份完整 index.html，CSS 與 JavaScript 內嵌，不使用外部套件、框架、登入、資料庫、付款或金鑰。手機、平板、桌機依寬度重排，保留鍵盤焦點。請提供完整程式碼及本機預覽方式，檔案將由我手動提交 GitHub。');el('custom-prompt').value=`請替零程式基礎學員製作一頁式網頁。\n名稱：${f.get('topic')}（虛構教學示範）\n目標讀者：${f.get('audience')}\n主要行動：${f.get('action')}\n必要內容：${f.get('sections')}\n活動資訊請先用清楚標示的示範內容，提醒我之後核對日期、地點與有效連結。\n`+instruction;}
 brief();el('brief-form').addEventListener('submit',e=>{e.preventDefault();brief();el('custom-prompt').focus();});
 el('prompt-route').addEventListener('change',brief);
 document.addEventListener('click',async e=>{const b=e.target.closest('[data-copy]');if(!b)return;const target=el(b.dataset.copy);const text=target.value??target.textContent;try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText(text);(b.closest('#onehour-sheet')?el('hour-copy-status'):el('copy-status')).textContent='已複製，可貼到 AI 對話。';b.textContent='已複製';}catch{const selection=window.getSelection();if(target.tagName==='TEXTAREA'){target.focus();target.select();}else{const range=document.createRange();range.selectNodeContents(target);selection.removeAllRanges();selection.addRange(range);}(b.closest('#onehour-sheet')?el('hour-copy-status'):el('copy-status')).textContent='瀏覽器未允許自動複製，已選取文字。請按 Ctrl+C，Mac 按 Command+C。';}});
 el('assignments').innerHTML=c.assignments.map(a=>`<article class="assignment"><div><h3>${esc(a.id+'：'+a.title)}</h3><p>${a.required?'必做':'選做'}，約 ${esc(a.time)}</p></div><div><p>${esc(a.task)}</p><p><strong>交件：</strong>${esc(a.submit)}</p><p><strong>評分：</strong>${esc(a.criteria)}</p></div></article>`).join('');
 el('quiz-items').innerHTML=c.quiz.map((q,i)=>`<fieldset><legend>${i+1}. ${esc(q.q)}</legend><div class="quiz-options">${q.options.map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}" required><span>${esc(o)}</span></label>`).join('')}</div><p id="feedback-${i}" hidden></p></fieldset>`).join('');
 el('quiz-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);let score=0;c.quiz.forEach((q,i)=>{const ok=Number(f.get('q'+i))===q.a;if(ok)score++;const t=el('feedback-'+i);t.hidden=false;t.textContent=(ok?'答對了。':'再看一次：')+q.why;});el('quiz-result').textContent=`答對 ${score} / ${c.quiz.length} 題。`+(score>=4?'可以進行交件驗收。':'請依解釋回到操作步驟再練習。');});
 el('quiz-form').addEventListener('reset',()=>{c.quiz.forEach((_,i)=>el('feedback-'+i).hidden=true);el('quiz-result').textContent='';});
 el('faq').innerHTML=c.faq.map(([q,a])=>`<details class="search-item" data-search="${esc(q+' '+a)}"><summary>${esc(q)}</summary><div><p>${esc(a)}</p></div></details>`).join('');
 el('glossary').innerHTML=c.glossary.map(([k,v],i)=>`<dt data-term="${i}">${esc(k)}</dt><dd data-term="${i}">${esc(v)}</dd>`).join('');
 let referenceView='faq';
 function search(){const t=el('search').value.trim().toLocaleLowerCase();let count=0;document.querySelectorAll('.search-item').forEach(x=>{const match=x.dataset.search.toLocaleLowerCase().includes(t);x.hidden=!match;if(match)count++;});c.glossary.forEach(([k,v],i)=>{const match=(k+' '+v).toLocaleLowerCase().includes(t);document.querySelectorAll(`[data-term="${i}"]`).forEach(x=>x.hidden=!match);if(match)count++;});el('search-count').textContent=t?`找到 ${count} 筆相關內容。搜尋會同時顯示問題與名詞。`:`共 ${c.faq.length} 個問題、${c.glossary.length} 個名詞。`;el('faq-panel').hidden=!t&&referenceView!=='faq';el('glossary-panel').hidden=!t&&referenceView!=='glossary';document.querySelectorAll('[data-reference]').forEach(b=>{const chosen=!t&&b.dataset.reference===referenceView;b.classList.toggle('chosen',chosen);b.setAttribute('aria-pressed',String(chosen));});}
 document.querySelectorAll('[data-reference]').forEach(b=>b.addEventListener('click',()=>{referenceView=b.dataset.reference;el('search').value='';search();}));
 el('search').addEventListener('input',search);search();
 el('sources').innerHTML=c.sources.map(s=>`<li><a href="${esc(s[2])}" target="_blank" rel="noopener">${esc(s[0])}</a>，${esc(s[1])}。${esc(s[4])}</li>`).join('');

document.querySelectorAll('[data-prompt-version]').forEach(b=>b.addEventListener('click',()=>{
 const version=b.dataset.promptVersion;
 document.querySelectorAll('[data-prompt-version]').forEach(x=>{x.classList.toggle('chosen',x.dataset.promptVersion===version);x.setAttribute('aria-pressed',String(x.dataset.promptVersion===version));});
 document.querySelectorAll('[data-prompt-panel]').forEach(x=>x.hidden=x.dataset.promptPanel!==version);
}));
 // 手機目錄保留原生連結；沒有 JavaScript 時仍直接顯示導覽。
 const menu=document.querySelector('.menu-toggle');const nav=el('main-nav');
 function setMenu(open){nav.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'關閉目錄':'開啟目錄';}
 menu.hidden=false;document.body.classList.add('ui-ready');
 menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus();}});
 // 先展開目標，再讓瀏覽器進行原生錨點捲動，避免跳到尚未展開的內容。
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{setMenu(false);const id=a.getAttribute('href').slice(1);if(id.startsWith('lesson-')||id==='learn')renderSchedule('full');if(id.startsWith('hour-')||id==='onehour-sheet')renderSchedule('hour');const target=document.getElementById(id);if(target?.tagName==='DETAILS')target.open=true;if(target&&a.closest('nav')){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main>section[id]').forEach(s=>observer.observe(s));}
})();
