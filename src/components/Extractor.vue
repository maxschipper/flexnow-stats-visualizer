<script setup lang="ts">
import { ref } from "vue";
import { extractLecturesFromHtml, type Lecture } from "../parser";

const lectures = ref<Lecture[]>([]);
const error = ref<string>("");

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const text = await file.text();

        try {
            lectures.value = extractLecturesFromHtml(text);
            error.value = "";
        } catch (e: any) {
            error.value = e.message;
        }
    }
};
</script>

<template>
    <div>
        <h3>FlexNow Importer</h3>
        <input type="file" @change="handleFileUpload" accept=".html" />

        <div v-if="error" style="color: red">{{ error }}</div>

        <div>
            <pre>{{ JSON.stringify(lectures, null, 2) }} </pre>
        </div>
    </div>
</template>
