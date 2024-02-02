<template>
  <v-app>
    <v-main>
      <TheAppBar @open-expense-dialog="expenseDialog = true" />
      <v-container>
        <MonthPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
const expenseDialog = ref(false);
</script>
