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
      <ExpensesPieChart :records="filteredExpenseRecords" />
    </template>
    <template #right>
      <IncomePieChart :records="filteredIncomeRecords" />
    </template>
  </BaseReportPage>
</template>

<script setup lang="ts">
import { useStore } from "../store";
import { RecordTypes } from "@/utils/enums";
import { computed } from "vue";

const store = useStore();
// record
const records = computed(() => store.records);
const expenseRecords = computed(() =>
  records.value.filter((rc) => rc.type === RecordTypes.EXPENSE),
);
const incomeRecords = computed(() =>
  records.value.filter((rc) => rc.type === RecordTypes.INCOME),
);

const selectedDate = computed(() => store.selectedDate);
const filteredExpenseRecords = computed(() =>
  expenseRecords.value.filter((it) => {
    return it.date.getMonth() === selectedDate.value.getMonth();
  }),
);
const filteredIncomeRecords = computed(() =>
  incomeRecords.value.filter((it) => {
    return it.date.getMonth() === selectedDate.value.getMonth();
  }),
);
</script>
