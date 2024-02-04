<template>
  <v-card class="my-2">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-alert
            :color="leftColor"
            variant="tonal"
            density="compact"
            class="font-weight-bold"
          >
            <div class="d-flex justify-space-between">
              <div class="text-h7">Total expenses:</div>
              <div class="text-h7">$ {{ expense }}</div>
            </div>
          </v-alert>
        </v-col>
        <v-col cols="6">
          <v-alert
            :color="rightColor"
            variant="tonal"
            density="compact"
            class="font-weight-bold"
          >
            <div class="d-flex justify-space-between">
              <div class="text-h7">Total income:</div>
              <div class="text-h7">$ {{ income }}</div>
            </div>
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <v-alert
            :color="balanceColor"
            variant="tonal"
            density="compact"
            class="font-weight-bold"
          >
            <div class="d-flex justify-space-between">
              <div class="text-h7">Balance:</div>
              <div class="text-h7">$ {{ balance }}</div>
            </div>
          </v-alert>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useStore } from "@/store";
import { RecordTypes } from "@/utils/enums";
import { sumBy } from "lodash";

const store = useStore();

const props = defineProps({
  leftColor: {
    type: String,
    required: true,
  },
  rightColor: {
    type: String,
    required: true,
  },
});
const balanceColor = "blue";
const leftColor = computed(() => props.leftColor);
const rightColor = computed(() => props.rightColor);

// record
const expenseRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.EXPENSE),
);
const incomeRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.INCOME),
);

// sums
const expense = computed(() =>
  sumBy(expenseRecords.value, "amount").toFixed(2),
);
const income = computed(() => sumBy(incomeRecords.value, "amount").toFixed(2));
const balance = computed(() =>
  (
    sumBy(incomeRecords.value, "amount") - sumBy(expenseRecords.value, "amount")
  ).toFixed(2),
);
</script>
