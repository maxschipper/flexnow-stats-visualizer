<script lang="ts">
/**
 * Button to load demo data if one wants to test the web app without supplying their own FlexNow data
 */
export default {};
</script>

<script setup lang="ts">
import { useLectures } from "@/composables/useLectures";

const { loadDemoData } = useLectures();
</script>

<template>
    <button @click="loadDemoData" class="btn">Use example data</button>
</template>
