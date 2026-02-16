<script setup lang="ts">
import { computed } from "vue";

import { useLectures } from "@/composables/useLectures";
import { StackedBar } from "@unovis/ts";
import { VisAxis, VisStackedBar, VisTooltip, VisXYContainer } from "@unovis/vue";
import ChartCard from "./ChartCard.vue";

const { lectures } = useLectures();

const chartData = computed(() => {
  return lectures.value.flatMap((l) => {
    if (
      l.stats === null
      || l.grade === null
      || l.stats.average_grade === null
      || l.stats.standard_deviation_grade === null
    ) {
      return [];
    }
    const zScore = (l.grade - l.stats.average_grade) / l.stats.standard_deviation_grade;
    console.log(l.id, zScore);
    return {
      id: l.id,
      zScore,
      myGrade: l.grade,
      avg: l.stats.average_grade,
      stdDev: l.stats.standard_deviation_grade,
    };
  });
});
// console.table(chartData.value);

const tooltipTriggers = {
  [StackedBar.selectors.barGroup]: (d: any) => `
    <div class="font-bold">${d.id}</div>
    <div>Z-Score: ${d.zScore.toFixed(2)}</div>
    <div>My Grade:  ${d.myGrade}</div>
    <div>Avg: ${d.avg}</div>
    <div>Standard Deviation: ${d.stdDev}</div>
  `,
};
</script>

<template>
  <ChartCard heading="Deviation Chart">
    <VisXYContainer :data="chartData" :height="400">
      <VisStackedBar
        :x="(_: any, i: number) => i"
        :y="(d: any) => d.zScore"
        orientation="horizontal"
        :color="(d: any) => (d.zScore <= 0 ? 'var(--color-success)' : 'var(--color-error)')"
      />

      <VisAxis
        type="x"
        label="Deviation / Z-Score (lower is better)"
        :gridLine="false"
        :tickValues="[0]"
      />
      <VisAxis
        type="y"
        label=""
        :gridLine="false"
        :tickFormat="(tick: number) => chartData[tick]?.id"
      />

      <VisTooltip :triggers="tooltipTriggers" />
    </VisXYContainer>
  </ChartCard>
</template>
