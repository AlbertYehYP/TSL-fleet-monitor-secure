# TS LINES 船隊檢驗監控系統 — 加密版(可公開部署)

專供上傳 GitHub / GitHub Pages 的加密版本。所有頁面資料以 AES-256-GCM
(密碼衍生金鑰 PBKDF2 20 萬次)加密,原始碼中看不到任何船舶資料;
開啟頁面須輸入密碼,於瀏覽器本機解密。

## 密碼
- 本系統需密碼開啟。**密碼由系統維護者另行私下發給應使用的同仁,不寫在本檔案、不進版本庫。**
- 需更換密碼時,請聯繫維護者以新密碼重新加密(更換密碼須重新產生加密檔,此為靜態加密特性)。
- 密碼即防線:請勿截圖、轉傳或寫在公開處。

## 內容
- `index.html` 首頁選單(需密碼)
- `P1_fleet_command.html` 戰情室 · `P2_forward_planner.html` 前瞻排程
- `P3_expiry_radar.html` 到期雷達 · `P4_ship_detail.html` 單船詳情
- `P5_calculator.html` 快速試算
- 同一次瀏覽輸入一次密碼,切換分頁不再重問。

## 安全須知
- 這份加密版可放**公開** repo + GitHub Pages。
- **明文母版(另一個 zip,含 fleet-data.js / Excel 範本)請勿放上公開 repo。**
- 上線與更新步驟見 `docs/DEPLOY_SECURE.md`。

版本:v0.9.8 · 20 條船 · 加密版
