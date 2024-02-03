<template>
  <v-container>
    <h1><v-icon color="green">mdi-cash-plus</v-icon> New Income</h1>
    <v-card class="mt-2">
      <v-card-text>
        <NewRecordTemplate color="green" :type="RecordTypes.INCOME" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { RecordTypes } from "../utils/enums";
</script>

<style lang="scss" scoped></style>
