<script setup lang="ts">
import { colors } from "@unovis/ts";
import { Scatter } from "@unovis/ts";
import { VisAxis, VisScatter, VisTooltip, VisXYContainer } from "@unovis/vue";
import { InfoIcon } from "lucide-vue-next";
import { computed } from "vue";

import ChartCard from "./ChartCard.vue";
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();

const mydata = computed(() => {
  const filterdData = lectures.value.flatMap((lec) => {
    if (lec.stats === null || lec.stats.graded === null || lec.stats.graded_but_not_passed === null)
      return [];
    return [
      {
        id: lec.id,
        title: lec.name,
        avgGrade: lec.stats.average_grade,
        stdDev: lec.stats.standard_deviation_grade,
        userGrade: lec.grade,
      },
    ];
  });
  return filterdData.map((item, i) => ({
    ...item,
    color: colors[i % colors.length],
  }));
});

const tooltipTriggers = {
  [Scatter.selectors.point]: (d: any) => `
  <div class="font-bold">${d.title}</div>
  <div>My Grade: ${d.userGrade}</div>
  <div>Average Grade: ${d.avgGrade}</div>
  <div>Standard Deviation: ${d.stdDev}</div>
  `,
};
</script>

<template>
  <ChartCard heading="Strictness vs. Consistency Matrix" class="relative">
    <div class="pr-6">
      <div class="tooltip tooltip-left absolute top-4 right-4">
        <div class="tooltip-content px-2.5 py-1.5 text-left">
          <h3 class="pb-2 font-bold">Strictness vs. Consistency Matrix</h3>
          <p>
            This matrix measures the fairness of an exam by plotting the average grade against the
            standard deviation (how unpredictable the results are). It helps you identify if a grade
            was the result of a consistent evaluation or a "chaotic" exam with highly volatile
            scoring.
          </p>
          <p class="mt-2">
            The <strong>further right</strong> a course is, the higher the average grade.
          </p>
          <p class="mt-2">
            The <strong>lower</strong> it is, the more consistent and predictable the grading was.
          </p>
        </div>
        <button><InfoIcon :size="20" class="text-base-content/60" /></button>
      </div>

      <VisXYContainer :data="mydata" :height="390" class="">
        <!-- chart -->
        <VisScatter
          :x="(d: any) => d.avgGrade"
          :y="(d: any) => d.stdDev"
          :label="(d: any) => d.id"
          :color="(d: any) => d.color"
        />
        <!-- axis (order here affects x and y???) -->
        <VisAxis type="y" label="Standard Deviation" />
        <VisAxis type="x" label="Average Grade" :gridLine="true" :tickValues="[1, 2, 3, 4, 5]" />

        <!-- tooltip -->
        <VisTooltip :triggers="tooltipTriggers" />
      </VisXYContainer>
    </div>
  </ChartCard>
</template>
