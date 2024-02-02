<template>
  <div>
    <v-btn icon @click="toggleDialog(true)" color="red">
      <v-icon size="large">mdi-cash-minus</v-icon>
    </v-btn>
    <BaseDialog
      title="New Expense"
      icon="mdi-cash-minus"
      :dialogState="dialogState"
      @close-dialog="toggleDialog(false)"
      @update:modelValue="toggleDialog($event)"
    >
      <!-- CATEGORY & DATE-->
      <template #text-1>
        <h3>Date</h3>
        <v-container fluid>
          <BaseDatePicker @date-changed="updateDate" />
          <v-divider class="mt-3"></v-divider>
        </v-container>
        <h3>Select category</h3>
        <v-container fluid>
          <v-row>
            <v-col
              cols="4"
              v-for="(item, i) in expensesCategories"
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
            <h3>Enter amount</h3>
            <v-container fluid>
              <v-divider class="mb-3"></v-divider>
              <v-container fluid>
                <v-text-field
                  v-model="amount"
                  type="number"
                  prefix="$"
                  variant="solo-filled"
                  single-line
                  hide-details
                ></v-text-field>
              </v-container>
            </v-container>
          </div>
        </v-slide-y-transition>
      </template>
      <!-- BUTTONS -->
      <template #actions>
        <v-slide-y-transition>
          <v-btn
            v-if="selectedCategory"
            color="success"
            size="x-large"
            @click="createExpense"
            >Ok</v-btn
          >
        </v-slide-y-transition>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useStore } from "../../store";
interface CategoryOption {
  name: string;
  color: string;
  icon: string;
  selected: boolean;
}
const store = useStore();

// dialog
const dialogState = ref(false);
const toggleDialog = function (val: boolean) {
  dialogState.value = val;
  if (!val) {
    clearData();
  }
};

// category
const expensesCategories: CategoryOption[] = reactive(
  store.expensesCategories.map((el) => {
    return {
      selected: false,
      ...el,
    };
  }),
);
const selectedCategory = computed(() =>
  expensesCategories.find((el) => el.selected),
);
const selectCategory = function (selectedCategory: CategoryOption) {
  expensesCategories.forEach((cat) => {
    if (cat.name === selectedCategory.name) {
      cat.selected = true;
    } else {
      cat.selected = false;
    }
  });
};
const resetCategories = function () {
  expensesCategories.forEach((cat) => {
    cat.selected = false;
  });
};

// amount
const amount = ref(0);

// date
const date = ref(new Date());
const updateDate = function (newDate: Date) {
  date.value = newDate;
};

// whole form
const clearData = function () {
  date.value = new Date();
  amount.value = 0;
  resetCategories();
};
const createExpense = function () {
  toggleDialog(false);
};
</script>
