import { createRouter, createWebHistory } from "vue-router";
import { RouteItemTypes } from "./utils/enums";
import TableView from "./pages/TableView.vue";
import NewExpense from "./pages/NewExpense.vue";
import NewIncome from "./pages/NewIncome.vue";
import ChartView from "./pages/ChartView.vue";
import HomeView from "./pages/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/table",
      name: "TableView",
      component: TableView,
      meta: {
        icon: "mdi-table",
        title: "Table view",
        value: "table",
        color: "blue",
        type: RouteItemTypes.REPORTS,
      },
    },
    {
      path: "/chart",
      name: "ChartView",
      component: ChartView,
      meta: {
        icon: "mdi-chart-bar",
        title: "Chart View",
        value: "chart",
        color: "orange",
        type: RouteItemTypes.REPORTS,
      },
    },
    {
      path: "/expense",
      name: "NewExpense",
      component: NewExpense,
      meta: {
        icon: "mdi-cash-minus",
        title: "New expense",
        value: "expense",
        color: "red",
        type: RouteItemTypes.ACTIONS,
      },
    },
    {
      path: "/income",
      name: "NewIncome",
      component: NewIncome,
      meta: {
        icon: "mdi-cash-plus",
        title: "New income",
        value: "income",
        color: "green",
        type: RouteItemTypes.ACTIONS,
      },
    },
  ],
});

export default router;
