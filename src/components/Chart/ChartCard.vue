<script setup lang="ts">
const { heading = "missing heading prop" } = defineProps<{ heading: string }>();
</script>

<template>
    <div class="m-4 p-3 bg-base-200 rounded-box shadow">
        <h3 class="font-bold mb-4 ml-4">{{ heading }}</h3>
        <slot />
    </div>
</template>
