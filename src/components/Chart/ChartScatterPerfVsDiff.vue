<script setup lang="ts">
import { computed } from "vue";

import { useLectures } from "@/composables/useLectures";
import { colors } from "@unovis/ts";
import { VisAxis, VisCrosshair, VisScatter, VisTooltip, VisXYContainer } from "@unovis/vue";
import ChartCard from "./ChartCard.vue";

const { lectures } = useLectures();

const mydata = computed(() => {
  const filterdData = lectures.value.flatMap((lec) => {
    if (lec.stats === null || lec.stats.graded === null || lec.stats.graded_but_not_passed === null)
      return [];
    return [
      {
        id: lec.id,
        title: lec.name,
        difficulty: lec.stats.graded_but_not_passed / lec.stats.graded,
        performance: lec.grade,
        participants: lec.stats.participants,
      },
    ];
  });
  return filterdData.map((item, i) => ({
    ...item,
    color: colors[i % colors.length],
  }));
});

const tooltipTemplate = (d: any) => `
  <div class="font-bold">${d.title}</div>
  <div>Grade: ${d.performance}</div>
  <div>Fail Rate: ${(d.difficulty * 100).toFixed(1)}%</div>
  <div class="text-xs text-gray-400">${d.participants} Students</div>
  `;
</script>

<template>
  <ChartCard heading="Performance vs. Difficulty Matrix">
    <div class="pr-6">
      <VisXYContainer :data="mydata" :height="390" class="">
        <VisScatter
          :x="(d: any) => d.difficulty"
          :y="(d: any) => d.performance"
          :size="(d: any) => d.participants"
          :sizeRange="[10, 50]"
          :label="(d: any) => d.id"
          :color="(d: any) => d.color"
        />

        <VisAxis type="y" label="My grade" :tickValues="[1, 2, 3, 4, 5]" />
        <VisAxis
          type="x"
          label="Difficulty (failure rate)"
          :gridLine="true"
          :tickFormat="(val: number) => `${val * 100}%`"
          :tickValues="[0, 0.2, 0.4, 0.6, 0.8, 1]"
        />

        <!-- tooltip -->
        <VisCrosshair :template="tooltipTemplate" />
        <VisTooltip />
      </VisXYContainer>
    </div>
  </ChartCard>
</template>
