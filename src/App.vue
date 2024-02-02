<template>
  <v-app>
    <v-main>
      <TheAppBar />
      <v-container class="mt-4">
        <TheMonthSelector />
        <!-- TABS -->
        <v-tabs v-model="tab" bg-color="blue-grey" fixed-tabs>
          <v-tab value="month">
            <v-icon>mdi-table</v-icon>
            Table view
          </v-tab>

          <v-tab value="charts">
            <v-icon>mdi-chart-bar</v-icon>
            Chart view
          </v-tab>
        </v-tabs>
        <!-- WINDOWS -->
        <v-window v-model="tab">
          <v-window-item value="month">
            <TableView />
          </v-window-item>
          <v-window-item value="charts">
            <h2>TO DO</h2>
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
const tab = ref("month");
</script>
