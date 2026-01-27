<script lang="ts">
/**
 * For charts that only work with one lecture instead of the full list of lectures
 *
 * @prop {Lecture[]} lectures - the lectures to select from
 * @emits lecture-selected - emits the selected lectures index in the list
 */
export default {};
</script>
<script setup lang="ts">
import type { Lecture } from "@/parser";

const props = defineProps<{ lectures: Lecture[] }>();
const emit = defineEmits<{
    (e: "lecture-selected", index: number): void;
}>();

const updateSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("lecture-selected", +target.value);
};
</script>

<template>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Pick a Lecture</legend>
        <select class="select" @change="updateSelected">
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
