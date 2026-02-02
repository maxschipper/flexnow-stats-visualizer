<script setup lang="ts">
import ChartAreaNormDist from "./components/Chart/ChartAreaNormDist.vue";
import ChartBarDeviation from "./components/Chart/ChartBarDeviation.vue";
import ChartGroupBarMeVsMedian from "./components/Chart/ChartGroupBarMeVsMedian.vue";
import ChartSankeySurvivorFlow from "./components/Chart/ChartSankeySurvivorFlow.vue";
import ChartScatterPerfVsDiff from "./components/Chart/ChartScatterPerfVsDiff.vue";
import ChartScatterStrictVsConsist from "./components/Chart/ChartScatterStrictVsConsist.vue";
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
    <div class="container max-w-full">
      <div
        class="grid grid-cols-1 gap-4 px-2 pb-32 md:grid-cols-2 md:px-8 md:pb-8 xl:grid-cols-3 xl:px-16 xl:pb-16"
      >
        <ChartScatterPerfVsDiff />
        <ChartSankeySurvivorFlow />
        <ChartGroupBarMeVsMedian />
        <ChartAreaNormDist />
        <ChartBarDeviation />
        <ChartScatterStrictVsConsist />
      </div>
    </div>
  </div>
</template>
