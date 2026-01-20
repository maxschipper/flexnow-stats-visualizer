<script setup lang="ts">
import { ref } from "vue";
import Debug from "./components/Debug.vue";
import FileInput from "./components/FileInput.vue";
import type { Lecture } from "./parser";

const lectures = ref<Lecture[]>([]);

const updateLectures = (newLectures: Lecture[]) => {
    console.log("Updating lecutres", newLectures);
    lectures.value = newLectures;
};
</script>

<template>
    <div class="my-8">
        <FileInput @lectures-loaded="updateLectures" />
    </div>

    <div>
        <Debug :lectures />
    </div>
</template>
