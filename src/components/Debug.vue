<script lang="ts">
/**
 * renders a list of lectures as formatted JSON
 * @prop {Lecture[]} lectures - the lectures to render
 */
export default {};
</script>

<script setup lang="ts">
import type { Lecture } from "@/parser";

defineProps<{ lectures: Lecture[] }>();
</script>

<template>
    <div v-if="lectures.length === 0">Load lectures to show debug output</div>

    <div v-else class="collapse collapse-arrow">
        <input type="checkbox" />
        <!-- <div class="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">
                    {{ lecture.id }}
                </div> -->
        <div class="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Debug JSON</div>
        <pre class="collapse-content text-xs">{{ JSON.stringify(lectures, null, 2) }} </pre>
    </div>
</template>
