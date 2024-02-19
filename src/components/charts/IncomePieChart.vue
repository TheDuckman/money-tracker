<template>
  <template v-if="records.length > 0">
    <GChart type="PieChart" :data="chartData" :options="chartOptions"></GChart>
  </template>
  <template v-else>
    <NoDataDiv icon="mdi-chart-pie" />
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
const incomeData = computed(() => {
  const data: any = [];
  store.incomeCategories.forEach((cat) => {
    data.push([
      cat.name,
      sumBy(
        records.value.filter((el) => (el as RecordData).category === cat.name),
        "amount",
      ),
    ]);
  });
  return data;
});
const chartData = [["Category", "Total"], ...incomeData.value];
const chartOptions = reactive<GoogleChartOptions>({
  // title: "Income",
  colors: incomeColors.value,
  // width: "100%" as any,
  height: 450,
  backgroundColor: "transparent",
  is3D: true,
  titleTextStyle: {
    color: "#fff",
    fontSize: 25,
    bold: true,
    italic: false,
  },
  legend: { textStyle: { color: "white" }, position: "bottom" },
});
</script>
