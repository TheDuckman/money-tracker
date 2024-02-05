<template>
  <BaseDialog
    @close-dialog="$emit('close-dialog')"
    icon="mdi-pencil"
    title="Alter Record"
  >
    <template #default>
      <RecordForm
        color="red"
        :type="record.type"
        :record="record"
        @records-updated="$emit('close-dialog')"
        @cancel="$emit('close-dialog')"
      />
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { RecordData } from "@/utils/types";
import { PropType, defineEmits, defineProps } from "vue";
import { computed } from "vue";
const props = defineProps({
  record: {
    type: Object as PropType<RecordData>,
    default: null,
    required: false,
  },
});
const record = computed(() => props.record);
defineEmits(["close-dialog"]);
</script>
