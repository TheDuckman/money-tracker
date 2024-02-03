<template>
  <v-container>
    <h1><v-icon color="red">mdi-cash-minus</v-icon> New Expense</h1>
    <v-card class="mt-2">
      <v-card-text>
        <NewRecordTemplate color="red" :type="RecordTypes.EXPENSE" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { RecordTypes } from "../utils/enums";
</script>

<style lang="scss" scoped></style>
