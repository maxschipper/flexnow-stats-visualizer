<script setup lang="ts">
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
    <Navbar />
    <div class="container max-w-full px-2">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ChartScatter class="mt-2" />
        <ChartSankey />
      </div>
    </div>
  </div>
</template>
