<script setup lang="ts">
import { VisScatter, VisXYContainer, VisAxis } from "@unovis/vue";
import { computed } from "vue";
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();

const mydata = computed(() =>
    lectures.value
        .flatMap((lec) => {
            if (lec.stats === null || lec.stats.graded === null || lec.stats.graded_but_not_passed === null)
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
</script>

<template>
    <VisXYContainer :data="mydata">
        <VisAxis type="y" label="My grade" :tickValues="[1, 2, 3, 4, 5]" />
        <VisAxis type="x" :gridLine="true" label="Difficulty (failure rate)" />

        <VisScatter :x="x" :y="y" :size :sizeRange="[10, 50]" :label />
    </VisXYContainer>
</template>
