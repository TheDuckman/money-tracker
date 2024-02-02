<template>
  <div>
    <v-btn icon @click="dialogState = true" color="error">
      <v-icon size="large">mdi-cash-minus</v-icon>
    </v-btn>
    <BaseDialog
      title="New Expense"
      icon="mdi-cash-minus"
      :dialogState="dialogState"
      @close-dialog="dialogState = false"
      @update:modelValue="dialogState = $event"
    >
      <!-- CATEGORY & DATE-->
      <template #text-1>
        <h3>Date</h3>
        <v-container fluid>
          <BaseDatePicker @date-changed="updateDate" />
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
      </template>
      <!-- AMOUNT -->
      <template #text-2>
        <v-slide-y-transition>
          <div v-if="selectedCategory">
            <v-divider class="mb-4"></v-divider>
            <h3>Enter amount</h3>
            <v-container fluid>
              <v-text-field
                v-model="amount"
                type="number"
                prefix="$"
                variant="solo-filled"
                single-line
              ></v-text-field>
            </v-container>
            <v-divider></v-divider>
          </div>
        </v-slide-y-transition>
      </template>
      <template #actions>
        <v-slide-y-transition>
          <v-btn v-if="selectedCategory" color="success" size="x-large"
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

// amount
const amount = ref(0);

// date
const date = ref(new Date());
const updateDate = function (newDate: Date) {
  date.value = newDate;
};
</script>
