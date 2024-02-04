<template>
  <v-card class="my-2">
    <v-card-text>
      <v-alert
        :color="balanceColor"
        variant="tonal"
        density="compact"
        class="font-weight-bold"
      >
        <div class="d-flex justify-space-between">
          <div class="text-h6">Balance:</div>
          <div class="text-h6">{{ balanceFormatted }}</div>
        </div>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { filterFormatCurrency } from "../../utils/functions";
import { RecordTypes } from "@/utils/enums";
import { sumBy } from "lodash";

const store = useStore();

// record
const expenseRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.EXPENSE),
);
const incomeRecords = computed(() =>
  store.geSelectedMonthRecordsByType(RecordTypes.INCOME),
);

// balance
const balance = computed(
  () =>
    sumBy(incomeRecords.value, "amount") -
    sumBy(expenseRecords.value, "amount"),
);
const balanceFormatted = computed(() => filterFormatCurrency(balance.value));
const balanceColor = computed(() => (balance.value >= 0 ? "green" : "red"));
</script>
