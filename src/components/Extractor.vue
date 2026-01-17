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
        <h1>FlexNow Importer</h1>
        <input type="file" @change="handleFileUpload" accept=".html" />

        <div v-if="error" style="color: red">{{ error }}</div>

        <div v-for="lecture in lectures" :key="lecture.id" class="lecture-card">
            <h3>{{ lecture.name }}</h3>

            <p>Grade: {{ lecture.grade }}</p>

            <p v-if="lecture.stats.participants">Participants: {{ lecture.stats.participants }}</p>

            <p v-if="lecture.stats.graded">Graded: {{ lecture.stats.graded }}</p>

            <p v-if="lecture.stats.not_yet_graded">
                Not yet graded: {{ lecture.stats.not_yet_graded }}
            </p>

            <p v-if="lecture.stats.passed">passed: {{ lecture.stats.passed }}</p>

            <p v-if="lecture.stats.other">Other: {{ lecture.stats.other }}</p>

            <p v-if="lecture.stats.graded_but_not_passed">
                graded but not passed: {{ lecture.stats.graded_but_not_passed }}
            </p>

            <p v-if="lecture.stats.average_grade">
                average grade: {{ lecture.stats.average_grade }}
            </p>

            <p v-if="lecture.stats.median_grade">median grade: {{ lecture.stats.median_grade }}</p>

            <p v-if="lecture.stats.standard_deviation_grade">
                standard deviation grade:
                {{ lecture.stats.standard_deviation_grade }}
            </p>

            <p v-if="lecture.stats.average_points">
                Average Points: {{ lecture.stats.average_points }}
            </p>
        </div>
    </div>
</template>
