<script lang="ts">
/**
 *
 *
 * @emits lectures-loaded - propagates the `Lecture[]` list containing the example data - this needs to call a function that will replace the old lecture data with this new data
 */
export default {};
</script>

<script setup lang="ts">
import type { Lecture } from "@/parser";

const emit = defineEmits<{
    (e: "lectures-loaded", data: Lecture[]): void;
}>();

function emitEmptyData() {
    emit("lectures-loaded", []);
}
</script>

<template>
    <button @click="emitEmptyData" class="btn">Remove Data</button>
</template>
