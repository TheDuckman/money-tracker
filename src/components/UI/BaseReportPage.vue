<template>
  <v-container>
    <h1>
      <v-icon :color="color">{{ icon }}</v-icon
      >{{ title }}
    </h1>
    <MonthSelector />
    <v-card class="mt-2">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <h2>
              <v-icon class="mr-2" :color="leftColor">{{ leftIcon }}</v-icon
              >{{ leftTitle }}
            </h2>
            <slot name="left"></slot>
          </v-col>
          <v-col cols="6">
            <h2>
              <v-icon class="mr-2" :color="rightColor">{{ rightIcon }}</v-icon
              >{{ rightTitle }}
            </h2>
            <slot name="right"></slot>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  leftIcon: {
    type: String,
    default: null,
  },
  leftColor: {
    type: String,
    default: null,
  },
  leftTitle: {
    type: String,
    default: null,
  },
  rightIcon: {
    type: String,
    default: null,
  },
  rightColor: {
    type: String,
    default: null,
  },
  rightTitle: {
    type: String,
    default: null,
  },
});

const icon = computed(() => props.icon);
const title = computed(() => props.title);
const color = computed(() => props.color);
const leftIcon = computed(() => props.leftIcon);
const leftColor = computed(() => props.leftColor);
const leftTitle = computed(() => props.leftTitle);
const rightIcon = computed(() => props.rightIcon);
const rightColor = computed(() => props.rightColor);
const rightTitle = computed(() => props.rightTitle);
</script>
