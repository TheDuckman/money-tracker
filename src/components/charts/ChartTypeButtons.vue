<template>
  <div class="d-flex justify-center align-center mt-4">
    <v-btn-toggle>
      <v-btn
        variant="outlined"
        @click="changeChart(ChartTypes.BAR)"
        :active="chartType === ChartTypes.BAR"
      >
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>

      <v-btn
        variant="outlined"
        @click="changeChart(ChartTypes.PIE)"
        :active="chartType === ChartTypes.PIE"
      >
        <v-icon>mdi-chart-pie</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";
import { ChartTypes } from "@/utils/enums";

const emit = defineEmits(["change-chart"]);
const props = defineProps({
  chartType: {
    type: String,
    required: true,
  },
});
const chartType = computed(() => props.chartType);
const changeChart = function (type: string) {
  emit("change-chart", type);
};
</script>
