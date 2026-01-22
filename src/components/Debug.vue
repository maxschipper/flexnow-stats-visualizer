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
    <div>
        <div v-if="lectures.length === 0">Load lectures to show debug output</div>

        <div v-else>
            <pre>{{ JSON.stringify(lectures, null, 2) }} </pre>
        </div>
    </div>
</template>
