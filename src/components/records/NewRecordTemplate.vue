<template>
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
        cols="4"
        v-for="(item, i) in categoryOptions"
        :key="i"
        :value="item"
      >
        <v-btn
          @click="selectCategory(item)"
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
    <div v-if="selectedCategory">
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
    <v-container v-if="selectedCategory" class="justify-center d-flex">
      <v-btn
        :disabled="!formComplete"
        color="success"
        size="x-large"
        variant="tonal"
        @click="createExpense"
        >Ok</v-btn
      >
    </v-container>
  </v-slide-y-transition>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineProps } from "vue";
import { RecordTypes } from "../../utils/enums";
import { useStore } from "../../store";
import useEmitter from "@/composables/useEmitter";
import { vMaska } from "maska";
interface CategoryOption {
  name: string;
  color: string;
  icon: string;
  selected: boolean;
}

const props = defineProps({
  color: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
});
const color = computed(() => props.color);
const type = computed(() => props.type);
const store = useStore();
const emitter = useEmitter();

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
const selectCategory = function (selectedCategory: CategoryOption) {
  categoryOptions.forEach((cat) => {
    if (cat.name === selectedCategory.name) {
      cat.selected = true;
    } else {
      cat.selected = false;
    }
  });
};
const resetCategories = function () {
  categoryOptions.forEach((cat) => {
    cat.selected = false;
  });
};

// amount
const amount = ref("");
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
const createExpense = function () {
  store.addRecord(
    date.value,
    type.value,
    selectedCategory.value ? selectedCategory.value.name : "",
    numericAmount.value,
    description.value,
  );
  emitter.emit("success-toast", "New record created");
  clearData();
};
</script>
