<script setup lang="ts">
import ChartSankey from "./components/Chart/ChartSankey.vue";
import ChartScatter from "./components/Chart/ChartScatter.vue";
import Debug from "./components/Debug.vue";
import Details from "./components/Details.vue";
import Hero from "./components/Hero.vue";
import RemoveData from "./components/RemoveData.vue";
import { useLectures } from "./composables/useLectures";

const { lectures } = useLectures();
</script>

<template class="bg-base-100">
  <Hero v-if="lectures.length === 0" />
  <!-- <div v-else class="p-4"> -->
  <div v-else class="container max-w-full px-2">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ChartScatter />
      <ChartSankey />
    </div>
    <RemoveData class="m-4" />
    <div class="grid grid-cols-1 md:grid-cols-2">
      <Details />
      <Debug />
    </div>
  </div>
</template>
