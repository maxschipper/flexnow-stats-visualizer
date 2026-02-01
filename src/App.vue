<script setup lang="ts">
import ChartGroupedBar from "./components/Chart/ChartGroupedBar.vue";
import ChartSankey from "./components/Chart/ChartSankey.vue";
import ChartScatter from "./components/Chart/ChartScatter.vue";
import Hero from "./components/Hero.vue";
import Navbar from "./components/Navbar.vue";
import { useLectures } from "./composables/useLectures";

const { lectures } = useLectures();
</script>

<template class="bg-base-100">
  <Hero v-if="lectures.length === 0" />
  <!-- <div v-else class="p-4"> -->
  <div v-else>
    <Navbar class="mb-4" />
    <div class="container max-w-full px-2">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:px-8 xl:grid-cols-3 xl:px-16">
        <ChartScatter />
        <ChartSankey />
        <ChartGroupedBar />
      </div>
    </div>
  </div>
</template>
