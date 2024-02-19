<template>
  <RemoveRecordBtn
    v-if="record"
    :record="record"
    @record-removed="recordRemoved"
  />
  <!-- DATE -->
  <h3>Date</h3>
  <v-container>
    <BaseDatePicker @date-changed="updateDate" :color="color" />
    <v-divider class="mt-3"></v-divider>
  </v-container>
  <!-- CATEGORY -->
  <h3>Category</h3>
  <v-container>
    <v-row>
      <v-col
        :cols="mobile ? 12 : 4"
        v-for="(item, i) in categoryOptions"
        :key="i"
        :value="item"
      >
        <v-btn
          @click="selectCategory(item.name)"
          :color="item.color"
          :prepend-icon="item.icon"
          stacked
          :variant="item.selected ? 'elevated' : 'tonal'"
          width="100%"
        >
          {{ item.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <!-- AMOUNT -->
  <v-slide-y-transition>
    <div v-if="selectedCategory" ref="amountDiv">
      <v-divider class="mb-3"></v-divider>
      <h3>Amount</h3>
      <v-container fluid>
        <v-text-field
          v-model="amount"
          prepend-inner-icon="mdi-currency-usd"
          variant="solo-filled"
          single-line
          hide-details
          v-maska:[options]
        >
        </v-text-field>
      </v-container>
      <v-divider class="mb-3"></v-divider>
      <h3>Description</h3>
      <v-container fluid>
        <v-text-field
          v-model="description"
          prepend-inner-icon="mdi-text"
          variant="solo-filled"
          single-line
          hide-details
        ></v-text-field>
      </v-container>
    </div>
  </v-slide-y-transition>
  <!-- BUTTONS -->
  <v-slide-y-transition>
    <v-container
      v-if="selectedCategory && !record"
      class="justify-center d-flex"
    >
      <v-btn
        :disabled="!formComplete"
        color="success"
        size="x-large"
        variant="tonal"
        @click="createRecord"
        >Ok</v-btn
      >
    </v-container>
    <v-container v-else-if="selectedCategory && record">
      <div :class="btnDivClass">
        <v-btn :size="btnSize" variant="tonal" @click="$emit('cancel')"
          >Cancel</v-btn
        >
        <v-btn
          :size="btnSize"
          variant="tonal"
          color="warning"
          @click="alterRecord"
        >
          Alter record
        </v-btn>
      </div>
    </v-container>
  </v-slide-y-transition>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  defineProps,
  PropType,
  defineEmits,
} from "vue";
import { RecordTypes } from "../../utils/enums";
import { RecordData } from "../../utils/types";
import { useStore } from "../../store";
import useEmitter from "@/composables/useEmitter";
import { vMaska } from "maska";
import { onMounted } from "vue";
import { useDisplay } from "vuetify";
import { nextTick } from "vue";
import { useRouter } from "vue-router";
interface CategoryOption {
  name: string;
  color: string;
  icon: string;
  selected: boolean;
}
const emit = defineEmits(["records-updated", "cancel"]);

const props = defineProps({
  color: {
    type: String,
    default: null,
    required: true,
  },
  type: {
    type: String,
    default: null,
    required: true,
  },
  record: {
    type: Object as PropType<RecordData>,
    default: null,
    required: false,
  },
});
const color = computed(() => props.color);
const type = computed(() => props.type);
const record = computed(() => props.record);
const store = useStore();
const emitter = useEmitter();
// display
const { mobile } = useDisplay();
const btnDivClass = computed(() =>
  mobile ? "justify-space-between d-flex" : "justify-space-around d-flex",
);
const btnSize = computed(() => (mobile ? "default" : "x-large"));

// category
const categories = computed(() => {
  if (RecordTypes.EXPENSE === type.value) {
    return store.expensesCategories;
  } else if (RecordTypes.INCOME === type.value) {
    return store.incomeCategories;
  }
  return [];
});
const categoryOptions: CategoryOption[] = reactive(
  categories.value.map((el) => {
    return {
      selected: false,
      ...el,
    };
  }),
);
const selectedCategory = computed(() =>
  categoryOptions.find((el) => el.selected),
);
const selectCategory = function (selectedCategory: string) {
  categoryOptions.forEach((cat) => {
    if (cat.name === selectedCategory) {
      cat.selected = true;
    } else {
      cat.selected = false;
    }
  });
  nextTick(() =>
    amountDiv.value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (amountDiv.value as any).scrollIntoView({ behavior: "smooth" })
      : null,
  );
};
const resetCategories = function () {
  categoryOptions.forEach((cat) => {
    cat.selected = false;
  });
};

// amount
const amount = ref("");
const amountDiv = ref(null);
const numericAmount = computed(() => Number(amount.value.replaceAll(",", "")));
const options = reactive({
  mask: "###,###.##",
  eager: true,
  reversed: true,
});

// description
const description = ref("");

// date
const date = ref(new Date());
const updateDate = function (newDate: Date) {
  date.value = newDate;
};

// whole form
const formComplete = computed(() => {
  return !!description.value && numericAmount.value > 0 && selectedCategory;
});
const clearData = function () {
  date.value = new Date();
  amount.value = "";
  description.value = "";
  resetCategories();
};
const createRecord = function () {
  store.addRecord(
    date.value,
    type.value,
    selectedCategory.value ? selectedCategory.value.name : "",
    numericAmount.value,
    description.value,
  );
  emitter.emit("success-toast", "New record created");
  clearData();
  goToTablePage();
};
const alterRecord = function () {
  store.alterRecord(
    record.value.id,
    date.value,
    type.value,
    selectedCategory.value ? selectedCategory.value.name : "",
    numericAmount.value,
    description.value,
  );
  emit("records-updated");
  emitter.emit("success-toast", "Record altered");
  clearData();
  goToTablePage();
};
const recordRemoved = function () {
  emit("records-updated");
  clearData();
};
const fillOutForm = function () {
  selectCategory(record.value.category);
  date.value = record.value.date;
  description.value = record.value.description;
  amount.value = record.value.amount.toFixed(2);
};

// redirect
const router = useRouter();
const goToTablePage = function () {
  router.push({ name: "TableView" });
};

// lifecycle hooks
onMounted(() => {
  if (record.value) {
    fillOutForm();
  }
});
</script>
