<script lang="ts">
/**
 *
 */
export default {};
</script>

<script setup lang="ts">
import { useLectures } from "@/composables/useLectures";

const { clearLectures } = useLectures();
</script>

<template>
  <button @click="clearLectures" class="btn">Remove Data</button>
</template>
