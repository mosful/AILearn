# Pages 發布操作卡

本課主線：Lovable 預覽與調整、同步 GitHub、產出 docs/index.html、GitHub Pages 自動發布。

## 先辨認兩種檔案

- 原始專案：可能含 TanStack Start、src、TSX 及伺服器程式，不能直接當成 Pages 成品。
- 靜態匯出：docs/index.html，CSS 與 JavaScript 內嵌，必要圖片放 docs/assets，沒有伺服器或金鑰依賴。

```text
儲存庫根目錄
  原始專案檔案（保留）
  docs/
    index.html
    .nojekyll
    assets/（只有使用圖片時才需要）
```

## 主線：發布分支的 /docs

1. 在 Lovable 完成內容與版面，使用 L5 產出獨立靜態頁。等待同步後在 GitHub 確認 docs/index.html。
2. GitHub Code／Download ZIP，解壓縮後雙擊 docs/index.html，對照原預覽並測互動。不能把 ZIP 直接當成網站檔。
3. 公開前檢查整份儲存庫與歷史沒有私人資料。只對可公開的教學庫在 Settings／General／Danger Zone 調整為 Public。若原庫不能公開，另建 public 庫只放 docs 靜態成品。
4. Settings／Pages，Source 選 Deploy from a branch，Branch 選 main（或實際同步分支），Folder 選 /docs，Save。
5. 到 Actions 查看 Pages 部署。成功後回 Pages 按 Visit site，取得實際正式網址，網址不需加 /docs。
6. 點 docs/index.html 的鉛筆直接改一段文字並提交。部署成功後重看正式網址，驗證自動更新，這次不用按 Lovable Publish。

## 每次更新該做什麼

- 在 Lovable 改版：先用 L6 更新靜態匯出，再確認同步提交，Pages 才會發布新靜態內容。
- 在 GitHub 改版：直接編輯 docs/index.html 並提交到發布分支，Pages 自動更新。
- 在 ChatGPT 改版：下載最新靜態 HTML，請 AI 改內容，存檔驗收後自己上傳至 GitHub 的 docs，再由 Pages 發布。
- 同步尚未斷開時，避免兩端同時修改同一檔。完全離開 Lovable 前，先確認下載備份與 Pages 可用，再 Disconnect project。

## 選做：改用 GitHub Actions

主線 main /docs 已能自動發布，不必使用這份範本。選做時才執行以下步驟，兩種發布來源擇一。

1. 使用 portable/templates/pages-static.yml 範本。先確認同步分支為 main，若不同則修改 branches。
2. 在 GitHub Add file／Create new file，檔名輸入 .github/workflows/pages-static.yml，貼範本內容並提交。
3. Settings／Pages 把 Source 改成 GitHub Actions，再在 Actions 內手動執行「發布靜態活動網頁」一次。
4. 成功後，新的 docs 提交會自動執行這個工作流程。只授予範本所列 contents: read、pages: write、id-token: write，不需 PAT 或自訂密鑰。
5. 本範本只上傳 docs，沒有 npm build。若要部署原始框架專案，必須依框架另行處理，不能擅自把路徑改成 src。

## 故障排查

- 404：先查 docs/index.html 大小寫、分支、/docs 或 Actions 發布來源，再看部署結果。
- Pages 不見：確認教學庫為 public，且自己有管理權限。
- 403／權限錯誤：看 Actions 與 Pages 的帳號或組織限制，不放寬到全部寫入，也不把密鑰貼到前端。
- 樣式不見：確認 CSS 內嵌，圖片同步在 docs/assets，路徑使用相對位置。
- 正式頁還是舊版：查 docs 是否重新匯出、同步及部署是否成功，再用無痕視窗測試。

## 講師提問

主線已設定 main /docs，自動發布還需要另加 Actions 範本嗎？

<small>參考解答：不需要。分支發布本身就會自動更新。Actions 是另一種可選發布來源，只有選做時才切換，避免同時維護兩套流程。</small>

## 官方依據與驗證限制

查閱日期：2026-11-05。

- [GitHub Pages 發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Lovable 部署與架構](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership)
- [GitHub 下載程式碼快照](https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives)
- [Vite 官方 Pages 工作流程範例](https://vite.dev/guide/static-deploy.html)，僅用來核對官方 Actions 元件版本。此操作卡不要求部署 Vite 原始專案。

範本已做本機檔案／結構檢查，沒有替學員帳號實際執行 GitHub 遠端部署。上課前請講師用自己的教學測試庫走完一次。

## Claude 補充路線

依課程順序，先練 ChatGPT，再用 Claude 製作或修改相同主題。Claude 使用 CL1／CL2／CL4 取得獨立 HTML，離開平台驗收後，手動上傳 docs/index.html，再交給本操作卡的 Pages 流程。Artifacts 預覽與分享不等於 GitHub 提交。
