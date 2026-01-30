<script setup lang="ts">
import Debug from "./components/Debug.vue";
import Details from "./components/Details.vue";
import Hero from "./components/Hero.vue";
import RemoveData from "./components/RemoveData.vue";
import UnovisSankey from "./components/Unovis/UnovisSankey.vue";
import UnovisScatter from "./components/Unovis/UnovisScatter.vue";
import { useLectures } from "./composables/useLectures";

const { lectures } = useLectures();
</script>

<template>
    <Hero v-if="lectures.length === 0" />
    <div v-else class="m-8">
        <div>
            <RemoveData />
            <Details />
            <Debug />
        </div>

        <div>
            <UnovisScatter />
            <UnovisSankey />
        </div>
    </div>
</template>
