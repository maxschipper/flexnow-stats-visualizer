<script setup lang="ts">
import { ref } from "vue";
import Debug from "./components/Debug.vue";
import Details from "./components/Details.vue";
import ExampleData from "./components/ExampleData.vue";
import FileInput from "./components/FileInput.vue";
import RemoveData from "./components/RemoveData.vue";
import type { Lecture } from "./parser";

const lectures = ref<Lecture[]>([]);

const updateLectures = (newLectures: Lecture[]) => {
    console.log("Updating lecutres", newLectures);
    lectures.value = newLectures;
};
</script>

<template>
    <div class="m-8">
        <div class="my-8">
            <FileInput @lectures-loaded="updateLectures" />
            <ExampleData @lectures-loaded="updateLectures" />
            <RemoveData @lectures-loaded="updateLectures" />
        </div>

        <div>
            <Details :lectures />
            <Debug :lectures />
        </div>
    </div>
</template>
