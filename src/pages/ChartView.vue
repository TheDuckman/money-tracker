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
      <v-fade-transition>
        <ExpensesPieChart
          v-if="expensesChartType === ChartTypes.PIE"
          :records="expenseRecords"
        />
      </v-fade-transition>
      <v-fade-transition>
        <ExpensesBarChart
          v-if="expensesChartType === ChartTypes.BAR"
          :records="expenseRecords"
        />
      </v-fade-transition>
    </template>
    <template #right>
      <ChartTypeButtons
        :chartType="incomeChartType"
        @change-chart="incomeChartType = $event"
      />
      <v-fade-transition>
        <IncomePieChart
          v-if="incomeChartType === ChartTypes.PIE"
          :records="incomeRecords"
        />
      </v-fade-transition>
      <v-fade-transition>
        <IncomeBarChart
          v-if="incomeChartType === ChartTypes.BAR"
          :records="incomeRecords"
        />
      </v-fade-transition>
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
