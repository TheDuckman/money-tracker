<template>
  <template v-if="records.length > 0">
    <GChart type="BarChart" :data="chartData" :options="chartOptions"></GChart>
  </template>
  <template v-else>
    <NoDataDiv icon="mdi-chart-bar" />
  </template>
</template>

<script setup lang="ts">
import { computed, reactive, defineProps } from "vue";
import { sumBy } from "lodash";
import { GChart } from "vue-google-charts";
import { useStore } from "../../store";
import { IncomeHexColors } from "@/utils/enums";
import { GoogleChartOptions } from "vue-google-charts/dist/types";
import { RecordData } from "@/utils/types";
import { filterFormatCurrency } from "@/utils/functions";

const props = defineProps({
  records: {
    type: Array,
    default: () => [],
  },
});
const store = useStore();
const records = computed(() => props.records);
const incomeColors = computed(() => {
  return store.incomeCategories.map((el) => {
    return IncomeHexColors[el.color as keyof typeof IncomeHexColors];
  });
});
const expenseData = computed(() => {
  const data: any = [];
  store.incomeCategories.forEach((cat) => {
    const sum = sumBy(
      records.value.filter((el) => (el as RecordData).category === cat.name),
      "amount",
    );
    data.push([
      cat.name,
      sum,
      `color: ${IncomeHexColors[cat.color as keyof typeof IncomeHexColors]}; stroke-width: 1; stroke-color: white;`,
      filterFormatCurrency(sum),
    ]);
  });
  return data;
});
const chartData = [
  ["Category", "Total", { role: "style" }, { role: "annotation" }],
  ...expenseData.value,
];
const chartOptions = reactive<GoogleChartOptions>({
  legend: { position: "none" },
  height: 450,
  backgroundColor: "transparent",
  vAxis: {
    title: "Total amount",
    textStyle: { color: "white" },
    gridlines: {
      color: "transparent",
    },
  },
  hAxis: {
    title: "Category",
    textStyle: { color: "white" },
    gridlines: {
      color: "transparent",
    },
  },
});
</script>
