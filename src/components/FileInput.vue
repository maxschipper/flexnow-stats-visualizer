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

import { useLectures } from "@/composables/useLectures";
import type { Lecture } from "@/types";
import { extractLecturesFromHtml } from "@/utils/parser";

const { setLectures, loadDemoData } = useLectures();

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
      <input
        type="file"
        class="file-input file-input-neutral file-input-md"
        @change="handleFileUpload"
        accept=".html"
      />
      <label class="label"
        >No file? <a @click="loadDemoData" class="link link-info">Try with Demo Data</a></label
      >
    </fieldset>
  </div>
</template>
