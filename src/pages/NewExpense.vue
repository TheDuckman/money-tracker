<template>
  <v-container>
    <h1 class="d-flex flex-row">
      <v-icon color="red" class="mr-2">mdi-cash-minus</v-icon> New Expense
    </h1>
    <v-card class="mt-2">
      <v-card-text>
        <RecordForm color="red" :type="RecordTypes.EXPENSE" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { RecordTypes } from "../utils/enums";
</script>
