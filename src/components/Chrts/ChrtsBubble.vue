<script lang="ts" setup>
import type { Lecture } from "@/types";
import { computed } from "vue";
import { BubbleChart, LegendPosition } from "vue-chrts";

interface BubbleCategory {
    name: string;
    color: string;
}

interface BubbleCategories {
    [key: string]: BubbleCategory;
}

const props = defineProps<{ lectures: Lecture[] }>();

const mydata = computed(() =>
    props.lectures.flatMap((lec) => {
        if (!lec.stats?.graded || !lec.stats?.graded_but_not_passed) return [];
        return [
            {
                id: lec.id,
                title: lec.name,
                difficulty: lec.stats.graded_but_not_passed / lec.stats.graded,
                performance: lec.grade,
                participants: lec.stats.participants,
            },
        ];
    }),
);

// const bubbleChartData = [
//     {
//         id: "Drama-Feb",
//         title: "Drama",
//         month: 2,
//         viewingHours: 2.9,
//         subscribers: 48,
//     },
//     {
//         id: "Drama-Mar",
//         title: "Drama",
//         month: 3,
//         viewingHours: 3.1,
//         subscribers: 52,
//     },
//     // ...
//     {
//         id: "Horror-Sep",
//         title: "Horror",
//         month: 9,
//         viewingHours: 1.6,
//         subscribers: 27,
//     },
//     {
//         id: "Horror-Oct",
//         title: "Horror",
//         month: 10,
//         viewingHours: 2.3,
//         subscribers: 39,
//     },
// ];

// const categories1 = {
//     Drama: { name: "Drama", color: "var(--color-red-400)" },
//     "Action/Thriller": {
//         name: "Action/Thriller",
//         color: "var(--color-orange-400)",
//     },
//     Comedy: { name: "Comedy", color: "var(--color-yellow-400)" },
//     Documentary: { name: "Documentary", color: "var(--color-blue-400)" },
//     Romance: { name: "Romance", color: "var(--color-pink-400)" },
//     "Sci-Fi/Fantasy": {
//         name: "Sci-Fi/Fantasy",
//         color: "var(--color-green-400)",
//     },
//     Horror: { name: "Horror", color: "var(--color-purple-400)" },
// };
// const categories: BubbleCategories = {
//     "WiMa-B-002": { name: "WiMa-B-002", color: "var(--color-red-400)" },
//     "Inf-GRABS-B": { name: "Inf-GRABS-B", color: "var(--color-orange-400)" },
//     "MOBI-DBS-B": { name: "MOBI-DBS-B", color: "var(--color-yellow-400)" },
// };

const categories = computed(() => {
    const cats: BubbleCategories = {};
    const colors = [
        "var(--color-red-400)",
        "var(--color-orange-400)",
        "var(--color-yellow-400)",
        "var(--color-green-400)",
        "var(--color-blue-400)",
        "var(--color-purple-400)",
    ];

    mydata.value.forEach((item, index) => {
        cats[item.id] = {
            name: item.title!, // Use title for the legend instead of ID if preferred
            // Cycle through colors
            color: colors[index % colors.length]!,
        };
    });
    return cats;
});

const xAccessor = (d: any) => d.difficulty; // (failure rate)
const yAccessor = (d: any) => d.performance; // (user grade)
const sizeAccessor = (d: any) => d.participants;
</script>

<template>
    <pre> {{ mydata }} </pre>

    <BubbleChart
        :data="mydata"
        :height="500"
        :categories="categories"
        category-key="id"
        :xLabel="'Difficulty (failure rate)'"
        :x-accessor="xAccessor"
        :yLabel="'My Grade'"
        :y-accessor="yAccessor"
        :y-domain-line="true"
        :size-accessor="sizeAccessor"
        :sizeRange="[20, 40]"
        :legend-position="LegendPosition.TopRight"
        :x-num-ticks="12"
    />
    <!-- :x-formatter="(tick: number) => monthNames[tick - 1] ?? String(tick)"
        :y-formatter="(v: number | Date) => `${formatNumber(v)}B hrs`" -->
</template>
