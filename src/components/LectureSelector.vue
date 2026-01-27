<script lang="ts">
/**
 * A dropdown selector for choosing a specific Lecture.
 *
 * This component handles "smart selection":
 * 1. It filters out lectures that do not have statistics.
 * 2. It automatically selects the first valid lecture if the provided list changes
 * or if the current selection becomes invalid.
 *
 * Use `v-model:selectedLecture` to bind to the selected Lecture object directly.
 *
 * @prop {Lecture[]} lectures - The list of lectures to choose from.
 * @model {Lecture | null} selectedLecture - The currently selected Lecture object (two-way binding).
 */
export default {};
</script>
<script setup lang="ts">
import type { Lecture } from "@/parser";
import { watch } from "vue";

const props = defineProps<{
    lectures: Lecture[];
}>();

// const selectedIndex = defineModel("index", { default: 0 });
const selected = defineModel<Lecture | null>("selectedLecture", { default: null });

// const emit = defineEmits<{
//     (e: "lecture-selected", index: number): void;
// }>();

// const updateSelected = (event: Event) => {
//     const target = event.target as HTMLInputElement;
//     const newIndex: number = +target.value;
//     selectedIndex.value = newIndex;
// };

watch(
    () => props.lectures,
    (newLectures) => {
        if (!newLectures?.length) return;
        selected.value = newLectures.find((l) => l.stats !== null) || null;
    },
    { immediate: true }, // run immediately on mount to handle the initial list
);
</script>

<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Pick a Lecture</legend>
        <!-- <select class="select" @change="updateSelected"> -->
        <select class="select" v-model="selected">
            <!-- <option disabled selected>Pick a browser</option> -->
            <template v-for="lecture in lectures" :key="lecture.id">
                <option v-if="lecture.stats !== null" :value="lecture">{{ lecture.id }}</option>
            </template>
        </select>
        <!-- <span class="label">Optional</span> -->
    </fieldset>
</template>
