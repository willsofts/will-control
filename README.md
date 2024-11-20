# Vue Control

This is vue controls for vue application

## Installation

    npm install @willsofts/will-control

## How To Install
This package is under [@willsofts](https://github.com/willsofts) libraries protection as private access, then you have to gain access key and setting in your own environment before start installation from administrator. \
ex. \
Window

    set NPM_TOKEN=your access token key here

Linux

    export NPM_TOKEN=your access token key here

### InputDate

    <InputDate /> 

This control perform date input with calendar selection

### InputTime

    <InputTime />

This control perform time input with clock selection

### InputMask

    <InputMask picture="XXXXXX" />

This control perform force entry input with specified mask or picture 

| Mask | Description | Setting | Example |
| :--: | ----------- | ----------- | ----------- |
| 9 | Only numeric. | 99/99/9999 | 01/01/2004 |
| a | Alphabet (lower & upper case) and numeric | aaaaaaaaaa | Antique-12 |
| A | Alphabet upper case and numeric | AAAAAAAAAA | ANTIQUE |
| e | Alphabet (lower & upper case) | eeeeeeeeee | Antique |
| E | Alphabet upper case | EEEEEEEEEE | ANTIQUE |
| x | Alphabet (lower & upper case) and numeric with special sign | xxxxxxxxxx | Antique@12 |
| X | Alphabet upper case and numeric with special sign | XXXXXXXXXX | ANTIQUE@12 |
| T | Wild card entry but limit | TTTTTTTTTT | Antique@12 |
| * | Alphabet lower & upper case with numeric 0-9 | ********** | Antique123 |

This can defined length with mask in (?) before mask sign ex. (100)T that mean T 100 characters.

### InputNumber

    <InputNumber />

This control perform input numeric only

### InputMoney

    <InputMoney decimal="2" />

This control perform input numerice only with specified decimal as floating point value

### DataPaging

    <DataPaging :settings="pagingSettings" @page-select="pageSelected" />

This control perform data paging from DataTable data set

#### Paging Setting

```javascript
const pagingSettings = { page: 1, rowsPerPage: 10, totalRows: 0, totalPages: 1, limit: 10, offset: 10, rows: 0 };
```

#### On Page Selected

Using bind event `:page-select`

```javascript
    pageSelected(item) {
      console.log("page selected:",item);
      this.pagingSettings.page = item.page;
      let options = this.getPagingOptions();
      //make call api to collect data
      this.collecting(options,this.filters);
    },
    getPagingOptions(settings) {
      if(!settings) settings = this.pagingSettings;
      return {page: settings.page, limit: settings.limit, rowsPerPage: settings.rowsPerPage, orderBy: settings.orderBy?settings.orderBy:"", orderDir: settings.orderDir?settings.orderDir:"" };
    },
```

### DataTable

    <DataTable ref="dataTable" :settings="tableSettings" :labels="labels" :dataset="dataset" @data-select="dataSelected" @data-sort="dataSorted" :formater="formatData" />

This control perform data table with data set

#### DataTable Setting

```javascript
const tableSettings = {
    sequence: { label: "seqno_label" },
    columns: [
        {name: "account", type: "STRING", sorter: "account", label: "account_head", css: "text-center" },
        {name: "amount", type: "DECIMAL", sorter: "amount", label: "amount_head", css: "text-right" },
        {name: "age", type: "INTEGER", sorter: "age", label: "age_head", css: "text-center" },
        {name: "gender", type: "STRING", sorter: false, label: "gender_head", css: "text-center", unescape: true },
        {name: "effectdate", type: "DATE", sorter: "effectdate", label: "effectdate_head", css: "text-center" },
        {name: "effecttime", type: "TIME", sorter: "effecttime", label: "effecttime_head", css: "text-center" },
        {name: "title", type: "STRING", sorter: "title", label: "title_head", css: "text-left" }
    ],        
    actions: [
        {type: "button", action: "edit", css: "btn-edit fa-data-edit"},
        {type: "button", action: "delete", css: "btn-delete fa-data-delete"}
        {type: "button", action: "view", css: "btn-view fa-data-view"},
        {type: "a", action: "show", css: "fa-data-show", icon: "fa fa-eye"},
        { 
          render: function(record) { 
            return record.gender=="M" ? { type: "a", action: "view", css: "btn-view fa-data-view", icon: "fa fa-eye" } : {};
          }
        }
    ],
};
```
#### Table Setting Configuration

| Property | Type | Default | Description |
| -------- | ----------- | :-------: |----------- |
| sequence | boolean or Object label setting | `undefined` | To display sequence no. |
| columns | [ColumnSetting](#column-setting) | **required** | To defined colum setting. |
| actions | [ActionSetting](#action-setting) | `undefined` | To defined mark up actions. |
| defaultAction | boolean or string | `edit` | To defined default action when select row or `false` to disabled |


#### Column Setting

| Property | Type |  Default | Description |
| -------- | :----: | :----: | ----------- |
| name | string | **required** | Matching with json data set |
| type | string | **required** | Data type of data set. `STRING`, `DATE`, `TIME`, `DATETIME`, `INTEGER`, `DECIMAL` |
| sorter | string | `undefined` | Matching by json data set |
| label | string | **required**| Binding with json labels |
| css | string | `undefined` | css classes |
| unescape | boolean | false | true if you want to render html |

#### Action Setting

| Property | Type |  Default | Description |
| -------- | :----: | :----: | ----------- |
| type | string | **required** | HTML tag ex. button, a |
| action | string | **required** | To take action handler, reserved for `edit`, `delete`, `view` has own css style |
| css | string | `undefined` | css classes |
| icon | string | `undefined` | css class awesome font |
| render | Function | `undefined` | accept data item as parameter and return Action Setting required properties |


#### On Data Selected

Using bind event `:data-select`

```javascript
    dataSelected(item,action) {
      console.log("dataSelected",item,"action",action);
      this.$emit('data-select', item, action);
    },
```

#### On Data Sorted

Using bind event `:data-sort`

```javascript
    dataSorted(sorter,direction) {
      console.log("dataSorted",sorter,"direction",direction);
      this.pagingSettings.orderBy = sorter;
      this.pagingSettings.orderDir = direction;
      let options = this.getPagingOptions();
      //make call api to collect data
      this.collecting(options,this.filters);
    },
```

#### How To Custom Format Data In Table

Using property `:formater`

```javascript
    formatData(data,field,record) {
      if(field.name=="gender") {
        if("M"==data) {
          //return this.labels.male_label; //"Male";
          return '<em class="fa fa-male"></em>';
        } else if("F"==data) {
          //return this.labels.female_label; //"Female";
          return '<em class="fa fa-female"></em>';
        } else return data;  
      }
      //return default data format handler
      return this.$refs.dataTable.formatField(data,field,record);
    },    
```

By default data format in table depending on type of column definition with the following:

| Type | Format Output | Example |
| -------- | ----------- | ----------- |
| DATE | dd/MM/yyyy | 01/01/2024 |
| TIME | HH:mm:ss | 23:30:30 |
| DATETIME | dd/MM/yyyy HH:mm:ss | 01/01/2024 23:30:30 |
| INTEGER | #,### | 1,234 |
| DECIMAL | #,##0.00 | 1,234.50 |

