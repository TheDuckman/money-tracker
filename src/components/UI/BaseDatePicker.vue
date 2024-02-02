<template>
  <v-text-field
    :value="formattedDate"
    readonly
    variant="solo-filled"
    single-line
  >
    <v-menu activator="parent" transition="slide-y-transition">
      <v-date-picker
        show-adjacent-months
        color="red"
        v-model="date"
        :max="today"
      />
    </v-menu>
  </v-text-field>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { computed, ref } from "vue";

const emit = defineEmits(["date-changed"]);
const today = new Date();
const date = ref(new Date());
const formattedDate = computed(() => date.value.toDateString());
watch(date, (newVal) => {
  emit("date-changed", newVal);
});

onMounted(() => {
  emit("date-changed", date);
});
</script>
