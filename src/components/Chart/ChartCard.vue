<script setup lang="ts">
const { heading = "missing heading prop" } = defineProps<{ heading: string }>();
</script>

<template>
    <div class="p-4 bg-base-200 rounded-box shadow-lg">
        <h3 class="font-bold pb-4">{{ heading }}</h3>
        <div class="">
            <slot />
        </div>
    </div>
</template>
