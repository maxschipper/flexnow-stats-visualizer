<script lang="ts">
/**
 * Button to use example data if one wants to test the web app without supplying their own FlexNow data
 *
 * @emits lectures-loaded - propagates the `Lecture[]` list containing the example data - this needs to call a function that will replace the old lecture data with this new data
 */
export default {};
</script>

<script setup lang="ts">
import rawExampleData from "@/assets/exampleData.json";
import type { Lecture } from "@/parser";

const exampleData = rawExampleData as Lecture[];

const emit = defineEmits<{
    (e: "lectures-loaded", data: Lecture[]): void;
}>();

function emitExampleData() {
    emit("lectures-loaded", exampleData);
}
</script>

<template>
    <button @click="emitExampleData" class="btn">Use example data</button>
</template>
