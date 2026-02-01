<script lang="ts">
/**
 * Sankey Diagram Visualization
 * Displays the flow of student participation for a specific exam:
 * Signed Up -> (Showed Up vs No Show) and then: Showed Up -> (Passed vs Failed)
 *
 * Includes an internal `LectureSelector` to switch between exams.
 * Handles error states if the selected lecture has incomplete data.
 *
 * @prop {Lecture[]} lectures - The list of lectures available to visualize.
 */
export default {};
</script>
<script setup lang="ts">
// TODO: are people in other strictly no shows or maybe also people handing in empty?
import { FitMode, SankeyNodeAlign, TrimMode } from "@unovis/ts";
import { VisSankey, VisSingleContainer } from "@unovis/vue";
import { TriangleAlertIcon } from "lucide-vue-next";
import { computed, ref } from "vue";

import LectureSelector from "../LectureSelector.vue";
import ChartCard from "./ChartCard.vue";
import type { ExamStats, Lecture } from "@/types";

interface node {
  id: string;
  label: string;
  value: number;
  color?: string;
}
interface link {
  source: node;
  target: node;
}

// used for the v-model on LectureSelector
const selectedLecture = ref<Lecture | null>(null);

const chartData = computed(() => {
  if (!selectedLecture.value) return null;
  if (selectedLecture.value.stats === null) return null;
  const stats: ExamStats = selectedLecture.value.stats;

  // all the stats needed to generate the sankey diagram
  if (
    stats.participants === null
    || stats.other === null
    || stats.passed === null
    || stats.graded_but_not_passed === null
  ) {
    return null;
  }

  return {
    nodes: [
      { id: "root", label: "Signed Up", value: stats.participants },
      { id: "no_show", label: "Did Not Show", value: stats.other },
      {
        id: "showed_up",
        label: "Showed Up",
        value: stats.participants! - stats.other!,
      },
      { id: "passed", label: "Passed", value: stats.passed },
      { id: "failed", label: "Failed", value: stats.graded_but_not_passed },
    ],
    links: [
      { source: "root", target: "no_show" },
      { source: "root", target: "showed_up" },
      { source: "showed_up", target: "passed" },
      { source: "showed_up", target: "failed" },
    ],
  };
});

const sortOrder: Record<string, number> = {
  root: 0,
  showed_up: 1,
  no_show: 2,
  push_passed: 3,
  passed: 3,
  failed: 4,
};
const linkSort = (link1: link, link2: link) => {
  const order1 = sortOrder[link1.target.id] ?? 99;
  const order2 = sortOrder[link2.target.id] ?? 99;
  return order1 - order2;
};
const linkValue = (l: link) => l.target.value;
const subLabel = (n: node) => n.value;
const nodeColor = (n: node) => {
  switch (n.id) {
    case "passed":
      return "green";
    case "failed":
      return "red";
  }
};
</script>

<template>
  <ChartCard heading="Student Flow Chart">
    <div>
      <!-- <div v-if="chartData" class="h-[300px]"> -->
      <div v-if="chartData">
        <VisSingleContainer :data="chartData" :height="300">
          <VisSankey
            :nodeAlign="SankeyNodeAlign.Left"
            :nodeColor
            :nodePadding="30"
            :linkSort
            :linkValue
            :labelFit="FitMode.Wrap"
            :labelTrimMode="TrimMode.End"
            :labelForceWordBreak="false"
            :labelBackground="false"
            :labelFontSize="10"
            :labelMaxWidth="15"
            :subLabel
            :subLabelFontSize="8"
          />
        </VisSingleContainer>
      </div>
      <div v-else role="alert" class="alert alert-warning shadow-lg">
        <TriangleAlertIcon />
        <div>
          <h3 class="font-bold">No Data Available</h3>
          <div class="text-xs">
            Lecture {{ selectedLecture?.id || "Unknown" }} is missing a statistic needed for this
            graph.
          </div>
        </div>
      </div>
      <LectureSelector v-model:selectedLecture="selectedLecture" />
    </div>
  </ChartCard>
</template>
