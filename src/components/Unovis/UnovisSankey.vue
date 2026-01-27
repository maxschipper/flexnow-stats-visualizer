<script setup lang="ts">
import type { Lecture } from "@/parser";
import { FitMode } from "@unovis/ts";
import { VisSingleContainer, VisSankey } from "@unovis/vue";
import { computed, ref, watch } from "vue";
import LectureSelector from "../LectureSelector.vue";

const props = defineProps<{ lectures: Lecture[] }>();

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

const selectedLectureIndex = ref(0);
watch(
    () => props.lectures,
    (newLectures) => {
        const current = newLectures[selectedLectureIndex.value];
        // if current selection is valid do nothing
        if (current?.stats) return;

        // otherwise find first lecture with stats
        const firstValidIndex = newLectures.findIndex((l) => l.stats);
        if (firstValidIndex !== -1) {
            selectedLectureIndex.value = firstValidIndex;
        }
    },
);

const handleLectureSelect = (newIndex: number) => {
    selectedLectureIndex.value = newIndex;
    console.log("updated selectedLectureIndex", selectedLectureIndex.value);
};

const chartData = computed(() => {
    const selectedLecture = props.lectures[selectedLectureIndex.value];
    const lec = selectedLecture?.stats;
    if (lec === null || lec === undefined) return null;
    return {
        nodes: [
            { id: "root", label: "Signed Up", value: lec.participants },
            { id: "no_show", label: "Did Not Show", value: lec.other },
            { id: "showed_up", label: "Showed Up", value: lec.participants! - lec.other! },
            { id: "passed", label: "Passed", value: lec.passed },
            { id: "failed", label: "Failed", value: lec.graded_but_not_passed },
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
    <div>
        <LectureSelector :lectures="props.lectures" @lecture-selected="handleLectureSelect" />
        <div v-if="chartData">
            <VisSingleContainer :data="chartData" :height="400">
                <VisSankey
                    :labelFit="FitMode.Wrap"
                    labelForceWordBreak="false"
                    :labelMaxWidth="50"
                    :nodePadding="30"
                    :nodeColor
                    nodeAlign="left"
                    :linkSort
                    :linkValue
                    :subLabel
                />
            </VisSingleContainer>
        </div>
    </div>
</template>
