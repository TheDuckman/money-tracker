<template>
  <v-card class="my-2">
    <v-card-text class="d-flex justify-center align-center pa-0">
      <v-btn variant="text" icon @click="previousMonth">
        <v-icon>mdi-arrow-left-drop-circle-outline</v-icon>
      </v-btn>
      <div style="min-width: 200px" class="d-flex justify-center">
        <h2 :class="mobile ? 'text-subtitle-1' : ''">
          <v-icon>mdi-calendar-month</v-icon>
          {{ currentMonth }}
        </h2>
      </div>
      <v-btn variant="text" icon @click="nextMonth">
        <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";

const store = useStore();
const { selectedDate } = storeToRefs(store);
const currentMonth = computed(() => {
  return selectedDate.value.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
});
const previousMonth = computed(() => store.previousMonth);
const nextMonth = computed(() => store.nextMonth);

// display
const { mobile } = useDisplay();
</script>
