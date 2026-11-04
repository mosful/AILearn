(() => {
  'use strict';
  const STORE = 'ailearn-needs-v1';
  const sections = [
    { title: '先聊聊你和 AI', intro: '完全沒用過也沒關係，這正是我們想認識的起點。', questions: [
      { key: 'role', label: '你目前的工作或生活角色是？', type: 'checkbox', other: true, hint: '可複選，也可以只填「其他」。', options: ['行政／總務／人資', '業務／行銷／客服', '主管／專案管理', '老師／教育工作者', '設計／內容創作', '技術／工程／研究', '自營／接案／小店經營', '學生', '家庭照顧者', '退休／準備轉換跑道'] },
      { key: 'experience', label: '你目前使用 AI 的情況最接近哪一種？', type: 'radio', required: true, options: ['完全沒用過，想從零開始', '試過幾次，但不知道怎麼問', '偶爾用來查資料、寫文字或翻譯', '經常使用，想學更多實際應用'] },
      { key: 'tools', label: '你曾經用過哪些 AI 工具？', type: 'checkbox', other: true, exclusive: '還沒用過／不確定', hint: '可複選。沒聽過這些工具也沒關係。', options: ['ChatGPT', 'Google Gemini', 'Claude', 'Microsoft Copilot', 'Canva 的 AI 功能', '其他有 AI 功能的 App', '還沒用過／不確定'] }
    ] },
    { title: '你想把 AI 用在哪裡？', intro: '先從看得見的成果想起，不必先懂技術。', questions: [
      { key: 'websites', label: '如果能做出自己的網頁，你會想做哪一種？', type: 'checkbox', other: true, exclusive: '還沒想好，先學會再說', hint: '可複選。可先看看頁首的生活營網頁範例。', options: ['活動介紹／報名資訊頁', '旅遊行程／聚會手冊', '個人介紹／作品集／線上名片', '店家介紹／產品或服務頁', '課程介紹／教學資源整理', '社團／小組／公益資訊頁', '工作專案說明／操作指南', '還沒想好，先學會再說'] },
      { key: 'topics', label: '除了做網頁，你最想學哪些 AI 應用？', type: 'checkbox', required: true, max: 3, other: true, hint: '請選 1～3 項，讓老師知道你的優先順序；「其他」填寫後也算 1 項。', options: ['問對問題：讓 AI 聽懂我的需求', '寫 Email、文案、公告或社群貼文', '整理文件、長文章、會議重點', '製作簡報、報告或教學內容', '整理 Excel 表格、資料與公式', '製作圖片、海報或設計素材', '規劃行程、活動、餐點或日常安排', '查資料、比較選項與辨別可信度', '語言學習、翻譯與自我進修', '處理重複工作、建立簡單自動化', '修改網頁內容、版面與手機顯示', '保護資料隱私、避免 AI 胡說'] }
    ] },
    { title: '哪些事，想請 AI 幫個忙？', intro: '不用想很大的問題。每週一直重做、卡很久的小事，就是很好的開始。', questions: [
      { key: 'workPain', label: '工作或學習中，哪些事情最花時間？', type: 'checkbox', other: true, exclusive: '目前沒有／不適用', hint: '可複選，也可以包含準備教會服事的工作；不適用可以跳過。', options: ['從零寫信、文案、報告或提案', '把零散資料整理成重點', '製作簡報、排版或美化文件', '整理表格、統計數字或找公式', '查資料、確認來源或比較方案', '記錄會議、追蹤事項與進度', '回覆重複問題、整理常見問答', '規劃活動、課程或專案', '學新工具、理解陌生知識', '準備教會服事教材、查經資料或分享大綱', '製作教會聚會簡報、週報、邀請文案或海報', '安排教會服事排班、聚會流程或活動分工', '目前沒有／不適用'] },
      { key: 'lifePain', label: '生活中，有哪些事情想變得更輕鬆？', type: 'checkbox', other: true, exclusive: '目前沒有／不適用', hint: '可複選，生活與教會服事的需求都可以選；也歡迎自由補充。', options: ['規劃旅遊行程、交通與預算', '安排聚會、家庭活動或採買', '整理照片、回憶或製作紀念內容', '準備餐點、菜單與生活清單', '比較商品、服務或各種選項', '看懂說明書、外文或複雜資訊', '陪伴孩子學習、準備教材', '學語言、培養興趣或規劃進修', '整理待辦事項、規劃個人時間', '準備小組聚會、帶領查經或靈修分享', '安排教會活動、探訪關懷或愛宴', '整理經文、禱告事項與服事筆記', '目前沒有／不適用'] },
      { key: 'priority', label: '如果這堂課只能幫你完成一件事，你最希望是什麼？', type: 'textarea', required: true, maxLength: 500, hint: '可以用自己的話寫，也可以點一個例子再修改。', placeholder: '例如：把下次家庭旅遊的行程，做成手機上好閱讀、可以分享的網頁。', suggestions: ['做出我的第一個一頁式網頁', '把旅遊行程做成手機手冊', '更快整理會議重點與待辦事項', '學會怎麼問，讓 AI 給出能用的答案'] },
      { key: 'scenario', label: '可以多說一點，你現在怎麼做、希望變成怎樣嗎？', type: 'textarea', maxLength: 1500, hint: '選填。可以寫「現在的做法 → 最卡的地方 → 希望的結果」，不用提供真實公司或人名。', placeholder: '例如：每次活動都要在群組重複貼時間、地址和注意事項。希望整理成一個網址，大家自己就能查。' }
    ] },
    { title: '怎樣上課，對你最有幫助？', intro: '最後聊聊設備和學習習慣，讓我們把步調安排得剛剛好。', questions: [
      { key: 'barriers', label: '想到學 AI 或做網頁，你最擔心什麼？', type: 'checkbox', other: true, exclusive: '目前沒有特別擔心', hint: '可複選。你的擔心會幫助老師準備說明與練習。', options: ['完全不懂程式，怕跟不上', '不知道該怎麼描述自己的需求', '英文介面或技術名詞看不懂', '不知道工具要不要付費', '怕按錯、改壞，不知道怎麼復原', '擔心資料隱私或 AI 內容不正確', '不知道做完怎麼上線、分享給別人', '課堂會了，回家卻忘記怎麼做', '目前沒有特別擔心'] },
      { key: 'devices', label: '上課時，你可以使用哪些設備？', type: 'checkbox', other: true, exclusive: '還不確定', hint: '可複選，幫助老師確認實作是否方便。', options: ['Windows 筆電／桌機', 'Mac 筆電／桌機', 'iPad／其他平板', '手機', '還不確定'] },
      { key: 'pace', label: '你喜歡怎樣的上課方式？', type: 'checkbox', other: true, hint: '可複選。', options: ['老師一步一步示範，我跟著做', '提供可以直接修改的範本', '用我自己的真實情境來練習', '多留一點操作與提問時間', '先看完整成果，再拆解做法', '課後有圖文步驟與常見問題可查'] },
      { key: 'budget', label: '課程使用 AI 工具時，你的費用偏好是？', type: 'radio', options: ['希望盡量使用免費工具', '先用免費版，有需要再考慮付費', '若實用，可接受合理月費', '還不清楚，希望課堂說明差異'] },
      { key: 'notes', label: '還有什麼想學、想問，或希望老師先知道的事？', type: 'textarea', maxLength: 1500, placeholder: '選項沒提到的需求、上課需要的協助，都可以寫在這裡。' }
    ] }
  ];
  const form = document.querySelector('#needs-form');
  const questions = sections.flatMap(s => s.questions);
  const app = document.querySelector('#form-app');
  const errorBox = document.querySelector('#form-error');
  let step = 0, busy = false, submitted = false, requestId = crypto.randomUUID();
  const values = {};
  const el = (tag, attrs = {}, content) => {
    const item = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => item.setAttribute(k, v));
    if (content !== undefined) item.textContent = content;
    return item;
  };
  sections.forEach((section, index) => {
    const panel = el('section', { class: 'panel', 'data-step': index, 'aria-labelledby': `panel-title-${index}` });
    panel.hidden = index !== 0;
    panel.append(el('h3', { class: 'panel-title', id: `panel-title-${index}`, tabindex: '-1' }, section.title), el('p', { class: 'panel-intro' }, section.intro));
    section.questions.forEach(q => {
      const field = el(q.type === 'textarea' ? 'div' : 'fieldset', { class: 'question', id: `q-${q.key}` });
      const title = el(q.type === 'textarea' ? 'label' : 'legend', q.type === 'textarea' ? { for: q.key } : {}, q.label);
      title.append(el('span', { class: `tag${q.required ? '' : ' optional'}` }, q.required ? '必填' : '選填'));
      field.append(title);
      if (q.hint) field.append(el('p', { class: 'hint', id: `hint-${q.key}` }, q.hint));
      if (q.type === 'textarea') {
        const input = el('textarea', { id: q.key, name: q.key, rows: '4', maxlength: q.maxLength, placeholder: q.placeholder, 'aria-describedby': `${q.hint ? `hint-${q.key} ` : ''}error-${q.key}` });
        if (q.required) input.required = true;
        field.append(input);
        if (q.suggestions) {
          const suggestions = el('div', { class: 'suggestions', 'aria-label': '點選填入參考例子' });
          q.suggestions.forEach(text => {
            const button = el('button', { type: 'button', class: 'suggestion' }, text);
            button.addEventListener('click', () => { if (input.value.trim() && input.value !== text) { input.focus(); return; } input.value = text; input.dispatchEvent(new Event('input', { bubbles: true })); input.focus(); });
            suggestions.append(button);
          });
          field.append(suggestions);
        }
        field.append(el('p', { class: 'counter', id: `count-${q.key}` }, `0 / ${q.maxLength} 字`));
      } else {
        const choices = el('div', { class: 'choices' });
        q.options.forEach((text, i) => {
          const label = el('label', { class: 'choice' });
          const input = el('input', { type: q.type, name: q.key, value: text, id: `${q.key}-${i}`, 'aria-describedby': `error-${q.key}` });
          label.append(input, el('span', {}, text)); choices.append(label);
        });
        field.append(choices);
        if (q.other) {
          const label = el('label', { class: 'other-label', for: `${q.key}-other` }, '其他想法（可自由填寫）');
          label.append(el('input', { type: 'text', class: 'text-input', id: `${q.key}-other`, name: `${q.key}-other`, maxlength: '400', placeholder: '沒有適合的選項？在這裡寫下你的想法。', 'aria-describedby': `error-${q.key}` }));
          field.append(label);
        }
      }
      const problem = el('p', { class: 'question-error', id: `error-${q.key}` }); problem.hidden = true; field.append(problem); panel.append(field);
    });
    document.querySelector('#question-panels').append(panel);
  });
  function answer(q) {
    if (q.type === 'textarea') return form.elements.namedItem(q.key).value.trim();
    const selected = [...form.querySelectorAll(`input[name="${q.key}"]:checked`)].map(x => x.value);
    if (q.type === 'radio') return selected[0] || '';
    const other = q.other ? form.elements.namedItem(`${q.key}-other`).value.trim() : '';
    return other ? [...selected, `其他：${other}`] : selected;
  }
  function message(q, text) {
    const field = document.querySelector(`#q-${q.key}`), output = document.querySelector(`#error-${q.key}`);
    field.classList.toggle('invalid', Boolean(text)); output.textContent = text; output.hidden = !text;
    field.querySelectorAll('input,textarea').forEach(input => { if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); });
  }
  function validate(index) {
    let first;
    sections[index].questions.forEach(q => {
      const value = answer(q);
      let text = q.required && !value.length ? (q.type === 'textarea' ? '請寫下你最想完成的一件事，或點選一個參考例子。' : '請至少選擇一個選項，或填寫其他想法。') : '';
      if (q.max && value.length > q.max) text = `最多選 ${q.max} 項；「其他」也算 1 項，請減少一項後繼續。`;
      message(q, text); if (text && !first) first = document.querySelector(`#q-${q.key} input, #q-${q.key} textarea`);
    });
    if (first) { first.focus(); return false; } return true;
  }
  function sync(q) {
    if (q.type === 'textarea') document.querySelector(`#count-${q.key}`).textContent = `${form.elements.namedItem(q.key).value.length} / ${q.maxLength} 字`;
    values[q.key] = answer(q);
  }
  function save() {
    questions.forEach(sync);
    try { localStorage.setItem(STORE, JSON.stringify({ values, step, requestId })); document.querySelector('#draft-status').textContent = '草稿已暫存在這台裝置'; }
    catch { document.querySelector('#draft-status').textContent = '此瀏覽器無法暫存，離開前請先送出'; }
  }
  function show(index, focus = true) {
    step = index;
    document.querySelectorAll('.panel').forEach((p, i) => { p.hidden = i !== index; });
    document.querySelectorAll('.steps li').forEach((item, i) => { item.classList.toggle('done', i < index); if (i === index) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current'); });
    document.querySelector('#step-label').textContent = `第 ${index + 1} / 4 段`;
    document.querySelector('.progress').setAttribute('aria-valuenow', index + 1);
    document.querySelector('.progress span').style.width = `${(index + 1) * 25}%`;
    document.querySelector('#back').hidden = index === 0;
    document.querySelector('#next').hidden = index === 3;
    document.querySelector('#submit').hidden = index !== 3;
    document.querySelector('#next').textContent = `下一段：${['認識你', '想學什麼', '你的痛點', '怎麼上課'][index + 1] || ''} →`;
    errorBox.hidden = true;
    if (focus) { document.querySelector('#survey').scrollIntoView({ behavior: 'instant', block: 'start' }); document.querySelector(`#panel-title-${index}`).focus({ preventScroll: true }); }
  }
  form.addEventListener('change', event => {
    const q = questions.find(x => event.target.name === x.key);
    if (q && q.exclusive) {
      const inputs = [...form.querySelectorAll(`input[name="${q.key}"]`)];
      if (event.target.value === q.exclusive && event.target.checked) { inputs.forEach(x => { if (x !== event.target) x.checked = false; }); if (q.other) form.elements.namedItem(`${q.key}-other`).value = ''; }
      else if (event.target.checked) inputs.find(x => x.value === q.exclusive).checked = false;
    }
    save();
  });
  form.addEventListener('input', event => {
    const q = questions.find(x => event.target.name === x.key || event.target.name === `${x.key}-other`);
    if (q) {
      if (q.exclusive && event.target.name.endsWith('-other') && event.target.value.trim()) [...form.querySelectorAll(`input[name="${q.key}"]`)].find(x => x.value === q.exclusive).checked = false;
      message(q, ''); sync(q);
      if (q.max && answer(q).length > q.max) message(q, `最多選 ${q.max} 項；「其他」也算 1 項，請減少一項後繼續。`);
    }
    save();
  });
  document.querySelector('#next').addEventListener('click', () => { if (validate(step)) { show(step + 1); save(); } });
  document.querySelector('#back').addEventListener('click', () => { show(step - 1); save(); });
  document.querySelector('#clear').addEventListener('click', () => { document.querySelector('#clear-confirm').hidden = false; document.querySelector('#confirm-clear').focus(); });
  document.querySelector('#cancel-clear').addEventListener('click', () => { document.querySelector('#clear-confirm').hidden = true; document.querySelector('#clear').focus(); });
  document.querySelector('#confirm-clear').addEventListener('click', () => { form.reset(); requestId = crypto.randomUUID(); try { localStorage.removeItem(STORE); } catch {} questions.forEach(q => { message(q, ''); sync(q); }); document.querySelector('#clear-confirm').hidden = true; document.querySelector('#draft-status').textContent = '草稿已清除'; show(0); });
  try {
    const draft = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (draft && draft.values && typeof draft.values === 'object') {
      questions.forEach(q => {
        const value = draft.values[q.key];
        if (q.type === 'textarea' && typeof value === 'string') form.elements.namedItem(q.key).value = value.slice(0, q.maxLength);
        else if (q.type === 'radio' && typeof value === 'string') [...form.querySelectorAll(`input[name="${q.key}"]`)].forEach(x => { x.checked = x.value === value; });
        else if (q.type === 'checkbox' && Array.isArray(value)) {
          [...form.querySelectorAll(`input[name="${q.key}"]`)].forEach(x => { x.checked = value.includes(x.value); });
          if (q.other) form.elements.namedItem(`${q.key}-other`).value = (value.find(x => typeof x === 'string' && x.startsWith('其他：')) || '').slice(3, 403);
        }
        sync(q);
      });
      if (/^[a-f0-9-]{36}$/i.test(draft.requestId || '')) requestId = draft.requestId;
      step = Number.isInteger(draft.step) && draft.step >= 0 && draft.step < 4 ? draft.step : 0;
      document.querySelector('#draft-status').textContent = '已恢復上次填寫的草稿';
    }
  } catch { document.querySelector('#draft-status').textContent = '此瀏覽器無法恢復草稿，仍可填答'; }
  show(step, false); app.hidden = false;
  if (!window.AILEARN_CONFIG?.endpoint) {
    const notice = el('p', { class: 'notice', role: 'status' }, '問卷已開放預覽，Google 試算表收件仍在設定中，目前無法送出。你可以先閱讀題目，正式開放後再填答。');
    app.before(notice);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy || submitted || step !== 3) return;
    for (let i = 0; i < sections.length; i++) { if (!validate(i)) { show(i); validate(i); return; } }
    const endpoint = window.AILEARN_CONFIG?.endpoint;
    if (!endpoint) { errorBox.textContent = '老師正在準備收件設定，目前尚未開放送出。你的填答已保留，請稍後再試。'; errorBox.hidden = false; return; }
    busy = true; errorBox.hidden = true;
    const button = document.querySelector('#submit'); button.textContent = '正在儲存你的想法…'; button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    form.querySelectorAll('input,textarea,button').forEach(input => { input.disabled = true; });
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const payload = Object.fromEntries(questions.map(q => [q.key, answer(q)]));
      payload.id = requestId; payload.version = 1; payload.website = form.elements.namedItem('website').value;
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow', credentials: 'omit', signal: controller.signal });
      if (!response.ok) throw new Error('連線暫時不穩，請稍後再試。');
      const result = await response.json();
      if (!result.ok || result.id !== requestId) throw new Error(result.message || '尚未確認儲存成功，請稍後再試。');
      submitted = true; try { localStorage.removeItem(STORE); } catch {}
      app.hidden = true; const success = document.querySelector('#success'); success.hidden = false;
      document.querySelector('#receipt').textContent = `回覆編號：${requestId}`;
      success.focus(); success.scrollIntoView({ behavior: 'instant', block: 'center' });
    } catch (error) {
      errorBox.textContent = `${error.name === 'AbortError' ? '儲存確認逾時，請再按一次送出；相同回覆不會重複儲存。' : error instanceof TypeError ? '目前無法連上收件服務，請確認網路後再試。' : error.message} 你的填答仍保留在頁面上。`;
      errorBox.hidden = false; errorBox.scrollIntoView({ behavior: 'instant', block: 'center' });
    } finally {
      clearTimeout(timeout); busy = false; form.removeAttribute('aria-busy');
      form.querySelectorAll('input,textarea,button').forEach(input => { input.disabled = false; }); button.textContent = '送出我的想法';
    }
  });
  window.addEventListener('beforeunload', event => { if (busy) { event.preventDefault(); event.returnValue = ''; } });
})();
