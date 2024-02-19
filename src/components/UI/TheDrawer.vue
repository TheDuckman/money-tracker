<template>
  <v-navigation-drawer>
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
          v-for="route in routesByType[rType]"
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { RouteItemTypes } from "../../utils/enums";
import { useDisplay } from "vuetify";
import useRoutesByType from "@/composables/useRoutesByType";

// display
const { mobile } = useDisplay();

// routing
const routeTypes = computed(() => Object.values(RouteItemTypes) as string[]);
const router = useRouter();
const routesByType = useRoutesByType(router);
</script>
