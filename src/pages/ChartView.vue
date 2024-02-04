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
      <ChartTypeButtons
        :chartType="expensesChartType"
        @change-chart="expensesChartType = $event"
      />
      <ExpensesPieChart
        v-if="expensesChartType === ChartTypes.PIE"
        :records="filteredExpenseRecords"
      />
      <ExpensesBarChart v-else :records="filteredExpenseRecords" />
    </template>
    <template #right>
      <ChartTypeButtons
        :chartType="incomeChartType"
        @change-chart="incomeChartType = $event"
      />
      <IncomePieChart
        v-if="incomeChartType === ChartTypes.PIE"
        :records="filteredIncomeRecords"
      />
      <IncomeBarChart v-else :records="filteredIncomeRecords" />
    </template>
  </BaseReportPage>
</template>

<script setup lang="ts">
import { useStore } from "../store";
import { ChartTypes, RecordTypes } from "@/utils/enums";
import { computed, ref } from "vue";

const store = useStore();

// chart
const expensesChartType = ref(ChartTypes.PIE);
const incomeChartType = ref(ChartTypes.PIE);

// record
const records = computed(() => store.records);
const expenseRecords = computed(() =>
  records.value.filter((rc) => rc.type === RecordTypes.EXPENSE),
);
const incomeRecords = computed(() =>
  records.value.filter((rc) => rc.type === RecordTypes.INCOME),
);
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

// date
const selectedDate = computed(() => store.selectedDate);
</script>
