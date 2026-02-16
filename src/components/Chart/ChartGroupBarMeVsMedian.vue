<script setup lang="ts">
import { computed } from "vue";

import { useLectures } from "@/composables/useLectures";
import { GroupedBar } from "@unovis/ts";
import { VisAxis, VisBulletLegend, VisGroupedBar, VisTooltip, VisXYContainer } from "@unovis/vue";
import ChartCard from "./ChartCard.vue";

import type { BulletLegendItemInterface } from "@unovis/ts";

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

const legendItems: BulletLegendItemInterface[] = [
  { name: "My Grade" },
  { name: "Median" },
  { name: "Average" },
];

const tooltipTriggers = {
  [GroupedBar.selectors.barGroup]: (d: any) => `
    <div class="font-bold">${d.fullName}</div>
    <div>Me: ${d.myGrade}</div>
    <div>Median: ${d.median}</div>
    <div>Avg: ${d.average.toFixed(2)}</div>
  `,
};

const tickFormatX = (tick: number) => chartData.value[tick]?.name;
const tickValuesX = computed(() => {
  return [...Array(chartData.value.length).keys()];
});
</script>

<template>
  <ChartCard heading="Me vs. The Median">
    <VisXYContainer :data="chartData" :height="370">
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
        :tickTextAngle="20"
        :tickTextWidth="80"
        :tickTextHideOverlapping="false"
        tickTextFontSize="10px"
      />
      <VisAxis type="y" label="Grade" :gridLine="true" />

      <VisTooltip :triggers="tooltipTriggers" />
    </VisXYContainer>
    <VisBulletLegend :items="legendItems" />
  </ChartCard>
</template>
