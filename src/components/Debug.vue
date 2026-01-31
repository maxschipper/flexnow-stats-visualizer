<script lang="ts">
/**
 * renders a list of lectures as formatted JSON
 */
export default {};
</script>

<script setup lang="ts">
import { useLectures } from "@/composables/useLectures";

const { lectures } = useLectures();
</script>

<template>
  <div v-if="lectures.length === 0">Load lectures to show debug output</div>
  <div v-else class="collapse-arrow collapse">
    <input type="checkbox" />
    <div class="collapse-title ps-12 pe-4 font-semibold after:start-5 after:end-auto">
      Debug JSON
    </div>
    <pre class="collapse-content text-xs">{{ JSON.stringify(lectures, null, 2) }} </pre>
  </div>
</template>
