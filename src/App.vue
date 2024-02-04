<template>
  <v-app>
    <v-main>
      <TheDrawer />
      <TheSnackbar />
      <v-container>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </v-container>
    </v-main>
    <v-footer class="justify-end" app>
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

const store = useStore();

onBeforeMount(() => {
  store.generateRecords(25, RecordTypes.EXPENSE);
  store.generateRecords(25, RecordTypes.INCOME);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
