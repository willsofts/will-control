import Vue from "vue";
import DataPaging from "./controls/DataPaging.vue";
import DataTable from "./controls/DataTable.vue";
import InputDate from "./controls/InputDate.vue";
import InputMask from "./controls/InputMask.vue";
import InputMoney from "./controls/InputMoney.vue";
import InputNumber from "./controls/InputNumber.vue";
import InputTime from "./controls/InputTime.vue";
import LoadingPage from "./controls/LoadingPage.vue";
import PageHeader from "./controls/PageHeader.vue";

const Components = {
    DataPaging, DataTable, InputDate, InputMask, InputMoney, 
    InputNumber, InputTime, LoadingPage, PageHeader
}

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;
