<template>
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <v-app-bar-nav-icon :to="{ name: 'HomeView' }" icon="mdi-home" />
    </template>

    <v-app-bar-title>
      <v-list>
        <v-list-item append-avatar="@/assets/coin.png">
          <v-list-item-title class="text-orange"
            >Money Tracker</v-list-item-title
          >
          <v-list-item-subtitle>By Gabriel Pato</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts"></script>
