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
</script>

<template>
    <VisXYContainer :data="mydata">
        <VisAxis type="y" :gridLine="true" label="My grade" :numTicks="5" :tickValues="[0, 1, 3, 4, 5]" />
        <VisAxis type="x" :gridLine="false" :tickValues="[1, 2, 3]" label="Difficulty (failure rate)" />
        <VisScatter :x="x" :y="y" :size :sizeRange="[10, 50]" />
    </VisXYContainer>
</template>
