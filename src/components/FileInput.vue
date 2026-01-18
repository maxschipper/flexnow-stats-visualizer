<script lang="ts">
/**
 * HTML file input to upload the file "`FlexNow Studentenschnittstelle.html`"
 *
 * @emits lectures-loaded - propagates the new `Lecture[]` list and needs to be handled in the parent component
 */
export default {};
</script>

<script setup lang="ts">
import { ref } from "vue";
import { extractLecturesFromHtml, type Lecture } from "../parser";

const emit = defineEmits<{
    (e: "lectures-loaded", data: Lecture[]): void;
}>();

const error = ref<string>("");

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const text = await file.text();

        try {
            const parsedLectures = extractLecturesFromHtml(text);
            error.value = "";
            console.log("emitting lectures-loaded event");
            emit("lectures-loaded", parsedLectures);
        } catch (e: any) {
            console.error(e);
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
    </div>
</template>
