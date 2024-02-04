import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { uuid } from "vue-uuid";
import { CategoryData, RecordData } from "./utils/types";
import { RecordTypes } from "./utils/enums";

export const useStore = defineStore("store", () => {
  // date (workaround for date reactivity)
  const selectedDate = ref(new Date());
  const previousMonth = function () {
    selectedDate.value.setMonth(selectedDate.value.getMonth() - 1);
    const newDate = new Date(selectedDate.value.toDateString());
    selectedDate.value = newDate;
  };
  const nextMonth = function () {
    selectedDate.value.setMonth(selectedDate.value.getMonth() + 1);
    const newDate = new Date(selectedDate.value.toDateString());
    selectedDate.value = newDate;
  };

  // categories
  const expensesCategories = reactive<CategoryData[]>([
    {
      name: "Clothes",
      color: "deep-orange",
      icon: "mdi-lingerie",
    },
    {
      name: "Health",
      color: "red",
      icon: "mdi-hospital-box-outline",
    },
    {
      name: "Entertainment",
      color: "pink",
      icon: "mdi-party-popper",
    },
    {
      name: "House",
      color: "purple",
      icon: "mdi-home",
    },
    {
      name: "Sports",
      color: "deep-purple",
      icon: "mdi-weight-lifter",
    },
    {
      name: "Pets",
      color: "indigo",
      icon: "mdi-paw",
    },
    {
      name: "Groceries",
      color: "blue",
      icon: "mdi-cart-outline",
    },
    {
      name: "Eating out",
      color: "light-blue",
      icon: "mdi-silverware-variant",
    },
    {
      name: "Transport",
      color: "cyan-darken-2",
      icon: "mdi-bus-side",
    },
  ]);

  const incomeCategories = reactive<CategoryData[]>([
    {
      name: "Salary",
      color: "teal",
      icon: "mdi-cash",
    },
    {
      name: "Savings",
      color: "green",
      icon: "mdi-piggy-bank-outline",
    },
    {
      name: "Extras",
      color: "light-green-darken-1",
      icon: "mdi-medal-outline",
    },
  ]);

  // records
  const records = reactive<RecordData[]>([]);
  const addRecord = function (
    date: Date,
    type: string,
    category: string,
    amount: string,
    description: string,
  ) {
    records.push({
      id: uuid.v1(),
      date,
      type,
      category,
      amount: Number(amount),
      description,
    });
  };

  // fake data
  const getRandomCategory = function (type: string) {
    let index;
    if (type === RecordTypes.EXPENSE) {
      index = Math.floor(Math.random() * expensesCategories.length);
      return expensesCategories[index].name;
    } else {
      index = Math.floor(Math.random() * incomeCategories.length);
      return incomeCategories[index].name;
    }
  };
  const generateRecords = function (qty: number, type: string): void {
    const newRecords: RecordData[] = [];
    [...Array(qty)].forEach(() => {
      const category = getRandomCategory(type);
      const baseAmount = Math.random() * 500;
      newRecords.push({
        id: uuid.v1(),
        date: new Date(),
        type,
        category,
        amount: Number(baseAmount.toFixed(2)),
        description: uuid.v1(),
      });
    });
    records.push(...newRecords);
  };

  return {
    selectedDate,
    previousMonth,
    nextMonth,
    expensesCategories,
    incomeCategories,
    records,
    addRecord,
    generateRecords,
  };
});
