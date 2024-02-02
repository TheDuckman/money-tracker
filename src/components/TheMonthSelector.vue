<template>
  <div class="d-flex justify-center align-center mb-4">
    <v-btn variant="text" icon size="x-large">
      <v-icon size="x-large">mdi-arrow-left-drop-circle-outline</v-icon>
    </v-btn>
    <div class="text-h4 mx-6">
      <v-icon>mdi-calendar-month</v-icon>
      {{ currentMonth }}
    </div>
    <v-btn variant="text" icon size="x-large">
      <v-icon size="x-large">mdi-arrow-right-drop-circle-outline</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const currentMonth = computed(() => {
  const d = new Date();
  return d.toLocaleString("default", { month: "long", year: "numeric" });
});
</script>
