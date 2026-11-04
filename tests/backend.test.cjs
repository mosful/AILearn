const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function backend() {
  const rows = [['時間', '編號']];
  const sheet = {
    getLastRow: () => rows.length,
    getRange: () => ({ createTextFinder: id => ({ matchEntireCell() { return this; }, findNext: () => rows.some(row => row[1] === id) || null }) }),
    appendRow: row => rows.push(row)
  };
  const context = vm.createContext({
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => '測試試算表' }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
    LockService: { getScriptLock: () => ({ tryLock: () => true, hasLock: () => true, releaseLock() {} }) },
    Utilities: { formatDate: () => '2026-11-04 18:00:00' },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) }
  });
  vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, '../backend/Code.gs'), 'utf8'), context);
  return { context, rows, post: data => context.doPost({ postData: { contents: JSON.stringify(data) } }) };
}
const valid = () => ({ id: '11111111-1111-4111-8111-111111111111', version: 1, experience: '完全沒用過，想從零開始', topics: ['整理文件'], priority: '做出自己的網頁' });

test('寫入成功才回覆相同回覆編號，重送不增加列數', () => {
  const b = backend(); const data = valid();
  assert.equal(b.post(data).ok, true); assert.equal(b.rows.length, 2);
  assert.equal(b.post(data).id, data.id); assert.equal(b.rows.length, 2);
});
test('必填資料及複選上限由後端阻擋', () => {
  const b = backend();
  assert.equal(b.post({ ...valid(), experience: '' }).ok, false);
  assert.equal(b.post({ ...valid(), topics: [] }).ok, false);
  assert.equal(b.post({ ...valid(), topics: ['甲', '乙', '丙', '丁'] }).ok, false);
  assert.equal(b.post({ ...valid(), priority: '  ' }).ok, false);
  assert.equal(b.rows.length, 1);
});
test('無效編號、蜜罐及超長資料不寫入', () => {
  const b = backend();
  assert.equal(b.post({ ...valid(), id: '無效' }).ok, false);
  assert.equal(b.post({ ...valid(), website: '機器人' }).ok, false);
  assert.equal(b.post({ ...valid(), notes: '字'.repeat(2001) }).ok, false);
  assert.equal(b.rows.length, 1);
});
test('自由填寫不會變成可執行的試算表公式', () => {
  const b = backend();
  for (const formula of ['=IMPORTXML("範例")', '+1+1', '@SUM(A1)', '-1+1', '  =1+1']) assert.ok(b.context.safeCell_(formula).startsWith("'"));
  assert.equal(b.context.safeCell_('正常文字'), '正常文字');
});
test('健康檢查不揭露試算表或回覆資料', () => {
  const result = backend().context.doGet();
  assert.equal(result.ok, true); assert.deepEqual(Object.keys(result).sort(), ['ok', 'service', 'version']);
});
