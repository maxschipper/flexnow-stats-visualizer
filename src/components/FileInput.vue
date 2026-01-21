<script lang="ts">
/**
 * HTML file input to upload the file "`FlexNow Studentenschnittstelle.html`"
 *
 * @emits lectures-loaded - propagates the new `Lecture[]` list  - this needs to call a function that will replace the old lecture data with this new data
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
        <!-- <h3>FlexNow Importer</h3>
        <input type="file" @change="handleFileUpload" accept=".html" class="file-input" />
        <div v-if="error" style="color: red">{{ error }}</div> -->
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Upload your FlexNow HTML file</legend>
            <input type="file" @change="handleFileUpload" accept=".html" class="file-input" />
            <label class="label">it should be named FlexNow Studentenschnittstelle.html</label>
        </fieldset>
    </div>
</template>
