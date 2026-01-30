<script setup lang="ts">
import Debug from "./components/Debug.vue";
import Details from "./components/Details.vue";
import Hero from "./components/Hero.vue";
import RemoveData from "./components/RemoveData.vue";
import ChartSankey from "./components/Chart/ChartSankey.vue";
import ChartScatter from "./components/Chart/ChartScatter.vue";
import { useLectures } from "./composables/useLectures";
import ChartCard from "./components/Chart/ChartCard.vue";

const { lectures } = useLectures();
</script>

<template>
    <Hero v-if="lectures.length === 0" />
    <!-- <div v-else class="p-4"> -->
    <div v-else class="">
        <div>
            <ChartCard heading="Performance vs. Difficulty Matrix">
                <ChartScatter />
            </ChartCard>
            <!-- <ChartPerf /> -->
            <ChartCard heading="Student Flow Chart">
                <ChartSankey />
            </ChartCard>
        </div>
        <div>
            <RemoveData />
            <Details />
            <Debug />
        </div>
    </div>
</template>
