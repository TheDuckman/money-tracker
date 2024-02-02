import { defineStore } from "pinia";
import { reactive, ref } from "vue";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useStore = defineStore("store", () => {
  const selectedMonth = ref(null);
  const expensesCategories = reactive<CategoryData[]>([
    {
      name: "Transport",
      color: "brown",
      icon: "mdi-bus-side",
    },
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

  return { selectedMonth, expensesCategories, incomeCategories };
});

interface CategoryData {
  name: string;
  color: string;
  icon: string;
}
