<template>
  <v-app-bar :elevation="2">
    <v-container class="d-flex flex-row align-center">
      <v-app-bar-title>
        {{ title }}
      </v-app-bar-title>
      <v-spacer />
      <TheExpensesDialog />
      <v-btn icon @click="$emit('open-income-dialog')" color="green">
        <v-icon>mdi-cash-plus</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
const title = "Money Tracker";
</script>

<style scoped></style>
