<script setup lang="ts">
import FileInput from "./FileInput.vue";
import Debug from "./Debug.vue";

import { ref } from "vue";
import type { Lecture } from "../parser";

const lectures = ref<Lecture[]>([]);

const updateLectures = (newLectures: Lecture[]) => {
    console.log("Updating lecutres", newLectures);
    lectures.value = newLectures;
};
</script>

<template>
    <div>
        <FileInput @lectures-loaded="updateLectures" />
        <Debug :lectures="lectures" />
    </div>
</template>
