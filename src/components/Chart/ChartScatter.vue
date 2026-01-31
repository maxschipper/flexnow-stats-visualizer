<script setup lang="ts">
// import { Scatter } from "@unovis/ts";
import { VisAxis, VisCrosshair, VisScatter, VisTooltip, VisXYContainer } from "@unovis/vue";
import { computed } from "vue";

import ChartCard from "./ChartCard.vue";
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();

const mydata = computed(() =>
  lectures.value
    .flatMap((lec) => {
      if (
        lec.stats === null ||
        lec.stats.graded === null ||
        lec.stats.graded_but_not_passed === null
      )
        return null;
      return [
        {
          id: lec.id,
          title: lec.name,
          difficulty: lec.stats.graded_but_not_passed / lec.stats.graded,
          performance: lec.grade,
          participants: lec.stats.participants,
        },
      ];
    })
    .filter((l) => l !== null),
);

const x = (d: any) => d.difficulty;
const y = (d: any) => d.performance;
const size = (d: any) => d.participants;
const label = (d: any) => d.id;
const xTickFormat = (val: number) => `${val * 100}%`;

// const tooltipTriggers = {
//     [Scatter.selectors.point]: (d: any) => `
//     <div class="font-bold">${d.title}</div>
//     <div>Grade: ${d.performance}</div>
//     <div>Fail Rate: ${(d.difficulty * 100).toFixed(1)}%</div>
//     <div class="text-xs text-gray-400">${d.participants} Students</div>
//   `,
// };
const template = (d: any) => `
  <div class="font-bold">${d.title}</div>
  <div>Grade: ${d.performance}</div>
  <div>Fail Rate: ${(d.difficulty * 100).toFixed(1)}%</div>
  <div class="text-xs text-gray-400">${d.participants} Students</div>
  `;
</script>

<template>
  <ChartCard heading="Performance vs. Difficulty Matrix">
    <div class="pr-6">
      <VisXYContainer :data="mydata" :height="350" class="">
        <!-- chart -->
        <VisScatter :x="x" :y="y" :size :sizeRange="[10, 50]" :label />
        <!-- axis (order here affects x and y???) -->
        <VisAxis type="y" label="My grade" :tickValues="[1, 2, 3, 4, 5]" />
        <VisAxis
          type="x"
          label="Difficulty (failure rate)"
          :gridLine="true"
          :tickFormat="xTickFormat"
          :tickValues="[0, 0.2, 0.4, 0.6, 0.8, 1]"
        />

        <!-- tooltip -->
        <VisCrosshair :template />
        <VisTooltip />

        <!-- <VisCrosshair /> -->
        <!-- <VisTooltip :triggers="tooltipTriggers" :hideDelay="0" />  -->
      </VisXYContainer>
    </div>
  </ChartCard>
</template>
