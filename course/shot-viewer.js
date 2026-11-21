/* 操作圖頁內檢視：保留鍵盤操作及關閉後焦點。 */
(()=>{
 const dialog=document.createElement('dialog');dialog.className='shot-viewer';
 dialog.setAttribute('aria-label','操作截圖放大檢視');
 dialog.innerHTML='<header><p id="shot-viewer-caption"></p><div><button type="button" data-shot-zoom>原尺寸／適合視窗</button><button type="button" data-shot-close aria-label="關閉截圖">✕ 關閉</button></div></header><div class="shot-viewer-space"><img alt=""></div>';
 document.body.append(dialog);const picture=dialog.querySelector('img'),space=dialog.querySelector('.shot-viewer-space');let opener;
 document.addEventListener('click',event=>{const link=event.target.closest('.step-shot a');if(!link)return;event.preventDefault();opener=link;picture.src=link.href;picture.alt=link.querySelector('img').alt;dialog.querySelector('p').textContent=picture.alt;dialog.classList.remove('native-size');dialog.showModal();space.scrollTo(0,0);});
 dialog.querySelector('[data-shot-close]').onclick=()=>dialog.close();
 dialog.querySelector('[data-shot-zoom]').onclick=()=>dialog.classList.toggle('native-size');
 space.addEventListener('click',e=>{if(e.target===space)dialog.close();});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{picture.removeAttribute('src');opener?.focus({preventScroll:true});});
})();
