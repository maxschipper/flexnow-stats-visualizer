<script setup lang="ts">
const { heading = "missing heading prop" } = defineProps<{ heading: string }>();
</script>

<template>
  <div class="bg-base-200 rounded-box p-4 shadow-lg">
    <h3 class="pb-4 font-bold">{{ heading }}</h3>
    <div class="">
      <slot />
    </div>
  </div>
</template>
