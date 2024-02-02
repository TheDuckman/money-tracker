<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <h2><v-icon color="red">mdi-cash-minus</v-icon> Expenses</h2>
          <v-expansion-panels class="my-4" multiple>
            <v-expansion-panel
              v-for="expCat in expensesCategories"
              :key="expCat.name"
            >
              <v-expansion-panel-title>
                <v-icon :color="expCat.color" class="mr-4">{{
                  expCat.icon
                }}</v-icon>
                {{ expCat.name }}
                <v-spacer></v-spacer>
                <div class="mr-3">
                  <v-chip label class="text-red font-weight-bold"
                    >$ 647.45</v-chip
                  >
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list lines="one">
                  <v-list-item v-for="n in 3" :key="n">
                    <v-list-item-title>
                      <div class="d-flex">
                        <v-icon>mdi-circle-small</v-icon> Lorem Ipsum
                        <v-spacer></v-spacer>
                        <div :class="`text-${expCat.color} font-weight-medium`">
                          $ 123.45
                        </div>
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ new Date().toDateString() }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="6">
          <h2><v-icon color="green">mdi-cash-plus</v-icon> Income</h2>
          <v-expansion-panels class="my-4" multiple>
            <v-expansion-panel
              v-for="incCat in incomeCategories"
              :key="incCat.name"
            >
              <v-expansion-panel-title>
                <v-icon :color="incCat.color" class="mr-4">{{
                  incCat.icon
                }}</v-icon>
                {{ incCat.name }}
                <v-spacer></v-spacer>
                <div class="mr-3">
                  <v-chip label class="text-green font-weight-bold"
                    >$ 647.45</v-chip
                  >
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list lines="one">
                  <v-list-item v-for="n in 3" :key="n">
                    <v-list-item-title>
                      <div class="d-flex">
                        <v-icon>mdi-circle-small</v-icon> Something here
                        <v-spacer></v-spacer>
                        <div :class="`text-${incCat.color} font-weight-medium`">
                          $ 435.67
                        </div>
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ new Date().toDateString() }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";

const store = useStore();
const expensesCategories = computed(() => store.expensesCategories);
const incomeCategories = computed(() => store.incomeCategories);
</script>
