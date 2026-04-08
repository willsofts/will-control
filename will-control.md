# will-control : Document Classes Usage

เอกสารฉบับนี้รวบรวมรายละเอียดของ Class, Vue Components, และ Functions ต่างๆ ที่อยู่ภายใต้โปรเจ็กต์ Base Control

## DataPaging

Vue Component สำหรับสร้างโครงสร้างตารางและปุ่มแสดง Navigation แบ่งหน้า (Pagination)

**Props:**
- settings : การตั้งค่าปัจจุบัน ผ่านโครงสร้าง [PageSettings](#pagesettings)
- css : ควบคุม style css ส่งผ่าน [PageCSS](#pagecss)

**Emits:**
- page-select (item)

**Methods:**
- clear() : ล้างค่าให้กลับสู่ค่าพื้นฐาน
- reset(newSettings) : รับค่า [PageSettings](#pagesettings) ตัวใหม่ แล้วนำค่าไป setup Model
- pageSelect(item) : รับพารามิเตอร์เป็น [PageModel](#pagemodel) ส่ง trigger event แจ้งเตือนไปยัง parent (ใช้ตอนโดนกดคลิกลิ้งค์ตัวหน้าใหม่) 

## DataTable

Vue Component สำหรับการวาดและแสดงผลข้อมูลตาราง (Data Grid) ขนาดใหญ่ได้ พร้อมสามารถแทรก Action Menu ในแถวสุดท้าย รวมถึงการกด header สำหรับ trigger เรียงของใหม่ในคอลัมน์ได้

**Props:**
- labels : Object ของ Localized Messages ต่างๆ บนจอ
- dataset : ข้อมูลทั้งหมดในตาราง ผ่านแบบโครงสร้าง [DataSet](#dataset)
- settings : โครงสร้าง [TableSettings](#tablesettings)
- formater : Function สำหรับเปิดช่องให้ override format display ของ property เวลาเรนเดอร์ใน td ถ้าไม่มีจะไปเรียก [formatDataTable](#ctrlutil)

**Emits:**
- data-select (item, action)
- data-sort (sorter, direction)

**Methods:**
- clear() : คืนค่าตัว offset pagination กลับค่าศูนย์ทั้งหมด
- reset(newData) : การใส่ข้อมูล row คืนและ set pagination [DataSet](#dataset) กลับ 
- dataSelect(item, action) : ดึงมาและส่ง emit trigger กลับด้วย data
- dataSort(item) : ทำการรับ Sort header item ที่เป็น attribute `sorter` มาสลับ `ASC` กับ `DESC` ตามครั้งที่สั่งและ emit callback วิ่งกลับไป
- formatData(data, field, record) : ใช้งาน Formatter แปลงข้อมูล พารามิเตอร์ `field` อ้างจาก [HeaderColumn](#headercolumn)

## InputDate

Vue Component สำหรับรับข้อมูล Input ของ Date/Time หรือแสดง control DatePicker (ปฏิทินที่อยู่กับ input element)

**Props:**
- modelValue : String
- id : String
- name : String
- disabled : String หรือ Boolean (เปิด-ปิด สถานะ)

**Methods:**
- focus() : เพื่อเลื่อน cursor ไปอยู่ที่ Input 
- showInputCalendar() : สั่งเปิด interface Calendar Popup
- clearInputCalendar() : คำสั่งให้เคลียร์วันที่
- updateInput(value) : method บังคับ set model data กลับของ Vue Component

## InputMask

Vue Component ผูกติดการ Format Mask string 

**Props:**
- modelValue : String
- id : String
- name : String
- disabled : String หรือ Boolean
- picture : String คือ Pattern string เช่น (099)999-999

**Methods:**
- focus() : เพื่อเลื่อน cursor 

## InputMoney

Vue Component กรอกตัวเลขและทำ auto formatter มี comma แบบจำนวนบัญชี (Monetary/Floating Number Input) 

**Props:**
- modelValue : String หรือ Number
- id : String
- name : String
- disabled : String หรือ Boolean
- decimal : String หรือ Number (กำหนดตำแหน่งจุดทศนิยมว่าจะอนุญาตได้กี่ค่า) ปกติค่า default = "2"

**Methods:**
- focus() : สั่งวาง cursor 

## InputNumber

Vue Component สำหรับรองรับตัวเลขแบบจำนวนเต็ม หรือ Number ที่ไม่มีจุด (Integer Value type only) 

**Props:**
- modelValue : String หรือ Number
- id : String
- name : String
- disabled : String หรือ Boolean

**Methods:**
- focus() : โฟกัส input

## InputTime

Vue Component รองรับ Clock Picker ในการช่วยกรอกข้อมูลเวลา 

**Props:**
- modelValue : String
- id : String
- name : String
- disabled : String หรือ Boolean

**Methods:**
- focus() : ทำโฟกัส cursor 

## LoadingPage

Vue Component กล่อง Layer คุม Loading Icon แบบ Spinner ใช้เวลาซ่อนข้อมูลและรอ Backend ส่งของมาเสร็จถึงบอกว่า hide

**Props:**
- visible : String หรือ Boolean
- animate : String หรือ Boolean แสดงภาพว่ามีการหมุน (Spin Effect)

## PageHeader

Vue Component ควบคุมส่วนจัดการแสดง Header ที่ด้านบนของโปรแกรม บอก ชื่อ Title หน้า, แสดง Menu และ ภาษา (Multi-Language selection) 

**Props:**
- pid : String
- labels : Object เก็บข้อความที่ map กับ field 
- visible : String หรือ Boolean ตัวเปิดโชว์ Header
- version : String ให้ทราบ Version
- viewVersion : String หรือ Boolean ซ่อนโชว์เมนูเวอร์ชัน
- showLanguage : String หรือ Boolean ให้แสดงรายการภาษาแบบปุ่มลิสไหม
- multiLanguages : Array แจ้งว่ามีภาษาใดบ้าง
- language : String รหัสภาษาที่เป็น current ปัจจุบัน
- build : String เวอร์ชันของ build number สุดท้าย
- showBuild : String หรือ Boolean
- alertBuild : String หรือ Boolean เปิดโชว์ alert แจ้งว่าใช้อะไรอยู่ 

**Emits:**
- show-version (pid, build)
- language-changed (lang)

**Methods:**
- showVersion() : ฟังก์ชันที่จะเรียก alert สำหรับโชว์รุ่นของซอฟต์แวร์ และทำ notify event ตามด้วย emit ตัว `show-version`
- changeLanguage(lang) : สั่งเลือก update เปลี่ยนภาษา และแจ้ง emit ด้วย `language-changed`

### DataSet
ข้อมูล Model ของ table ทั้งหมด 
- rows : Array ของ Object ของข้อมูล 
- offsets : ของมูลโครงสร้างแบ่งหน้า [PageSettings](#pagesettings)

### PageSettings
- page : number
- rowsPerPage : number
- totalRows : number
- totalPages : number
- limit : number
- offset : number
- rows : number

### PageModel
- page : number (เลขหน้าปัจจุบันของ object นั้น)
- text : string (ข้อความที่ใช้แสดงของ object นั้น)
- css : string

### TableSettings
โครงสร้างข้อมูลกำหนดรูปแบบการแสดงผลหน้า Desktop/Web สำหรับ DataTable
- autoFormat : boolean
- defaultAction : string
- tableCSS : string
- bodyCSS : string
- rowCSS : string
- headCSS : string
- headRowCSS : string
- headColCSS : string
- headSeqCSS : string
- headActionCSS : string
- actions : วัตถุแบบ Array ที่เก็บข้อมูลของ [HeaderAction](#headeraction)
- columns : วัตถุแบบ Array ที่เก็บข้อมูลของ [HeaderColumn](#headercolumn) (ใช้ใน DataTable)
- sequence : วัตถุที่สร้างลำดับแถว (ใช้ใน DataTable)

### HeaderAction
- type : string (เช่น 'button', 'a')
- action : string (เช่น 'edit', 'delete', 'view')
- css : string
- icon : string
- render : Function รับ row data (`item`) แล้วส่งคืนกลับเป็น HeaderAction เพื่อ override หน้าตาปุ่ม

### HeaderColumn
- type : string (เช่น 'DECIMAL', 'DATE', 'DATETIME')
- decimal : number (จำนวนจุดทศนิยม)
- name : string (ชื่อ property ของ data field)
- label : string (ป้ายกำกับของคอลัมน์)
- css : string (CSS สำหรับ td ของคอลัมน์)
- sorter : string (ชื่อ field หากรองรับการเรียงสลับข้อมูล)
- unescape : boolean (รองรับ render HTML หรือไม่)

### PageCSS
โครงสร้างข้อมูลกำหนดลักษณะ CSS
- ulCSS : string 
- liCSS : string 
- aCSS : string

---

## ctrl.util

เป็นแหล่งรวม Utility Functions สำหรับจัดการและควบคุมการแสดงผลของ Input Fields หรือ Form Controls

**Functions:**
- getControlClasses(attrClass, ...classes) : คืนค่า string สำหรับการแนบ class ให้กับ control
- clearCalendar(src) : เคลียร์ค่า DatePicker ของ input element
- openCalendar(src) : เปิดหน้าต่างเลือกวันที่ (DatePicker) ของ input element
- inputNumberOnly(element, event, decimal, isPlus) : ดักข้อมูล keystroke ให้พิมพ์ได้แค่ตัวเลข (และทศนิยม / เครื่องหมายลบ ขึ้นอยู่กับส่งพารามิเตอร์)
- checkInputNumberOnly(myfield, e, decimal, isPlus) : ทำหน้าที่เรียก `inputNumberOnly` พร้อมกับการจัดการ keyup attribute
- checkInputKey(myfield, event, decimal, maxvalue) : สำหรับการตรวจสอบ key ที่พิมพ์ และเรียกให้ฟอร์แมตตัวเลขใหม่ทันที
- formatNumber(element, maxvalue, decimal) : ฟอร์แมตตัวเลขใน input field ใส่เครื่องหมาย comma และจัดการตำแหน่งจุดทศนิยม
- putComma(data) : คืนค่า string ที่เป็นตัวเลขใส่ comma ปั่นคั่นหลักพัน
- clearComma(data) : คืนค่า string ที่ลบเครื่องหมาย comma ออกทั้งหมด
- getCaretPosition(ctrl) : ดึงตำแหน่งของ text cursor (caret) ออกมาจาก input field
- setCaretPosition(ctrl, iCaretPos) : รีเซ็ตตำแหน่ง text cursor (caret) ให้กับ input field
- parseNumber(avalue) : คืนค่าตัวเลขที่แปลงมาจาก string (ลบ comma ให้)
- formatFloating(avalue, decimal) : คืนค่า string ฟอร์แมตตัวเลขมีจุดทศนิยม
- formatDecimal(avalue, decimal, verifydecimal) : ฟอร์แมตทศนิยมตามระบุ
- ensureTableSetting(settings) : รับพารามิเตอร์เป็น [TableSettings](#tablesettings) คืนค่าออกมาเป็น [TableSettings](#tablesettings) ที่ตั้งค่าพื้นฐานครบถ้วน
- formatDataTable(data, field, record) : ดึงรูปแบบการแสดงผลของฟิลด์ในข้อมูลตาราง พารามิเตอร์ `field` คือ [HeaderColumn](#headercolumn)
- setupDraggable(control) : เซ็ต element ตัวนั้นให้ลากวางได้ 
- setupAutocomplete(control, options) : เรียกใช้ jQuery autocomplete บน control พร้อมส่ง option การตั้งค่า
- autocomplete(control, ...args) : ทำ autocomplete กับ control แบบรับ parameter ทั่วไป
## Paging

Class `Paging` ที่นำมาใช้คำนวณและตั้งค่าการทำงาน Pagination

- constructor(setting) : โหลดพารามิเตอร์ของ [PageSettings](#pagesettings)
- clear() : ล้างค่าทั้งหมดให้เริ่มใหม่ตามค่าตั้งต้น
- reset(setting) : ตั้งค่าใหม่ [PageSettings](#pagesettings)
- hasPaging(rows) : boolean ทราบว่าข้อมูลมีมากพอจนต้องทำหน้าต่างๆ ล้นเกิน 1 หน้าหรือไม่
- recordsOffset() : number ส่งคืนค่า offset คำนวณจาก page และ rowsPerPage 
- recordsNumber(seqno) : number แปลงลำดับแถวหน้าปัจจุบันเป็นลำดับแถวเต็มทั้งหมด
- buildPagingModel(opts) : คืนค่า Array ของ [PageModel](#pagemodel) ที่ใช้ในการสร้างส่วน Pagination Element

## random.util

Library สำหรับฟังก์ชันสุ่มชุดข้อมูล

### ตัวแปรค่าคงที่

| ตัวแปร | ค่า |
| --- | --- |
| ALPHABETS | Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") |
| NUMERICS | Array.from("0123456789") |

**Functions:**
- randomize() : number คืนค่าจาก random object จากอัลกอริทึมเข้ารหัสของ crypto array (Uint32Array)
- getRandomNumber(min, max) : number สุ่มตัวเลข ระหว่างค่า min ถึง max (ปกติ คือ 1-1000000)
- random(len, alphabets) : string สร้าง string เป็นตัวสุ่ม ด้วยความยาว len โดยมีรายการตัวหนังสือประกอบเป็นข้อมูล alphabets
- randomNumber(len, alphabets) : string สุ่มตัวเลขความยาวที่กำหนด เป็นชุด string ตัวเลขทั้งหมด

## Utilities

Class `Utilities` ที่รองรับ method ประเภทรวมมิตรสารพัดประโยชน์ เช่น Date, Time, Number Formatting เป็นต้น

### ตัวแปรค่าคงที่

| ตัวแปร | ค่า |
| --- | --- |
| NORMAL | 0 |
| INTER | 1 |
| SHORT | 0 |
| LONG | 1 |
| SHORT_MONTH_ARRAY | ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] |
| LONG_MONTH_ARRAY | ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] |
| SHORT_WEEK_DAY | ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] |
| LONG_WEEK_DAY | ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] |

**Functions:**
- getDateNow(now) : string คืนค่าวันที่เป็น format `dd/MM/yyyy` (จาก Date ที่ระบุ หรือ ปัจจุบัน)
- getTimeNow(now) : string คืนค่าเวลาเป็น format `HH:mm:ss`
- getDateTimeNow(now) : string คืนค่าเป็น format `dd/MM/yyyy HH:mm:ss`
- getYMD(now) : string คืนค่า Date เป็น format `yyyy-MM-dd`
- getDMY(now) : string คืนค่า Date เป็น format `dd/MM/yyyy`
- formatDate(now, ymd) : string จัดการ render format date ตามแฟล็ก ymd (default false คือ `dd/MM/yyyy`)
- formatTime(now) : string ดึง current time `HH:mm:ss`
- formatDateTime(now, ymd) : string รวม `formatDate` และ `getTimeNow` เข้าด้วยกัน 
- getHMS(now) : string ดึง string จากตัว Time แบบตรงไปตรงมา
- currentDate(now) : string คืนค่า date object เป็นแบบค่ามาตรฐาน `yyyy-MM-dd`
- currentTime(now) : string คืนค่าเวลาปัจจุบัน `HH:mm:ss`
- currentDateTime(now) : string รวม format `currentDate` กับ `currentTime` เข้าด้วยกัน (`yyyy-MM-dd HH:mm:ss`)
- currentTimeMillis(now) : number เวลาแปลงเป็นมิลลิวินาที (ms)
- addDays(days, date) : Date เอาไว้อบวก/ลบจำนวนวันในออบเจ็กต์ Date 
- compareDate(adate, bdate) : number ค่าคืนมาจะเป็น -1 (น้อยกว่า), 0 (เท่ากัน), 1 (มากกว่า) ของการเทียบเวลา
- compareTime(adate, bdate) : number คืนค่าเปรียบเทียบแค่ในส่วนของเวลา 
- compareDateTime(adate, bdate) : number เทียบระหว่าง DateObject
- compareString(astr, bstr) : number ฟังก์ชันเทียบข้อมูลระดับ string เทียบด้วย rules locale
- equalsIgnoreCase(astr, bstr) : boolean ให้ค่าความเทียบ string ไม่สนใจขนาดอักขระว่า True หรือ False
- isString(value) : boolean ดูว่า object นั้นๆ เป็น string หรือไม่ 
- parseInteger(dataValue, defaultValue) : number แปลงข้อมูล String เป็น Integer (หรือ Number พร้อมลบ comma ออกให้เสร็จสรรพ)
- parseFloat(dataValue, defaultValue) : number แปลง Float จาก string เหมือน Integer ด้านบน
- parseBoolean(dataValue, defaultValue) : boolean แปลงชนิด Boolean จาก String 
- parseDate(dataValue, defaultValue) : Date พยายามแปลง string หลากหลาย format ให้ออกมาเป็นโครงสร้าง Date Object ปลายทาง
- parseIsoDate(datestr) : Date ลองดึง ISO standard T และ Z (Zulu) time 
- parseCustomDate(datestr) : Date ทำการแปลง format พื้นบ้านที่นิยมมาเป็นวันที่เวลา 
- parseTime(dataValue, defaultValue) : Date แปลงเฉพาะข้อมูลเวลาจาก string format แบบ `HH:mm:ss` ให้ตัวแปร Date
- now() : Date ทำ factory สร้างรูปแบบปัจจุบัน
- translateVariables(template, variables) : string แทนค่า text template ด้วยข้อมูล parameters แบบ ${key} ใน format string ได้
- serializeTimestamp(now, delimiter, includeMillis) : string ทำ string stamp ประกอบด้วย yyyyMMddHHmmss หรือแบบมี ms ตามข้อมูล delimiter คั่นกลาง
- getFormatDate(date, fortype, delimiter, forstyle, separater) : string สามารถดึงเป็น Short Long ของเดือน ได้ (เช่น 15 Jan 2023)
- getShortDate(date, delimiter, forstyle) : string โชว์ month เป็น short text (`SHORT_MONTH_ARRAY`)
- getLongDate(date, delimiter, forstyle) : string โชว์ month เป็น long text (`LONG_MONTH_ARRAY`)
- getWeekDay(date, fortype) : string โชว์วันจันทร์ถึงอาทิตย์ 
- getShortWeekDay(date) : string โชว์วันแบบย่อ
- getLongWeekDay(date) : string โชว์วันแบบต็มคำ
- getFormatWeekDate(date, fortype, delimiter, forstyle, separater) : string โชว์ Date Format ควบกับชื่อวัน 
- date(input, defaultValue) : Date ส่งออก Date object จาก string format ตัวเลข ms
- hasValue(val) : boolean ฟังก์ชันดูลักษณะ String ค่าไม่ได้เป็น undefined หรือ null
