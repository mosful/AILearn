# 免費 GitHub 能力查證與主線選擇

查閱日：2026-11-05。

## 免費工具與 GitHub 能力

| 工具 | 判定 | 限制與依據 | 課堂用法 |
| --- | --- | --- | --- |
| Lovable Free | 可以 | github.com 整合適用 Free，可建立儲存庫並雙向同步。 | 課堂主要製作與同步工具。 |
| ChatGPT Free | 依帳號及介面 | 官方沒有保證所有 Free 帳號都有 GitHub app；即使可連接也只讀取、搜尋與分析。 | 用提示詞產出／修改檔案，再手動提交 GitHub。 |
| 一般 ChatGPT GitHub app | 不支援回寫 | 不能自動 push、建立程式修改或 PR，不能等同 Lovable 同步。 | 不作為本課發布步驟的前提。 |
| GitHub Free＋Pages | 可以 | 使用 public repository 發布靜態檔案。 | main /docs 收到提交後自動發布。 |
| Claude Free | 可產生／修改作品 | Artifacts 可用；需要相關檔案製作能力與剩餘額度，外部 app 與資料儲存另依方案。 | 接在 ChatGPT 後，以獨立 HTML 匯出、手動提交 GitHub。 |



### Sync your Lovable project with GitHub

github.com 整合明示適用所有方案，含 Free。可雙向同步，新儲存庫預設 private。平台內直接下載 codebase 屬付費功能，可改從 GitHub 下載 ZIP。

來源：[Sync your Lovable project with GitHub](https://docs.lovable.dev/integrations/github)

### Connecting GitHub to ChatGPT

GitHub app 只讀取／搜尋／分析，不推送程式碼。可用性依方案與介面，沒有保證所有 Free 帳號皆可連接。

來源：[Connecting GitHub to ChatGPT](https://help.openai.com/en/articles/11145903-connecting-github-to-chatgpt)

### Deployment, hosting, and ownership options

官方說明新專案自 2026-05-13 起採 TanStack Start，含伺服器執行需求。舊 React＋Vite 才能直接建置靜態檔。Pages 主線採另外產出獨立靜態頁。

來源：[Deployment, hosting, and ownership options](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership)

### Downloading source code archives

Code／Download ZIP 可取得原始碼快照，快照不含完整 Git 歷史。

來源：[Downloading source code archives](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives)

### Creating a GitHub Pages site

GitHub Free 以 public repository 使用 Pages，入口檔案位置與發佈等待。

來源：[Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

### Configuring a publishing source

靜態頁以 main 的 /docs 自動發布；自訂 Actions 為另一種可選發布來源。兩種設定擇一。

來源：[Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### What are artifacts and how do I use them?

Free 可用 Artifacts。需開啟 Create and edit files／Cloud code execution。Design 可匯出 standalone HTML，介面以當日畫面為準。

來源：[What are artifacts and how do I use them?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)

### Use the GitHub integration

GitHub 整合可將授權檔案作為對話或專案脈絡。此課不依賴整合，不把加入來源或 Sync 操作視為網站已發布。

來源：[Use the GitHub integration](https://support.claude.com/en/articles/10167454-use-the-github-integration)

未使用學員 Free 帳號做端到端登入驗收，因此能力結論以官方文件為依據，不假稱已實測所有帳號。Claude 路線不要求 GitHub 整合、Claude Code 或付費平台資料儲存。主線新增靜態匯出是課程的實作選擇，需人工對照原預覽驗收。
