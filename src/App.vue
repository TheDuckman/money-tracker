<template>
  <v-app>
    <v-main class="pb-0">
      <TheAppBar v-if="mobile" />
      <TheDrawer v-else />
      <TheSnackbar />
      <v-container class="pt-0">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
    <v-footer class="justify-end py-0" app>
      <a
        href="https://www.flaticon.com/free-icons/coin"
        title="coin icons"
        class="text-caption"
        style="text-decoration: none; color: grey"
        >Coin icon created by kliwir art - Flaticon</a
      >
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "@/store";
import { RecordTypes } from "@/utils/enums";
import { useDisplay } from "vuetify";

// display
const { mobile } = useDisplay();

const store = useStore();

onBeforeMount(() => {
  store.generateRecords(25, RecordTypes.EXPENSE);
  store.generateRecords(25, RecordTypes.INCOME);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
