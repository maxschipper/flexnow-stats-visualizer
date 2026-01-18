<script setup lang="ts">
import type { Lecture } from "../parser";

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
