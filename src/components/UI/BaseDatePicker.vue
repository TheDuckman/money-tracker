<template>
  <v-text-field
    :value="formattedDate"
    prepend-inner-icon="mdi-calendar-month"
    readonly
    variant="solo-filled"
    single-line
    hide-details
  >
    <v-menu
      v-model="menu"
      activator="parent"
      transition="slide-y-transition"
      :close-on-content-click="false"
    >
      <v-date-picker
        v-model="date"
        @update:modelValue="menu = false"
        show-adjacent-months
        :color="color"
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

const menu = ref(false);

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
