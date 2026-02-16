<script lang="ts">
/**
 * renders the lectures as formatted JSON
 */
export default {};
</script>

<script setup lang="ts">
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();
</script>

<template>
  <div v-if="lectures.length === 0">Load lectures to show debug output</div>
  <details
    v-else
    name="accordion-group-1"
    class="collapse-arrow bg-base-200 border-base-300 collapse"
  >
    <summary class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
      Debug JSON
    </summary>
    <pre class="collapse-content text-xs">{{ JSON.stringify(lectures, null, 2) }} </pre>
  </details>
</template>
