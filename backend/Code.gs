/** AI 新手課前需求問卷：匿名寫入老師的私人試算表。 */
const FIELDS = ['role', 'experience', 'tools', 'websites', 'topics', 'workPain', 'lifePain', 'priority', 'scenario', 'barriers', 'devices', 'pace', 'budget', 'notes'];
const HEADERS = ['身分／工作型態', 'AI 使用經驗', '用過的 AI 工具', '想做的一頁式網頁', '最想學的主題', '工作／學習痛點', '生活痛點', '最優先想解決的事', '具體情境與期待', '學習顧慮', '上課可用設備', '偏好的上課方式', '工具費用接受度', '其他想說的話'];

function setup() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID');
  if (!id) {
    const book = SpreadsheetApp.create('AILearn｜AI 新手課前需求問卷回覆');
    const sheet = book.getSheets()[0].setName('問卷回覆');
    sheet.appendRow(['填答時間（台灣）', '回覆編號'].concat(HEADERS));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length + 2).setFontWeight('bold').setBackground('#dcece8');
    sheet.setColumnWidths(1, HEADERS.length + 2, 200);
    sheet.setColumnWidth(10, 340);
    sheet.setColumnWidth(11, 400);
    book.setSpreadsheetTimeZone('Asia/Taipei');
    id = book.getId();
    props.setProperty('SHEET_ID', id);
  }
  console.log('試算表：https://docs.google.com/spreadsheets/d/' + id + '/edit');
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, service: 'AILearn', version: 1 });
}

function safeCell_(value) {
  const text = Array.isArray(value) ? value.join('、') : String(value || '');
  return /^[\s]*[=+@\-]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 30000) throw new Error('資料格式有誤，請重新整理後再試。');
    const data = JSON.parse(e.postData.contents);
    if (data.website) throw new Error('無法送出，請重新整理後再試。');
    if (!/^[a-f0-9-]{36}$/i.test(data.id || '')) throw new Error('回覆編號有誤，請重新整理後再試。');
    if (data.version !== 1) throw new Error('問卷已更新，請重新整理後再填寫。');
    if (typeof data.experience !== 'string' || !data.experience || data.experience.length > 120) throw new Error('請選擇 AI 使用經驗。');
    if (!Array.isArray(data.topics) || !data.topics.length || data.topics.length > 3) throw new Error('請選擇 1～3 個最想學的主題。');
    if (typeof data.priority !== 'string' || !data.priority.trim()) throw new Error('請填寫最優先想解決的事。');
    FIELDS.forEach(function (key) {
      const v = data[key];
      if (v === undefined) return;
      if (typeof v !== 'string' && !Array.isArray(v)) throw new Error('問卷資料格式有誤。');
      if (Array.isArray(v) && (v.length > 30 || v.some(function (x) { return typeof x !== 'string' || x.length > 600; }))) throw new Error('選項資料有誤。');
      if (typeof v === 'string' && v.length > 2000) throw new Error('文字過長，請縮短至 2000 字內。');
    });
    if (!data.topics.every(function (x) { return typeof x === 'string' && x.trim(); })) throw new Error('請重新選擇學習主題。');
    const sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    if (!sheetId) throw new Error('老師尚未開放收件，請稍後再試。');
    lock = LockService.getScriptLock();
    if (!lock.tryLock(15000)) throw new Error('目前送出人數較多，請稍後再試。');
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('問卷回覆');
    const lastRow = sheet.getLastRow();
    const previous = lastRow > 1 ? sheet.getRange(2, 2, lastRow - 1, 1).createTextFinder(data.id).matchEntireCell(true).findNext() : null;
    const row = [Utilities.formatDate(new Date(), 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss'), data.id].concat(FIELDS.map(function (key) { return safeCell_(data[key]); }));
    if (previous) sheet.getRange(previous.getRow(), 1, 1, row.length).setValues([row]);
    else sheet.appendRow(row);
    SpreadsheetApp.flush();
    return json_({ ok: true, id: data.id });
  } catch (error) {
    const message = /^(資料格式|無法送出|回覆編號|問卷已更新|請選擇|請填寫|問卷資料|選項資料|文字過長|請重新|老師尚未|目前送出)/.test(error.message) ? error.message : '暫時無法儲存，請稍後再試。';
    return json_({ ok: false, message: message });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
