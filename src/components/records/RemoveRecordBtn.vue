<template>
  <BaseDialog
    icon=""
    title="Confirm"
    :width="450"
    :dialogState="dialog"
    @close-dialog="dialog = false"
  >
    <template #default>
      <p>Remove record?</p>
      <div class="justify-space-between d-flex mt-5">
        <v-btn variant="tonal" color="red" @click="dialog = false">
          <v-icon class="mr-2">mdi-cancel</v-icon>
          No
        </v-btn>
        <v-btn variant="tonal" color="green" @click="removeRecord">
          <v-icon class="mr-2">mdi-check</v-icon>
          Yes
        </v-btn>
      </div>
    </template>
  </BaseDialog>
  <div class="justify-end d-flex">
    <v-btn size="small" variant="tonal" color="red" @click="dialog = true">
      <v-icon>mdi-delete</v-icon>
      Remove record
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import useEmitter from "@/composables/useEmitter";
import { useStore } from "@/store";
import { RecordData } from "@/utils/types";
import { computed } from "vue";
import { ref, defineProps, PropType, defineEmits } from "vue";
const props = defineProps({
  record: {
    type: Object as PropType<RecordData>,
    required: true,
  },
});
const store = useStore();
const emitter = useEmitter();
const emit = defineEmits(["record-removed"]);
const record = computed(() => props.record);
const dialog = ref(false);
const removeRecord = function () {
  store.removeRecord(record.value.id);
  emit("record-removed");
  emitter.emit("success-toast", "Record removed");
};
</script>
