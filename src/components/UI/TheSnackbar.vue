<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    :min-height="60"
    :min-width="300"
    variant="tonal"
    location="top right"
    :color="color"
  >
    <div class="d-flex flex-row align-center">
      <v-icon class="mr-2">{{ icon }}</v-icon>
      {{ msg }}
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useEmitter from "@/composables/useEmitter";

const emitter = useEmitter();

const snackbar = ref(false);
const msg = ref("");
const icon = ref("");
const color = ref("");

onMounted(() => {
  emitter.on("success-toast", (toastText: string | null = null) => {
    msg.value = toastText || "Success!";
    icon.value = "mdi-check-circle-outline";
    color.value = "green";
    snackbar.value = true;
  });
});
</script>
