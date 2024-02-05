<template>
  <AlterRecordDialog
    :dialogState="dialog"
    @close-dialog="dialog = false"
    :record="selectedRecord"
  />
  <v-expansion-panels class="my-4" multiple>
    <v-expansion-panel v-for="category in categories" :key="category.name">
      <v-expansion-panel-title>
        <v-icon :color="category.color" class="mr-4">{{
          category.icon
        }}</v-icon>
        {{ category.name }}
        <v-spacer></v-spacer>
        <div class="mr-3">
          <v-chip
            density="compact"
            label
            :class="`text-${category.color} font-weight-bold`"
            >{{ totalByCategory(category.name) }}</v-chip
          >
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list lines="one">
          <v-list-item
            v-for="rec in filterRecords(category.name)"
            :key="rec.id"
            @click="openFormDialog(rec)"
          >
            <v-list-item-title>
              <div class="d-flex">
                <v-icon>mdi-circle-small</v-icon> {{ rec.description }}
                <v-spacer></v-spacer>
                <div :class="`text-${category.color} font-weight-medium`">
                  {{ filterFormatCurrency(rec.amount) }}
                </div>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              <v-icon size="x-small">mdi-calendar-month</v-icon>
              {{ new Date().toDateString() }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { sumBy } from "lodash";
import { CategoryData, RecordData } from "@/utils/types";
import { filterFormatCurrency } from "@/utils/functions";

const props = defineProps({
  categories: {
    type: Array<CategoryData>,
    default: () => [],
  },
  records: {
    type: Array<RecordData>,
    default: () => [],
  },
  sumColor: {
    type: String,
    default: null,
  },
});
const categories = computed(() => props.categories);
const records = computed(() => props.records);
const totalByCategory = function (category: string) {
  return filterFormatCurrency(sumBy(filterRecords(category), "amount"));
};
const filterRecords = function (category: string) {
  return records.value.filter((rec) => rec.category === category);
};

// form dialog
const dialog = ref(false);
const selectedRecord = ref<RecordData | null>(null);
const openFormDialog = function (record: RecordData) {
  selectedRecord.value = record;
  dialog.value = true;
};
</script>
