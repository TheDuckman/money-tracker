<template>
  <v-navigation-drawer v-model="drawer">
    <template v-if="!mobile">
      <v-list>
        <v-list-item prepend-avatar="@/assets/coin.png">
          <v-list-item-title class="text-orange"
            >Money Tracker</v-list-item-title
          >
          <v-list-item-subtitle>By Gabriel Pato</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
    </template>

    <v-list nav>
      <template v-for="rType in routeTypes" :key="rType">
        <v-list-subheader>{{ rType }}</v-list-subheader>
        <v-list-item
          v-for="route in routesByType(rType)"
          :key="route.name"
          :to="route"
          :prepend-icon="route.meta.icon"
          :title="route.meta.title"
          :value="route.meta.value"
          :color="route.meta.color"
        >
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useEmitter from "@/composables/useEmitter";
import { RouteItemTypes } from "../../utils/enums";
import { RouteMetaData } from "@/utils/types";
import { useDisplay } from "vuetify";
interface RouteWithMeta {
  name: string;
  meta: RouteMetaData;
}

// display
const { mobile } = useDisplay();

// routing
const router = useRouter();
const routeTypes = computed(() => Object.values(RouteItemTypes) as string[]);
const routes = computed(() => {
  return router.options.routes.filter((rt) => rt.meta !== undefined);
});
const routesByType = function (rType: string): RouteWithMeta[] {
  return routes.value
    .filter((r) => r.meta?.type === rType)
    .map((r) => ({
      name: (r.name as string) || "",
      meta: {
        color: (r.meta?.color as string) || "",
        icon: (r.meta?.icon as string) || "",
        title: (r.meta?.title as string) || "",
        type: (r.meta?.type as string) || "",
        value: (r.meta?.value as string) || "",
      },
    }));
};

// toggle stuff
const emitter = useEmitter();
const drawer = ref(false);
onMounted(() => {
  emitter.on("toggle-drawer", () => {
    drawer.value = !drawer.value;
  });
});
</script>
