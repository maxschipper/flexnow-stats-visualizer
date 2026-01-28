<script lang="ts">
/**
 * HTML file input to upload the file "`FlexNow Studentenschnittstelle.html`"
 *
 * @emits lectures-loaded - propagates the new `Lecture[]` list  - this needs to call a function that will replace the old lecture data with this new data
 */
export default {};
</script>
<script setup lang="ts">
import { useLectures } from "@/composables/useLectures";
import type { Lecture } from "@/types";
import { extractLecturesFromHtml } from "@/utils/parser";
import { ref } from "vue";

const { setLectures } = useLectures();

const error = ref<string>("");

const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const text = await file.text();

        try {
            const parsedLectures: Lecture[] = extractLecturesFromHtml(text);
            error.value = "";
            console.log("emitting lectures-loaded event");
            setLectures(parsedLectures);
        } catch (e: any) {
            console.error(e);
            error.value = e.message;
        }
    }
};
</script>

<template>
    <div>
        <div v-if="error" class="text-error">Error: {{ error }}</div>
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Upload your FlexNow HTML file</legend>
            <input type="file" @change="handleFileUpload" accept=".html" class="file-input" />
            <label class="label">No file? Try with Demo Data</label>
        </fieldset>
    </div>
</template>
