<template>
  <v-app>
    <v-main>
      <TheDrawer />
      <v-container>
        <router-view></router-view>
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

<script setup lang="ts"></script>
