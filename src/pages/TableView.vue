<template>
  <BaseReportPage
    icon="mdi-table"
    color="blue"
    title="Table View"
    leftIcon="mdi-cash-minus"
    leftColor="red"
    leftTitle="Expenses"
    rightIcon="mdi-cash-plus"
    rightColor="green"
    rightTitle="Income"
  >
    <template #left>
      <RecordsExpansionPanels
        :categories="expensesCategories"
        :records="expenseRecords"
        sumColor="red"
      />
    </template>
    <template #right>
      <RecordsExpansionPanels
        :categories="incomeCategories"
        :records="incomeRecords"
        sumColor="green"
      />
    </template>
  </BaseReportPage>
</template>
<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import { RecordTypes } from "@/utils/enums";

const store = useStore();

// categories
const expensesCategories = computed(() => store.expensesCategories);
const incomeCategories = computed(() => store.incomeCategories);

// record
const expenseRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.EXPENSE),
);
const incomeRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.INCOME),
);
</script>
