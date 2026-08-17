/* ============================================================
   TS LINES FLEET SURVEY MONITOR — 系統核心模組 system-meta.js
   職責:① 版本控制 ② 變更紀錄 ③ 中英雙語切換
   所有頁面(P1–P5)與轉檔工具共用此檔。
   ============================================================ */
(function(){
"use strict";

/* ===== ① 版本 ===== */
const SYSTEM = {
  name: "TS LINES Fleet Survey Monitor",
  version: "0.9.26",
  released: "2026-08-17",
  schema: "survey-status-schema v2",
  stage: "Prototype / 原型",
  credit: "© 2026 TSL 海技部門 · Capt. Albert Yeh 開發"
};

/* ===== ② 變更紀錄(最新在前) ===== */
const CHANGELOG = [
  { v:"0.9.26", date:"2026-08-17", items:[
      "修復 P1–P4 在加密單檔版（解密後以 document.write 注入）情境下，因 fleet-data.js 非同步載入、window.FLEET／FLEETLIB 尚未就緒即執行 init，導致整頁卡在載入畫面／無回應的問題。",
      "各頁 init 一律改為等待資料就緒（boot 輪詢）才執行；逾時（約 5 秒）顯示明確錯誤橫幅，不再無限空轉。",
      "根因：P1–P4 於頂層直接以 const 擷取 window.FLEET／FLEETLIB 並立即使用，無防護；index 因採 ||{} 防護故不受影響。此後新增頁面請沿用 boot 就緒守衛樣式。"
    ]},
  { v:"0.9.25", date:"2026-08-06", items:[
      "版權署名補上『開發』並顯示於版本資訊後與首頁:© 2026 TSL 海技部門 · Capt. Albert Yeh 開發。",
      "P1 七項到位:健康總表新增『TEU 級距』下拉篩選(0–2000 / 2000–4000 / 4000–7000 / 7000+),與級距卡點選同步;篩選器改為高對比框(▼篩選 FILTER 標籤 + 亮框下拉);未來18月熱力圖與健康總表篩選『聯動』(改一個另一個對應);篩選後表格有縮列動畫。",
      "全『船隊』統計資訊格字體置中(總船數/逾期/TEU 等);『全隊』字樣統一為『全船隊』;TEU 級距卡置於總船數的下一排且維持點選篩選功能。"
    ] },
  { v:"0.9.24", date:"2026-08-06", items:[
      "count-up 動畫加強:全隊總噸位、總 TEU、以及各卡『N 艘合計 / N 艘』的數字,現在每次切換 Σ TEU/Σ GT 或點級距卡時都會從 0 重新滾動一次——整排統計一起動,不再是只在載入時跑一次。",
      "四段級距的 Σ 值維持原本的 TEU↔GT 互相過渡效果;動畫一律尊重 prefers-reduced-motion。"
    ] },
  { v:"0.9.23", date:"2026-08-05", items:[
      "P1 圖表動畫:切換 Σ TEU/Σ GT、散布圖 X 軸、管理公司 Y 軸時,統計數字改為 count-up 滾動(0.6 秒 ease-out);散布圖的『船點』與『管理公司圈』改為平滑滑移到新位置(非瞬間跳),更有統計移動感。",
      "動畫尊重系統『減少動態效果』(prefers-reduced-motion)設定——使用者若關閉動畫,自動退回瞬間切換。無密碼公開版首頁改為動態顯示船級社分布(取代舊版『ClassNK / CR 雙船級社』字樣)。"
    ] },
  { v:"0.9.22", date:"2026-08-05", items:[
      "P1 版面調整:將『全隊總噸位 GT / 全隊總 TEU』與『TEU 四段級距卡』整排移至船隊分布圖正上方;頂列 KPI 精簡回 6 格(總船數 / 逾期 / 90天內 / 未來12月進塢 / 平均船齡 / 有限令)。",
      "總噸位、總 TEU 兩張為總覽卡(高亮、不可點);四段級距卡仍可點以該級距篩選健康總表,右上可切 Σ TEU / Σ GT。"
    ] },
  { v:"0.9.22", date:"2026-08-05", items:[
      "版面調整:將『全隊總噸位 GT / 總 TEU』兩格與 TEU 四段級距統計卡,由頂列移至『船隊分布圖』上方,集中呈現船隊規模概覽;頂列 KPI 回復為 6 格(總船數 / 逾期 / 90天內 / 進塢 / 船齡 / 限令)。"
    ] },
  { v:"0.9.21", date:"2026-08-05", items:[
      "P1 戰情室六項強化:健康總表新增『船級社 / 船東 / 造船廠』篩選;旗國與船級社改為彩色標籤(NK/DNV/LR/CR、MHL/TWN/SGP 各有專色),一眼分辨。",
      "頂列 KPI 於總船數旁新增『全隊總噸位 GT』與『全隊總 TEU』;新增 TEU 四段級距統計卡(0–2000 / 2000–4000 / 4000–7000 / 7000+),可切 Σ TEU / Σ GT,點卡即以該級距篩選健康總表。",
      "字級鈕由右下角移至頂列右上(分頁列上方)。補齊 3 條原缺 TEU 之船:TS PUSAN 1,808、TS QINGDAO 1,808、TEH VICTORY 987 → 全 43 條皆有 TEU;全隊合計 GT 1,244,034 / TEU 124,601。"
    ] },
  { v:"0.9.20", date:"2026-08-05", items:[
      "新增 TS PUSAN(9854844)、TS QINGDAO(9854832),船隊達 43 條(目標達成)。兩條為 LR(Lloyd's Register)姊妹船(CSBC 高雄);船級社分布 NK 39 / LR 2 / DNV 1 / CR 1,旗國 MHL 40 / SGP 2 / TWN 1。",
      "TS PUSAN:UMS(無人機艙)目前為暫停 Suspended,機艙須有人當值;年檢窗口 2026-09-28 開啟。TS QINGDAO:法定/船級年檢 2026-10-28 到期(Due Soon),BWTS 缺失已修復並換發全期 IBWM 銷案。",
      "LR 報表未列 TEU:全隊 43 條中 3 條(2×LR、1×DNV)缺 TEU,已於 P4 資料附註標明(影響後續 TEU 級距與總和統計之完整度)。"
    ] },
  { v:"0.9.19", date:"2026-08-04", items:[
      "新增 TEH VICTORY(IMO 9362566),船隊達 41 條。此為首條 DNV 船級(船隊另有 NK 39、CR 1);P4 標題、原始報表分頁、頁尾均已隨船級社自動切換。",
      "TEH VICTORY 剛完成換證(證書至 2031-05-24),但 SMC/ISPS/MLC 為臨時證、須於 2026-11-24 前完成全期換證審核換發正式證——此為該船當前最優先項目。2008 年建造,為船隊船齡最高者。",
      "已於 P4 以資料附註標明 DNV 報表相對 ClassNK 缺漏之欄位:淨噸/載重噸/TEU、主尺寸、造船廠/船殼號/下水日/交船日、主機規格、IHM 證書;P4 主檔並加空值防呆以相容資料不全之船。"
    ] },
  { v:"0.9.18", date:"2026-08-04", items:[
      "新增 TS HOCHIMINH(9914151),船隊達 40 條。此船整包換證(SS、鍋爐、塢檢+AFS、尾軸、PMS、起重 ATS+負荷試驗、M0、LL/SC/SE)經旗國授權展延至 2026-10-31;LL/SC/SE 證書為 Conditional(效期至 2026-10-31)。",
      "TS HOCHIMINH 之 MARPOL VI 換證(APP)未列入展延,硬期限 2026-09-14,須單獨如期完成;上述項目均已進到期雷達。",
      "新增「字級」選擇(標準／大／特大),固定於各頁右下角、偏好記憶於瀏覽器,便於會議室投影與長時間閱讀。"
    ] },
  { v:"0.9.17", date:"2026-08-04", items:[
      "船隊擴充至 39 條:新增 TS JAKARTA(9928633)、TS INCHEON(9947689)、TS KELANG(1081647);TS KAOHSIUNG 已在系統並核對無誤。",
      "TS KELANG 為船隊首條 Singapore 旗(IMO 1081647、2026-04 全新船、ML FR(C) 註記、PMS 於 SS 辦理)。旗國分布:MHL 36 / SGP 2 / TWN 1。",
      "TS INCHEON 存有船級限令(CoC):左舷艏側殼板破損須每年檢複驗,2028-07-06 前修復;TS JAKARTA 起重設備徹底檢查 2026-08-31 到期(NK ●30),均已進到期雷達。"
    ] },
  { v:"0.9.16", date:"2026-08-04", items:[
      "船隊同步至 36 條:TS HAKATA / TS KEELUNG / KOTA VALPARAISO(前名 TS DUBAI)三條主檔・證書・檢驗・起重・PMS 齊備並與 NK 原文核對一致。",
      "新增密碼閒置自動鎖定:任一頁閒置逾 10 分鐘無操作,即清除瀏覽器本機暫存密碼並強制重新輸入(分鐘數可於 build 端 IDLE_MIN 調整)。",
      "HAKATA/KEELUNG 之 PMS 於特別檢驗(SS)辦理;VALPARAISO 無登記起重設備、9 項年檢窗口 2026-09-10 收窗。"
    ] },
  { v:"0.9.15", date:"2026-08-04", items:[
      "船隊同步至 33 條:BANGKOK/CHIBA/COLOMBO/GUANGZHOU 四條主檔・證書・檢驗・起重・PMS 齊備並與 NK 原文核對一致。",
      "GUANGZHOU:駕駛台左舷窗玻璃暫以鐵板遮蔽之限令(CoC),SC 證書 Conditional,須於 2026-08-07 前永久修復——已進到期雷達,為當前最緊迫項目。",
      "全船隊 33 條 CMS 明細、起重設備台帳、CoC 追蹤齊備;V.Ships 正規化維持(合併 10 條、管理公司 5 家)。"
    ] },
  { v:"0.9.15", date:"2026-08-03", items:[
      "船隊擴充至 33 條:新增 TS BANGKOK / TS CHIBA / TS COLOMBO / TS GUANGZHOU(以各自姊妹船結構為底,依 NK 報表覆蓋識別・日期・證書期別・起重・PMS)。",
      "TS GUANGZHOU 建立 CoC:駕駛台左舷窗玻璃暫以鐵板遮蔽,須於 2026-08-07 前永久修復(SC 證書 Conditional 同日到期)——已進 P3 雷達警示。",
      "TS COLOMBO 塢內檢驗與 AFS 定期檢 due 2027-01-15(早於特檢);GUANGZHOU 起重 TE due 2026-10-06(●90);CHIBA 機損依規於特檢辦理。"
    ] },
  { v:"0.9.14", date:"2026-07-31", items:[
      "修正:V.Ships 三種寫法(V.Ships Shipping Development (Shanghai) Limited / V.Ships (Shanghai) Limited / …Ltd.)原被當成三家分開計算,現正規化為同一家,合併計數/上色/篩選/分布(共 8 條)。",
      "正規化於 P1、P4 載入時就地套用(不改 fleet-data.js,資料還原亦不受影響);未來 V.Ships 變體自動合併。",
      "管理公司家數由 7(V.Ships 拆 3)修正為 5:Fleet Management 16、V.Ships 8、T.S. Lines 3、Teh 1、BSM 1。"
    ] },
  { v:"0.9.13", date:"2026-07-31", items:[
      "船隊擴充至 29 條:新增 TS MAWEI/LIANYUNGANG/KWANGYANG/KOBE 四條(主檔・證書・檢驗・起重・PMS 齊備)。",
      "補齊 MELBOURNE/PENANG/CHENNAI 三條 CMS 逐項明細;全船隊 29 條 CMS 明細、起重設備台帳、檢驗追蹤全數齊備——基線建置完成。",
      "MAWEI/LIANYUNGANG 之 PMS 依規於特別檢驗辦理(Rule Part B 9.1.5),明細 Due 標於 SS;KWANGYANG 船殼暫修待 2028-01-22 前永久修復(CoC)。"
    ] },
  { v:"0.9.13", date:"2026-07-31", items:[
      "船隊擴充至 29 條:新增 TS MAWEI、TS LIANYUNGANG、TS KWANGYANG、TS KOBE 四條(主檔・證書・檢驗・起重・PMS 明細齊備)。",
      "補齊 PENANG/CHENNAI/MELBOURNE 的 CMS 逐項明細;全船隊 29 條 CMS/PMS 明細與起重設備台帳全數到位。",
      "MAWEI/LIANYUNGANG 機損採『特檢時辦理』(PMS@SS);KWANGYANG 帶艉部外板暫時修復 CoC(2028-01-22 前永久修復)。"
    ] },
  { v:"0.9.12", date:"2026-07-31", items:[
      "船隊擴充至 25 條:新增 TS TIANJIN/OSAKA/NAGOYA/MUMBAI/MELBOURNE 五條(主檔・證書・檢驗・起重・PMS 明細齊備);可部署包同步至 25 條。",
      "補 TS SINGAPORE、TEH PEACE 的 Planned Machinery(System: CMS)台帳列;MELBOURNE 吊車到期以報表 CHG(TE) 2025-09-13 確認為 2026-09-13(●90)。",
      "全船隊起重設備台帳齊備;僅 PENANG/CHENNAI/MELBOURNE 待補 CMS 逐項明細(需 PMS CSV/吊車明細表)。"
    ] },
  { v:"0.9.11", date:"2026-07-30", items:[
      "批次匯入 13 條 PMS 計畫機損明細 + 13 條起重設備資料;全船隊 20 條起重設備狀態齊備。",
      "16 條有登記起重設備(含窗口型『依 SC 定期檢』、NANSHA 徹底檢查/負荷試驗展延至 2026-10-19);4 條(DALIAN/KAOHSIUNG/TOKYO/TEH PEACE)NK 報告為無登記起重設備。",
      "KOTA CALLAO 補入機艙天車/桅桿吊/加油吊桿等服務用起重設備;TS SHANGHAI 為 2024 新船,機損尚未編入 CMS(標『未派期』)。僅 PENANG/CHENNAI 待補 PMS。"
    ] },
  { v:"0.9.10", date:"2026-07-30", items:[
      "同步 standalone 與加密版至最新 root:含 MUNDRA/TACOMA/SYDNEY/SHEKOU/JOHOR 五條 CMS 計畫機損逐項明細。",
      "P4 計畫機損明細改逐項到期呈現;TS SYDNEY 老船分散到期,9 項確認檢驗(Confirmatory Survey,due 2026-05-31)以逾期紅標顯示,1 項主發電機 9/30 到期。",
      "6 條吊車資料(TACOMA/CHENNAI/SYDNEY/PENANG/SHEKOU/JOHOR)經與 NK 原文核對一致;附 NK 檢驗縮寫與艙檢代碼註解文件。"
    ] },
  { v:"0.9.9", date:"2026-07-30", items:[
      "TS MUNDRA:匯入 CMS 計畫機損檢驗逐項明細(103 項,均 due 2028-10-31、last 2023-10-08,與特檢同期,無近期到期)。",
      "P4 單船詳情新增可收合「計畫機損檢驗明細 (CMS 逐項)」區塊,有資料的船才顯示。",
      "更正:MUNDRA 吊車徹底檢查(due 2026-09-04)原本即已在雷達 due90 追蹤,先前稽核誤報為漏警,已澄清。"
    ] },
  { v:"0.9.8", date:"2026-07-28", items:[
      "船隊擴充至 20 條:新增 TS KAOHSIUNG(IMO 9810068 / NK 174066,Fleet Mgmt,Marshall 旗)。",
      "TS KAOHSIUNG:2017 年 CSBC 基隆廠(台灣)建造之 17,449 GT / 1,787 TEU 小型貨櫃船;無吊桿、單鍋爐、僅 ITC69 噸位證書、推進軸型 1C、尾軸硬期限 2028-02-12。",
      "年檢窗 2026-08-20 開(23 天內)→ 系統提前觸警 due90;NK 現無 ● 標記。",
      "另記固定式 CO₂ 系統十年水壓+軟管換新展延至 2027-11-20(旗國 2026/6/25 授權)。",
      "管理公司分布更新:Fleet Mgmt 10、V.Ships 5、T.S.Lines 3、Teh 1、BSM 1。"
    ] },
  { v:"0.9.7", date:"2026-07-28", items:[
      "船隊擴充至 19 條:新增 TS TACOMA、TS NANSHA、TS CHENNAI、TS DALIAN(皆 NK / Marshall 旗)。",
      "TS NANSHA:特別檢驗全數展延至 2026-10-19(LL/SC/SE 附條件證書),並帶 2 條船級限令 CoC(主機機座裂紋、機艙外板變形)。",
      "TS DALIAN:2007 二手入級老船(NS/MNS 無星號)、雙鍋爐(VB+廢氣鍋爐 EGB)、無吊桿、僅 ITC69 噸位證書、尾軸硬期限 2027-10-31。",
      "TS TACOMA / TS CHENNAI:V.Ships (Shanghai) 管理、吊車年度徹底檢查分別 ●30 / ●90 近期到期。",
      "管理公司分布更新:Fleet Mgmt 9、V.Ships 5、T.S.Lines 3、Teh 1、BSM 1。"
    ] },
  {v:"0.9.6", d:"2026-07-17", notes:[
    "CoC 預警維護層打通:轉檔 build() 補 cocs 組裝、範本新增 CoCs 分頁(imo/scope/ref/short/due/status)",
    "Round-trip 驗證通過:範本→轉檔 完整保留 6 船 7 項 CoC,健康燈一致",
    "確認 CoC 預警已全面生效(引擎+P1健康表/KPI+P3雷達+P4追蹤區):TS SINGAPORE 空調限令(2026-07-31)正確亮琥珀、不再綠燈"
  ]},
  {v:"0.9.5", d:"2026-07-17", notes:[
    "船隊達 15 條:批次 4(TS SHEKOU/SINGAPORE/SYDNEY/SHANGHAI)以最新 NK 原文逐項核對確認",
    "首條 Singapore 旗船 TS SHANGHAI(SGP)——旗國分布 MHL 13 / TWN 1 / SGP 1",
    "● 稽核全數通過(無 VANCOUVER 式誤標):SHEKOU 吊車 ●90、SYDNEY 年檢+中間檢窗開 11●、SINGAPORE/SHANGHAI 窗未開 0●",
    "船級限令 CoC 增至 6 條;TS SINGAPORE 住艙空調 CoC 限 2026-07-31(近期)、TS SHEKOU 撞損+艏推裂紋限 2027-12-18",
    "管理公司分布:Fleet Management 7 船 254,860 GT(圓圈面積等比最大)、V.Ships 3 船"
  ]},
  {v:"0.9.4", d:"2026-07-17", notes:[
    "P1 管理公司分布圖:圓圈改為『面積等比總噸位』(半徑 ∝ √總GT),主力管理商一眼可辨",
    "面積等比而非半徑等比,避免大公司視覺失真;隨 GT/TEU 切換縮放,小圈設下限確保可見",
    "修正 V.Ships 因字尾(Ltd. vs Limited)被拆成兩家 → 正確合併為 1 家 2 船(TS MUNDRA+TS VANCOUVER)"
  ]},
  {v:"0.9.3", d:"2026-07-17", notes:[
    "批次 3 核對:TS XIAMEN、TS VANCOUVER、TS TOKYO 三船以最新 NK Survey Status 逐項核對",
    "修正 TS VANCOUVER 誤標的 7 項 ●(剛完成中間檢之安靜期,NK 原文無 ●)→ 與官方一致",
    "TS XIAMEN 船級限令 CoC 確認(主機3號氣缸體裂紋,限 2027-01-16);TS TOKYO 年檢窗口開啟中(●)",
    "轉檔字典補齊 EEDI-p3/BRS1/BWTS/PS-DA;Excel 範本重建為完整 11 船",
    "船隊現況:11 船(10 NK + 1 CR、10 MHL + 1 TWN、3 家管理公司)"
  ]},
  {v:"0.9.2", d:"2026-07-16", notes:[
    "TEH PEACE:SMC/ISSC/MLC 正式全期證核發(SMC-26-026e/ISSC-26-022e/MLC-26-022e,至 2031-07-06)",
    "新增船級限令 CoC E26387CoC01:船殼標識,限 2028-02-22(下次塢底檢驗)前完成——船隊首例非 Nil 限令",
    "conditions 支援船級限令說明(Conditions 分頁新增 note_class 欄)"
  ]},
  {v:"0.9.1", d:"2026-07-16", notes:[
    "TEH PEACE 年度檢驗完成(2026-07-16):LL/SC/SE/SR/IOPP/IAPP/BWM/DG 八張法定證書背書",
    "證書效期不變(2030-05-28);年檢窗口推進至 2027;健康燈 due90 → ok",
    "示範『收到船級社證書更新 email → 更新檢驗完成狀態』的維護動作"
  ]},
  {v:"0.9.0", d:"2026-07-14", notes:[
    "系統升級為『多船級社』:TEH PEACE 由 NK 轉級至 CR(財團法人驗船中心・台灣船級社)",
    "新增 CR 註記字典(CR100/CMS/PCM/SRE…);字典現分 NK/CR 兩套並存",
    "P4 台帳標籤、註腳、IACS 說明改為隨 class_society 動態(CR 船顯示『CR Survey Status』)",
    "schema 新增 prev_class 欄位記錄轉級軌跡(P&I/保險要事);P4 標題顯示『⇄ 轉級自 NK』",
    "轉級後證書全貌不同:CR 為台灣旗 RO,持完整法定證書(NK 時期僅 3 張)→ 22 張",
    "SMC/ISSC/MLC 過渡期採已完成之新效期(2031-07-06)避免假警報,並於 raw_note 說明",
    "範本+轉檔同步(新增 prev_class 欄),8 船等價驗證通過"
  ]},
  {v:"0.8.0", d:"2026-07-14", notes:[
    "批次 2 新增 3 船 → 共 8 艘:TS JOHOR、TS PENANG(TSL 自管小型支線)、TEH PEACE",
    "首度納入非馬紹爾旗:TEH PEACE 為台灣旗(TWN)——NK 僅持船級證書,法定證書由台灣主管機關管理,已於資料註明",
    "新管理公司 Teh Shipping Lines(配色:青);T.S. Lines 自管增至 3 艘",
    "註記字典新增 EA(環保意識)、DSS(EE2)(EEDI Phase 2 能效設計)",
    "Schema 驗證通過:台灣旗只有 Class 軌、小型 feeder、新註記碼皆正確處理"
  ]},
  {v:"0.7.0", d:"2026-07-14", notes:[
    "Excel 維護流程正式可用:範本 9 分頁(含 Certificates / Particulars / RawNK 逐列原文台帳)",
    "轉檔工具重建,產出與手工版「完全等價」(證書號、細項、台帳、註記、健康燈全數一致)",
    "IACS 證書表排除噸位證,比照 NK 原報表",
    "新增系統部署文件 DEPLOYMENT.md(可作為快速布建 SKILL 之基礎)"
  ]},
  {v:"0.6.0", d:"2026-07-14", notes:[
    "新增 system-meta.js:版本控制 + 中英雙語切換(UI 骨架)",
    "Excel 維護範本擴充:尺寸/機械/證書號/英文標籤欄位",
    "轉檔工具支援擴充欄位"
  ]},
  {v:"0.5.0", d:"2026-07-14", notes:[
    "新增 Excel 維護範本 + 離線轉檔工具(不需寫程式即可加船)",
    "P1 管理公司圖改為散布圖(X=船舶數, Y=總噸位/TEU)",
    "P1 船舶散布圖點大小固定",
    "P5 改用 v5 完整引擎(含展延可行性模擬器)"
  ]},
  {v:"0.4.0", d:"2026-07-14", notes:[
    "新增 P2 前瞻排程(3年甘特+行動起跑線+調度密度)",
    "新增 P5 單船快速試算",
    "五頁分頁導覽全打通"
  ]},
  {v:"0.3.0", d:"2026-07-14", notes:[
    "新增船舶:TEH TAICHUNG(9359727)、TS HONGKONG(9937529)→ 共 5 艘",
    "管理公司配色定案:FLEET=藍 / TSL自管=鵝白 / V.Ships=淺綠 / BSM=鵝黃",
    "修正:1C 為尾軸種類(油潤滑+監測裝置),非冰級",
    "P4 時間軸改以「換證日−5年」為本輪起點(修正老船顯示)"
  ]},
  {v:"0.2.0", d:"2026-07-14", notes:[
    "資料抽出為單一資料源 fleet-data.js + 共用引擎 FLEETLIB",
    "新增 P1 船隊戰情室、P3 到期雷達",
    "新增船舶:TS MUNDRA(9953834)"
  ]},
  {v:"0.1.0", d:"2026-07-14", notes:[
    "P4 單船詳情原型 + 船舶下拉選單",
    "建檔:KOTA CALLAO(9967512)、TS SURABAYA(9955442)"
  ]}
];

/* ===== ③ 中英對照(ZH → EN)=====
   僅覆蓋 UI 骨架:標題/分頁/KPI/表頭/狀態/圖例/按鈕。
   長篇專業敘述暫留中文;要擴充,在此加一行即可。            */
const DICT = {
  // 分頁與標題
  "船隊戰情室 FLEET COMMAND":"FLEET COMMAND",
  "前瞻排程規劃 FORWARD PLANNER":"FORWARD PLANNER",
  "到期雷達 EXPIRY RADAR":"EXPIRY RADAR",
  "單船詳情 SHIP DETAIL":"SHIP DETAIL",
  "單船快速試算 CALCULATOR":"CALCULATOR",
  "船舶法規證書檢驗週期檢驗表":"Ship Certificate & Survey Cycle Self-Check",
  "P1 戰情室":"P1 Command","P2 前瞻排程":"P2 Planner","P3 到期雷達":"P3 Radar",
  "P4 單船詳情":"P4 Ship Detail","P5 快速試算":"P5 Calculator",
  // 區塊標題
  "船隊健康總表 FLEET HEALTH":"FLEET HEALTH",
  "船隊分布圖 FLEET SCATTER — 船舶大小 × 船齡":"FLEET SCATTER — Size × Age",
  "重大作業前瞻 FORWARD SCHEDULE":"FORWARD SCHEDULE",
  "船舶主檔 PARTICULARS":"PARTICULARS",
  "設備附加 INSTALLATION":"INSTALLATION",
  "證書清單 CERTIFICATES":"CERTIFICATES",
  "檢驗履歷 SURVEY HISTORY":"SURVEY HISTORY",
  "船級限令與備註 CONDITIONS / NOTES":"CONDITIONS / NOTES",
  "適航狀態標籤解讀 SEAWORTHINESS TAGS":"SEAWORTHINESS TAGS",
  "輸入參數 INPUT":"INPUT",
  // KPI / 欄位
  "總船數":"Total Ships","船隊船數":"Fleet Size","逾期項":"Overdue","90天內到期項":"Due ≤90d",
  "30天內到期項":"Due ≤30d","未來12月進塢船":"Dockings (12m)","平均船齡":"Avg Age",
  "有限令船數":"Ships w/ Conditions","船級號":"Class No.","旗國":"Flag","船齡":"Age",
  "90天內到期":"Due ≤90d","下次塢檢":"Next Docking","3年內塢檢":"Dockings (3y)",
  "3年內特檢/換證":"Special/Renewal (3y)","3年內中間檢":"Intermediate (3y)",
  "已進準備期":"In Prep Window","塢期最擠月(艘)":"Peak Dock Month",
  "需行動船 / 總船數":"Ships to Act / Total","待辦群組(合併同窗)":"Task Groups",
  // 表頭
  "狀態":"Status","船名 / IMO":"Vessel / IMO","管理公司":"Management","船型 · TEU":"Type · TEU",
  "限令":"Conditions","緊迫度":"Urgency","船舶":"Vessel","檢驗 / 項目":"Survey / Item",
  "核發":"Issuer","到期 / 窗口":"Due / Window","負責":"Responsible","行動 lead time":"Lead Time",
  "檢驗項目":"Survey Item","窗口 / 到期":"Window / Due","距今":"From Today",
  // 狀態詞
  "逾期":"Overdue","已到期":"Overdue","90天內":"Due ≤90d","排程中":"Scheduled","開窗中":"Window Open",
  "窗口開啟":"Window Open","已過窗":"Window Passed","90天內開窗":"Opens ≤90d","正常":"OK",
  "終身/一次性":"No Expiry","船級":"Class","法定":"Statutory","全部":"All",
  // 圖例 / 控制
  "選擇船舶 SELECT VESSEL":"SELECT VESSEL","按船":"By Ship","按時間":"By Time",
  "核發別":"Issuer","排序":"Sort","健康燈":"Health","船名":"Vessel",
  "總噸位 GT":"Gross Tonnage (GT)","總運力 TEU":"Total TEU","運力 TEU":"TEU",
  "X 軸(船舶大小)":"X-Axis (Size)","塢檢":"Docking","特別檢驗":"Special Survey","換證":"Renewal",
  "中間檢":"Intermediate","中間檢窗口":"Intermediate Window","鍋爐":"Boiler","尾軸":"Tail Shaft",
  "吊車徹檢":"Crane Thorough Exam","吊車負荷試驗":"Crane Load Test","吊車負荷":"Crane Load Test",
  "特檢/換證":"Special / Renewal","今日":"Today","試算窗口":"Calculate",
  "船級社":"Class Society","船籍國(RO 代行)":"Flag State (via RO)",
  "點擊展開/收合":"Expand / Collapse","展開/收合":"Expand / Collapse"
};

/* ===== 語言引擎:走訪 DOM 文字節點翻譯,可來回切換 ===== */
let LANG = (function(){ try{ return localStorage.getItem("tsl_lang")||"zh"; }catch(e){ return "zh"; } })();
let busy=false;

function translateText(t){
  const k=t.trim(); if(!k) return null;
  if(DICT[k]) return t.replace(k, DICT[k]);
  return null;
}
function walk(root, toEn){
  const it=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const jobs=[]; let n;
  while((n=it.nextNode())){
    const p=n.parentNode;
    if(!p || p.nodeName==="SCRIPT" || p.nodeName==="STYLE") continue;
    if(toEn){
      const en=translateText(n.nodeValue);
      if(en!==null && !p.dataset_zh){ jobs.push([n,en,n.nodeValue]); }
    } else if(n.__zh!==undefined){ jobs.push([n,n.__zh,null]); }
  }
  jobs.forEach(([n,val,orig])=>{ if(orig!==null && n.__zh===undefined) n.__zh=orig; n.nodeValue=val; });
}
function applyLang(){
  if(busy) return; busy=true;
  try{ walk(document.body, LANG==="en"); }catch(e){}
  const b=document.getElementById("langBtn"); if(b) b.textContent = LANG==="en" ? "中文" : "EN";
  busy=false;
}
function toggleLang(){
  LANG = LANG==="en" ? "zh" : "en";
  try{ localStorage.setItem("tsl_lang",LANG); }catch(e){}
  if(LANG==="zh") location.reload();   // 還原最單純可靠
  else applyLang();
}

/* ===== 注入:語言鍵 + 版本徽章 ===== */
function injectChrome(){
  const host = document.querySelector(".topbar .tabs") || document.querySelector(".tabs");
  if(!host) return;
  if(document.getElementById("langBtn")) return;
  const wrap=document.createElement("span");
  wrap.style.cssText="display:inline-flex;align-items:center;gap:8px;margin-left:12px";
  wrap.innerHTML=
    `<button id="langBtn" title="中文 / English" style="background:var(--panelHi,#16283A);color:var(--ink,#EDF4F7);
      border:1px solid var(--cal,#8FB4D9);border-radius:7px;padding:6px 12px;font-size:11.5px;font-weight:800;
      cursor:pointer;font-family:inherit">EN</button>
     <span id="verBadge" title="版本紀錄 Version history" style="font-family:ui-monospace,Menlo,monospace;font-size:10px;
      color:var(--inkSoft,#A8BDCB);border:1px solid var(--grid,#2B4356);border-radius:6px;padding:4px 8px;cursor:pointer">
      v${SYSTEM.version}</span>`;
  host.parentNode.appendChild(wrap);
  document.getElementById("langBtn").addEventListener("click",toggleLang);
  document.getElementById("verBadge").addEventListener("click",showVersion);
}
function showVersion(){
  let m=document.getElementById("verModal");
  if(m){ m.remove(); return; }
  m=document.createElement("div"); m.id="verModal";
  m.style.cssText="position:fixed;inset:0;background:rgba(5,10,16,.72);z-index:999;display:flex;align-items:center;justify-content:center;padding:24px";
  const log=CHANGELOG.map(c=>
    `<div style="padding:9px 0;border-top:1px dashed var(--grid,#2B4356)">
       <div style="font-family:ui-monospace,Menlo,monospace;font-weight:800;color:var(--class,#3BD6A5)">v${c.v}
         <span style="color:var(--inkSoft,#A8BDCB);font-weight:400;font-size:11px;margin-left:8px">${c.d}</span></div>
       <ul style="margin:5px 0 0;padding-left:18px;color:var(--inkSoft,#A8BDCB);font-size:12px;line-height:1.65">
         ${c.notes.map(n=>"<li>"+n+"</li>").join("")}</ul>
     </div>`).join("");
  m.innerHTML=`<div style="background:var(--panel,#111F2C);border:1px solid var(--grid,#2B4356);border-radius:14px;
      padding:20px 24px;max-width:680px;max-height:80vh;overflow:auto;color:var(--ink,#EDF4F7);
      font-family:'Noto Sans TC','PingFang TC',sans-serif">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:14px">
        <div><div style="font-size:10px;font-weight:800;letter-spacing:.2em;color:var(--cal,#8FB4D9)">VERSION / 版本紀錄</div>
        <div style="font-size:19px;font-weight:900;margin-top:2px">${SYSTEM.name}</div></div>
        <button id="verClose" style="background:none;border:1px solid var(--grid,#2B4356);color:var(--inkSoft,#A8BDCB);
          border-radius:7px;padding:5px 11px;cursor:pointer;font-size:12px">✕</button>
      </div>
      <div style="font-size:12px;color:var(--inkSoft,#A8BDCB);margin:8px 0 4px;font-family:ui-monospace,Menlo,monospace">
        目前版本 v${SYSTEM.version} · ${SYSTEM.released} · ${SYSTEM.stage} · ${SYSTEM.schema}<br>${SYSTEM.credit||""}</div>
      ${log}</div>`;
  document.body.appendChild(m);
  document.getElementById("verClose").addEventListener("click",()=>m.remove());
  m.addEventListener("click",e=>{ if(e.target===m) m.remove(); });
}

/* ===== 頁面重繪後自動重新套用語言 ===== */
function observe(){
  const mo=new MutationObserver(()=>{ if(LANG==="en" && !busy) applyLang(); });
  mo.observe(document.body,{childList:true,subtree:true});
}

function boot(){
  injectChrome();
  if(LANG==="en") applyLang();
  observe();
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot);
else boot();

window.TSL_SYSTEM=SYSTEM;
window.TSL_CHANGELOG=CHANGELOG;
window.TSL_DICT=DICT;
})();
