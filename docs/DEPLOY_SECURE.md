# 加密版上線與更新步驟(GitHub Desktop · 情境 A)

> 本資料夾是「加密版」,可放公開 repo。明文母版請留在自己電腦,勿上傳公開 repo。

## 一、第一次上線(建立新 repo 並開 Pages)

1. 解壓 `tsl-fleet-monitor-secure.zip`,得到 `tsl-fleet-monitor-secure` 資料夾。
2. GitHub Desktop →「File → Add Local Repository」→ 選此資料夾 →
   出現「這裡還不是 repo」→ 按「Create a repository」→ Create。
3. 左下 Summary 輸入 `初版加密版 v0.9.8 20條` → 按「Commit to main」。
4. 右上「Publish repository」→ 命名(例:tsl-fleet-monitor)→
   內容已加密,**可放公開**(不必勾 Keep this code private)→ Publish。
5. 到 github.com 進此 repo →「Settings → Pages」→
   Source 選「Deploy from a branch」→ Branch 選 `main`、資料夾 `/(root)` → Save。
6. 等約 1 分鐘,頁面上方出現網址 `https://<帳號>.github.io/<repo>/`。
7. 開網址 → 輸入密碼 → 進入系統。把「網址 + 密碼」分別發給應看的同仁。

## 二、日後每次更新(維護者交付新加密版時)

1. 用新加密檔覆蓋本資料夾內容。
2. GitHub Desktop 會列出變更 → Summary 打 `更新至 vX.X.X` → Commit to main。
3. 右上「Push origin」。約 1 分鐘後線上即最新版,同仁重新整理即可。

## 三、更換密碼
密碼變更需以新密碼重新加密(靜態加密特性),請聯繫維護者重產加密檔後,再依「二、更新」推送。
