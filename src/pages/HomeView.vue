<template>
  <v-container>
    <h1 class="d-flex flex-row">
      <v-icon color="grey" class="mr-2">mdi-home</v-icon> Home
    </h1>
    <v-card class="mt-2">
      <v-card-text>
        {{ mobile }}
        <template v-for="rType in routeTypes" :key="rType">
          <h2 class="text-center mt-5">{{ rType }}</h2>
          <v-row class="mt-2 mb-4">
            <v-col
              cols="6"
              v-for="route in routesByType[rType]"
              :key="route.name"
            >
              <v-btn
                :elevation="6"
                :color="route.meta.color"
                :prepend-icon="route.meta.icon"
                :to="{ name: route.name }"
                stacked
                variant="tonal"
                width="100%"
              >
                {{ route.meta.title }}
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import useRoutesByType from "@/composables/useRoutesByType";
import { RouteItemTypes } from "@/utils/enums";
import { onMounted } from "vue";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const routeTypes = computed(() => Object.values(RouteItemTypes) as string[]);
const router = useRouter();
const routesByType = useRoutesByType(router);

// display
const { mobile } = useDisplay();

// rendering
onMounted(() => {
  if (!mobile.value) {
    router.push({ name: "TableView" });
  }
});
watch(mobile, async (newVal) => {
  if (!newVal) {
    router.push({ name: "TableView" });
  }
});
</script>
