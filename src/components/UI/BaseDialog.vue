<template>
  <v-dialog width="600" v-model="dialog" scrollable>
    <v-card>
      <v-card-title primary-title class="d-flex align-center">
        <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn icon flat @click="$emit('close-dialog')">
          <v-icon size="large">mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <slot name="text-1"></slot>
      </v-card-text>
      <v-card-text v-if="$slots['text-2']">
        <slot name="text-2"></slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { watch, defineProps, computed, ref, defineEmits } from "vue";

defineEmits(["close-dialog"]);
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  dialogState: {
    type: Boolean,
    required: true,
  },
});

const title = computed(() => props.title);
const icon = computed(() => props.icon);

// State
const dialogState = computed(() => props.dialogState);
const dialog = ref(false);
watch(dialogState, (newVal) => {
  dialog.value = newVal;
});
</script>
