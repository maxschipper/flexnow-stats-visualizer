<script lang="ts">
/**
 * A dropdown selector for choosing a specific Lecture.
 *
 * Use this on charts that only work with one lecture at a time.
 * Use `v-model:selectedLecture` to bind to the selected Lecture object directly.
 *
 * This component handles "smart selection":
 * 1. It filters out lectures that do not have statistics.
 * 2. It automatically selects the first valid lecture if the provided list changes
 * or if the current selection becomes invalid.
 *
 * @model {Lecture | null} selectedLecture - The currently selected Lecture object (two-way binding).
 */
export default {};
</script>
<script setup lang="ts">
import { InfoIcon } from "lucide-vue-next";
import { watch } from "vue";

import { useLectures } from "@/composables/useLectures";
import type { Lecture } from "@/types";

const { lectures } = useLectures();

const selected = defineModel<Lecture | null>("selectedLecture", {
  default: null,
});

watch(
  lectures,
  (newLectures) => {
    if (newLectures.length === 0) {
      selected.value = null;
      return;
    }

    const isCurrentSelectionValid =
      selected.value && newLectures.some((l) => l.id === selected.value?.id);

    if (!isCurrentSelectionValid) {
      selected.value = newLectures.find((l) => l.stats !== null) || null;
    }
  },
  { immediate: true }, // run immediately on mount to handle the initial list
);
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend pl-1.5">Pick a Lecture</legend>
    <select class="select bg-base-100" v-model="selected">
      <template v-for="lecture in lectures" :key="lecture.id">
        <option v-if="lecture.stats !== null" :value="lecture">
          {{ lecture.id }}
        </option>
      </template>
    </select>
    <span class="label pl-1.5">
      <InfoIcon :size="14" />This Chart only works with one lecture at a time.
    </span>
  </fieldset>
</template>
