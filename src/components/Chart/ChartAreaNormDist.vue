<script setup lang="ts">
import { VisArea, VisAxis, VisPlotline, VisXYContainer } from "@unovis/vue";
import { InfoIcon } from "lucide-vue-next";
import { computed, ref } from "vue";

import LectureSelector from "../LectureSelector.vue";
import ChartCard from "./ChartCard.vue";
import type { Lecture } from "@/types";

const selectedLecture = ref<Lecture | null>(null);

/**
 * calculates the Probability Density Function (PDF) value for a given grade
 */
function calculateNormalPDF(grade: number, mean: number, stdDeviation: number): number {
  const exponent = Math.exp(-Math.pow(grade - mean, 2) / (2 * Math.pow(stdDeviation, 2)));
  return (1 / (stdDeviation * Math.sqrt(2 * Math.PI))) * exponent;
}

const chartData = computed(() => {
  const grades = [];
  for (let i = 1; i <= 5.1; i += 0.2) {
    grades.push(i);
  }
  return grades.map((g) => {
    const mean = selectedLecture.value?.stats?.average_grade;
    const stdDev = selectedLecture.value?.stats?.standard_deviation_grade;
    const prob = !mean || !stdDev ? 0 : calculateNormalPDF(g, mean, stdDev);

    return { grade: g, prob };
  });
});
// console.table(chartData.value);

const x = (d: any) => d.grade;
const y = (d: any) => d.prob;

const plotlineValue = computed(() => (selectedLecture.value ? selectedLecture.value.grade : 0));
</script>
<template>
  <ChartCard heading="Normal Distribution" class="relative">
    <div class="tooltip tooltip-left absolute top-4 right-4">
      <div class="tooltip-content px-2.5 py-1.5 text-left">
        This chart represents a theoretical normal distribution based on the mean and standard
        deviation. It is an approximation for visualization purposes and may not perfectly reflect
        the actual distribution.
      </div>
      <button><InfoIcon :size="20" class="text-base-content/60" /></button>
    </div>
    <VisXYContainer :data="chartData">
      <VisArea :x :y :opacity="0.4" />
      <VisAxis type="x" :gridLine="false" label="Grade" :tickValues="[1, 2, 3, 4, 5]" />
      <VisAxis type="y" :gridLine="false" label="Probability" />
      <VisPlotline
        axis="x"
        :value="plotlineValue"
        color="var(--color-neutral)"
        labelColor="var(--color-neutral)"
        labelPosition="bottom-right"
        labelText="My Grade"
        labelOrientation="horizontal"
      />
    </VisXYContainer>
    <LectureSelector v-model:selectedLecture="selectedLecture" />
  </ChartCard>
</template>
