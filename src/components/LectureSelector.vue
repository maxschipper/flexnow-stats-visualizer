<script lang="ts">
/**
 * For charts that only work with one lecture instead of the full list of lectures
 *
 * use v-model two way binding on index so the index can be updated by this
 * component to automatically select the first valid exam with stats.
 *
 * also make sure that the ref that is used for the `index` prop has the default
 * value `0` to prevent state de-syncs
 *
 * @prop {Lecture[]} lectures - the lectures to select from
 * @prop {number} [index] - the currently selected index (use with v-model two way binding)
 */
export default {};
</script>
<script setup lang="ts">
import type { Lecture } from "@/parser";
import { watch } from "vue";

const props = defineProps<{
    lectures: Lecture[];
}>();

const selectedIndex = defineModel("index", { default: 0 });

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

        // check if the current selection is still valid in the new list
        // if the current index points to a lecture with stats use that
        // ! i think i want to always recompute the first valid index on change of the lecture list
        // const currentLecture = newLectures[selectedIndex.value];
        // if (currentLecture?.stats) return;

        const firstValidIndex = newLectures.findIndex((l) => l.stats !== null);
        if (firstValidIndex !== -1) {
            // this automatically emits to the v-model bind in the parent component
            selectedIndex.value = firstValidIndex;
        }
    },
    { immediate: true }, // run immediately on mount to handle the initial list
);
</script>

<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Pick a Lecture</legend>
        <!-- <select class="select" @change="updateSelected"> -->
        <select class="select" v-model="selectedIndex">
            <!-- <option disabled selected>Pick a browser</option> -->
            <template v-for="(lecture, index) in lectures">
                <template v-if="lecture.stats !== null">
                    <option :value="index">{{ lecture.id }}</option>
                </template>
            </template>
        </select>
        <!-- <span class="label">Optional</span> -->
    </fieldset>
</template>
