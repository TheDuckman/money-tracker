<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item prepend-avatar="@/assets/coin.png">
        <v-list-item-title class="text-orange">Money Tracker</v-list-item-title>
        <v-list-item-subtitle>By Gabriel Pato</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <template v-for="rType in routeTypes" :key="rType">
        <v-list-subheader>{{ rType }}</v-list-subheader>
        <v-list-item
          v-for="route in routesIn(rType)"
          :key="route.name"
          :to="route"
          :prepend-icon="route.meta.icon"
          :title="route.meta.title"
          :value="route.meta.value"
          :color="route.meta.color"
        >
        </v-list-item>
      </template>
      <v-list-item @click="emitter.emit('success-toast')"> TESTE</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { RouteItemTypes } from "../utils/enums";
import useEmitter from "@/composables/useEmitter";
const emitter = useEmitter();

const router = useRouter();
const routeTypes = computed(() => Object.values(RouteItemTypes) as string[]);
const routes = computed(() => {
  return router.options.routes.filter((rt) => rt.meta !== undefined);
});
const routesIn = function (rType: string) {
  return routes.value.filter((r) => r.meta.type === rType);
};
</script>
