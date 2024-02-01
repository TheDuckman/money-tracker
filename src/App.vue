<template>
  <v-app>
    <v-main>
      <TheAppBar />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheAppBar from "./components/TheAppBar.vue";

export default defineComponent({
  components: {
    TheAppBar,
  },
});
</script>
