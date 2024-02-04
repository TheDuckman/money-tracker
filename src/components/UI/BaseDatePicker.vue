<template>
  <v-text-field
    :value="formattedDate"
    prepend-inner-icon="mdi-calendar-month"
    readonly
    variant="solo-filled"
    single-line
    hide-details
  >
    <v-menu activator="parent" transition="slide-y-transition">
      <v-date-picker
        show-adjacent-months
        :color="color"
        v-model="date"
        :max="today"
      />
    </v-menu>
  </v-text-field>
</template>

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { computed, ref } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["date-changed"]);

const color = computed(() => props.color);

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
