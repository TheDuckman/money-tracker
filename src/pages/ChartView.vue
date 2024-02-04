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
        :records="expenseRecords"
      />
      <ExpensesBarChart v-else :records="expenseRecords" />
    </template>
    <template #right>
      <ChartTypeButtons
        :chartType="incomeChartType"
        @change-chart="incomeChartType = $event"
      />
      <IncomePieChart
        v-if="incomeChartType === ChartTypes.PIE"
        :records="incomeRecords"
      />
      <IncomeBarChart v-else :records="incomeRecords" />
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
const expenseRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.EXPENSE),
);
const incomeRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.INCOME),
);
</script>
