<template>
  <BaseReportPage
    icon="mdi-chart-bar"
    color="orange"
    title="Chart View"
    leftIcon="mdi-cash-minus"
    leftColor="red"
    leftTitle="Expenses"
    rightIcon="mdi-cash-plus"
    rightColor="green"
    rightTitle="Income"
  >
    <template #left>
      <ExpensesPieChart :records="expenseRecords" />
    </template>
    <template #right>
      <IncomePieChart :records="incomeRecords" />
    </template>
  </BaseReportPage>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from "vue";
import { useStore } from "../store";
import { RecordData } from "@/utils/types";
import { RecordTypes } from "@/utils/enums";

const store = useStore();
let expenseRecords = reactive<RecordData[]>([]);
let incomeRecords = reactive<RecordData[]>([]);

onBeforeMount(() => {
  expenseRecords = store.generateRecords(25, RecordTypes.EXPENSE);
  incomeRecords = store.generateRecords(25, RecordTypes.INCOME);
});
</script>
