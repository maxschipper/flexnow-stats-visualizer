<script setup lang="ts">
import type { Lecture } from "@/parser";
import { VisScatter, VisXYContainer, VisAxis } from "@unovis/vue";
import { computed } from "vue";

const props = defineProps<{ lectures: Lecture[] }>();

const mydata = computed(() =>
    props.lectures.flatMap((lec) => {
        if (!lec.stats.graded || !lec.stats.graded_but_not_passed) return [];
        return [
            {
                id: lec.id,
                title: lec.name,
                difficulty: lec.stats.graded_but_not_passed / lec.stats.graded,
                performance: lec.grade,
                participants: lec.stats.participants,
            },
        ];
    }),
);

const x = (d: any) => d.difficulty;
const y = (d: any) => d.performance;
const size = (d: any) => d.participants;
</script>

<template>
    <VisXYContainer :data="mydata">
        <VisAxis type="y" :gridLine="false" label="My grade" :tickValues="[0, 1, 3, 4, 5]" />
        <VisAxis type="x" :gridLine="false" label="Difficulty (failure rate)" />
        <VisScatter :x="x" :y="y" :size :sizeRange="[10, 50]" />
    </VisXYContainer>
</template>
