# ClassNK 檢驗縮寫與代碼註解

> 供海技/工務核對 NK Survey Status、Survey History、Hull Compartment Survey Records 之用。
> 標「＊」者為 NK 台帳常見但定義依 NK 內部標記，若與現行規範有出入，以 ClassNK 現行版為準。

---

## 一、機損檢驗系統(本系統 P4「計畫機損檢驗明細」對應此欄)

| 縮寫 | 全稱 | 說明 |
|---|---|---|
| **CMS** | Continuous Machinery Survey | 循環(連續)機損檢驗。機械項目分攤於 5 年週期輪檢,每年約檢 1/5,而非一次全開。本系統匯入的逐項明細即此制:每項有各自 Due/Last。 |
| **PMS** | Planned Maintenance Scheme | 計畫保養認可制度。以電腦化保養系統＋輪機長(CE)授權開缸紀錄＋年度確認檢驗,取代驗船師逐項到場。需船級社型式認可、CE 持適任證書。 |
| **CBM** | Condition Based Maintenance | 狀態基準保養。以振動/油液/溫度等狀態監測資料判定保養時機。 |

> **CMS 與特檢的關係**:多數本隊船的 CMS 逐項 Due 與「特別檢驗(SS)」同日整批(如全 103 項 due 2028-xx),表示上次特檢一次做完、下輪特檢再整批做;少數老船(如 TS SYDNEY)為分散到期,需逐項對照 CE 的 PMS 紀錄。

---

## 二、檢驗類型(Survey Status / Survey History 主種類)

| 縮寫 | 全稱 | 中文 |
|---|---|---|
| **SS** | Special Survey | 特別檢驗(5 年換級,測厚/開缸大檢) |
| **IS** | Intermediate Survey | 中間檢驗(第 2–3 年) |
| **AS** | Annual Survey | 年度檢驗(每年±3 月窗) |
| **OS** | Occasional Survey | 臨時檢驗(損壞、改裝、特殊情況臨時申請) |
| **DS** | Docking Survey | 塢內檢驗 |
| **DI** ＊ | Docking Survey(In‑water/Intermediate) | 塢內(水下/中間)檢驗 |
| **BS1 / BS2** | Boiler Survey No.1 / No.2 | 第 1／第 2 鍋爐檢驗 |
| **PS1** | Propeller Shaft Survey No.1 | 第 1 尾軸檢驗(PS1 incl.15Y＝含 15 年制) |
| **CS** | Classification Survey | 入級檢驗(新造初次) |
| **RMS** ＊ | Renewal Machinery Survey | 機損換證檢驗 |
| **PP1 / PS1** ＊ | Propeller Shaft | 尾軸相關 |

---

## 三、檢驗項目動作代碼(如 `LL(AS)`、`CHG(TE)` 括號內)

證書/項目後方括號,表示該次靠船對「該項」執行的檢驗種類:

| 代碼 | 意義 |
|---|---|
| **(IN)** | Initial 初次檢驗(新造發證) |
| **(RG)** | Registration 初次登錄/註冊 |
| **(AS)** | Annual 年檢 |
| **(IS)** | Intermediate 中間檢 |
| **(PS)** | Periodical 定期檢(常見於 SR 無線電) |
| **(RS)** | Renewal 換證檢驗 |
| **(OS)** | Occasional 臨時檢 |
| **(TE)** | Thorough Examination 徹底檢查(起重設備 CHG 年度) |
| **(LT)** | Load Test 負荷試驗(起重設備 5 年) |
| **(RE)** ＊ | Re‑examination/Re‑registration 複驗/重登錄 |
| **(X)** ＊ | 該次靠船已就該項執行/完成之標記 |

> 常見證書縮寫:LL 載重線、SC 構造、SE 設備、SR 無線電、DG 危險品、OPP 防油污(MARPOL I)、SPP 防汙水(IV)、APP 防空污(VI)、BWM 壓載水、IHM 有害物質、AFS 防污底、EE 能效、CHG 貨物起重設備、M0 無人機艙。

---

## 四、船體艙檢驗記錄(Hull Compartment Survey Records)

### 4.1 欄位代碼(每個檢驗日期下的 6 個細欄)

| 代碼 | 全稱 | 說明 |
|---|---|---|
| **EX** | Examination | 是否進行內部檢查(常以 X／O 標示) |
| **PT** | Pressure Test | 壓水/氣密測試 |
| **RT** | (Ultrasonic) Thickness Measurement | 鋼板超音波測厚(依 NK 此表定義為測厚) |
| **CC** | Coating Condition | 塗層(防蝕漆)狀態評級 |
| **S** | Structural Condition | 艙體鋼板與骨架結構狀況 |
| **A** | Action Taken / Remarks | 後續處理/註記(是否列入 Memorandum 追蹤) |

### 4.2 塗層/結構狀態評級(CC 與 S 欄)

| 評級 | 意義 | 後果 |
|---|---|---|
| **G** | Good 良好 | 塗層僅極輕微斑剝,狀況穩定。 |
| **F** | Fair 普通 | 局部失效、局部生鏽(localized rust spot)。 |
| **P** | Poor 不良 | 塗層嚴重失效、大面積生鏽或硬銹(hard scale)。**評為 Poor,船級社通常要求每年強制檢查(annual examination)。** |

### 4.3 常見艙名縮寫

| 縮寫 | 全稱 | 中文 |
|---|---|---|
| **F.P.T.** | Fore Peak Tank | 首尖艙 |
| **A.P.T.** | Aft Peak Tank | 尾尖艙 |
| **U.W.B.T.** | Upper Wing Ballast Tank | 上翼邊壓載水艙 |
| **(C) / (P) / (S)** | Centre / Port / Starboard | 中／左舷／右舷 |

> 位置以 Frame(肋骨號)標示,例:`Frame 50 - 60`＝第 50 至 60 號肋骨之間。

---

## 五、狀態旗標(本系統與 NK 台帳)

- **●** = NK 標示之 next due(下一到期節點);後綴 **●30／●90** = 距到期已進入 30／90 天預警窗。
- 本系統三段燈:灰=排程中、琥珀(不閃)=90 天內/準備期、紅(閃)=到期/逾期。
- **Postponed** = 經旗國核准展延之硬期限,本系統以展延後日期為準。
- **Out of Use** = 該設備停用(如 SYDNEY 之 Davit),不列入到期追蹤。

---

_版本對應:fleet monitor v0.9.9 起。內容依 ClassNK 台帳與 IACS 統一要求整理;實際定義以 ClassNK 現行規範為準。_
