<script setup lang="ts">
import { type BulletLegendItemInterface, GroupedBar } from "@unovis/ts";
import { VisAxis, VisBulletLegend, VisGroupedBar, VisTooltip, VisXYContainer } from "@unovis/vue";
import { computed } from "vue";

import ChartCard from "./ChartCard.vue";
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();

const chartData = computed(() => {
  return lectures.value
    .map((l) => ({
      name: l.id,
      fullName: l.name,
      myGrade: l.passed ? l.grade : 5.0,
      average: l.stats?.average_grade,
      median: l.stats?.median_grade,
    }))
    .filter((d) => d.average && d.median);
});

const x = (_: any, i: number) => i;
const y = [(d: any) => d.myGrade, (d: any) => d.median, (d: any) => d.average];

const legendItems = [{ name: "My Grade" }, { name: "Median" }, { name: "Average" }];

// const color = (_: any, i: number) => ["#3B82F6", "#A855F7", "#9CA3AF"][i];

// Custom Tooltip
// const tooltipTriggers = {
//   [GroupedBar.selectors.bar]: (d: any) => `
//     <div class="font-bold">${d.fullName}</div>
//     <div class="text-blue-500">Me: ${d.myGrade}</div>
//     <div class="text-purple-500">Median: ${d.median}</div>
//     <div class="text-gray-500">Avg: ${d.average.toFixed(2)}</div>
//   `,
// };

const tickFormatX = (tick: number) => chartData.value[tick]?.name;
const tickValuesX = computed(() => {
  return [...Array(chartData.value.length).keys()];
});
</script>

<template>
  <ChartCard heading="Me vs. The Median">
    <VisXYContainer :data="chartData" :height="370">
      <!-- <VisXYContainer :data="chartData"> -->
      <VisGroupedBar :x :y />

      <VisAxis
        type="x"
        label="Course"
        :gridLine="false"
        :tickValues="tickValuesX"
        :tickFormat="tickFormatX"
        :tickLine="false"
        tickTextFitMode="trim"
        tickTextTrimType="end"
        :tickTextAngle="30"
        :tickTextWidth="80"
        :tickTextHideOverlapping="false"
        tickTextFontSize="10px"
      />
      <VisAxis type="y" label="Grade" :gridLine="true" />
      <!-- <VisTooltip :triggers="tooltipTriggers" /> -->
      <!-- <VisBulletLegend
        :items="[
          { name: 'My Grade', color: '#3B82F6' },
          { name: 'Class Median', color: '#A855F7' },
          { name: 'Class Average', color: '#9CA3AF' },
        ]"
      /> -->
    </VisXYContainer>
    <VisBulletLegend :items="legendItems" />
  </ChartCard>
</template>
