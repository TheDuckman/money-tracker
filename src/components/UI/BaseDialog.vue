<template>
  <v-dialog
    :width="width"
    v-model="dialog"
    scrollable
    @update:model-value="updateModelVal"
  >
    <v-card>
      <v-card-title primary-title class="d-flex align-center">
        <v-icon v-if="icon" class="mr-2" size="small">{{ icon }}</v-icon>
        {{ title }}
        <v-spacer></v-spacer>
        <v-btn icon flat @click="$emit('close-dialog')">
          <v-icon size="large">mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider />
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { watch, defineProps, computed, ref, defineEmits } from "vue";

const emit = defineEmits(["close-dialog"]);
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
  width: {
    type: Number,
    default: 700,
    required: false,
  },
});

const title = computed(() => props.title);
const icon = computed(() => props.icon);

// State
const dialogState = computed(() => props.dialogState);
const dialog = ref(false);
const updateModelVal = function (event: boolean) {
  dialog.value = event;
  if (!dialog.value) {
    emit("close-dialog");
  }
};
watch(dialogState, (newVal) => {
  dialog.value = newVal;
});
</script>
