<!-- TODO: are people in other strictly no shows or maybe also people handing in empty? -->
<script lang="ts">
/**
 * Sankey Diagram Visualization
 *
 * Includes an internal `LectureSelector` to switch between exams.
 * Handles error states if the selected lecture has incomplete data.
 */
export default {};
</script>
<script setup lang="ts">
import { computed, ref } from "vue";

import { TriangleAlertIcon } from "lucide-vue-next";

import { FitMode, SankeyNodeAlign, TrimMode } from "@unovis/ts";
import { VisSankey, VisSingleContainer } from "@unovis/vue";
import LectureSelector from "../LectureSelector.vue";
import ChartCard from "./ChartCard.vue";

import type { ExamStats, Lecture } from "@/types";

interface Node {
  id: string;
  label: string;
  value: number;
  color?: string;
}
interface Link {
  source: Node | string;
  target: Node | string;
  color?: string;
}
interface SankeyData {
  nodes: Node[];
  links: Link[];
}

// used for the v-model on LectureSelector
const selectedLecture = ref<Lecture | null>(null);

const chartData = computed((): SankeyData | null => {
  if (!selectedLecture.value) return null;
  const lec = selectedLecture.value;

  if (lec.stats === null) return null;
  const stats: ExamStats = lec.stats;

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
      {
        source: "showed_up",
        target: "passed",
        color: lec.passed ? "color-mix(in oklch, var(--color-success), transparent 80%)" : "",
      },
      {
        source: "showed_up",
        target: "failed",
        color: !lec.passed ? "color-mix(in oklch, var(--color-error), transparent 80%)" : "",
      },
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

const linkSort = (link1: Link, link2: Link) => {
  const order1 = sortOrder[(link1.target as Node).id] ?? 99;
  const order2 = sortOrder[(link2.target as Node).id] ?? 99;
  return order1 - order2;
};

const nodeColor = (n: Node) => {
  switch (n.id) {
    case "passed":
      return "var(--color-success)";
    case "failed":
      return "var(--color-error)";
    // default:
    //   return "var(--color-neutral";
  }
};
</script>

<template>
  <!-- <ChartCard heading="Student Flow Chart"> -->
  <ChartCard heading="Survivor Flow Chart">
    <div>
      <div v-if="chartData">
        <VisSingleContainer :data="chartData" :height="300">
          <VisSankey
            :nodeAlign="SankeyNodeAlign.Left"
            :nodeColor
            :nodePadding="30"
            :linkSort
            :linkValue="(l: Link) => (l.target as Node).value"
            :linkColor="(l: Link) => l.color"
            labelColor="var(--color-base-content)"
            :labelFit="FitMode.Wrap"
            :labelTrimMode="TrimMode.End"
            :labelForceWordBreak="false"
            :labelBackground="false"
            :labelFontSize="10"
            :labelMaxWidth="15"
            :subLabel="(n: Node) => n.value"
            subLabelColor="var(--color-base-content)"
            :subLabelFontSize="8"
            :highlightSubtreeOnHover="true"
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
