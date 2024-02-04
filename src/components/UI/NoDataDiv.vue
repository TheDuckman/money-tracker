<template>
  <div class="d-flex align-center justify-center flex-column">
    <v-icon size="200" class="giant-icon" color="grey-darken-3">{{
      icon
    }}</v-icon>
    <h1 class="text-grey-darken-2 text-h4" style="margin-bottom: 100px">
      - No data -
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
});
const icon = computed(() => props.icon);
</script>

<style scoped>
.giant-icon {
  margin-left: 110px;
  margin-right: 110px;
  margin-top: 110px;
}
</style>
