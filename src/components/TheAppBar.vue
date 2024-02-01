<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      title: "Money Tracker",
    };
  },
});
</script>

<style scoped></style>
