<template>
  <v-app>
    <v-main>
      <TheDrawer />
      <TheSnackbar />
      <v-container>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
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
