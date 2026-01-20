<script lang="ts" setup>
import { BubbleChart, LegendPosition } from "vue-chrts";

const bubbleChartData = [
    {
        id: "Drama-Feb",
        title: "Drama",
        month: 2,
        viewingHours: 2.9,
        subscribers: 48,
    },
    {
        id: "Drama-Mar",
        title: "Drama",
        month: 3,
        viewingHours: 3.1,
        subscribers: 52,
    },
    /* ... */
    {
        id: "Horror-Sep",
        title: "Horror",
        month: 9,
        viewingHours: 1.6,
        subscribers: 27,
    },
    {
        id: "Horror-Oct",
        title: "Horror",
        month: 10,
        viewingHours: 2.3,
        subscribers: 39,
    },
];

const categories1 = {
    Drama: { name: "Drama", color: "var(--color-red-400)" },
    "Action/Thriller": {
        name: "Action/Thriller",
        color: "var(--color-orange-400)",
    },
    Comedy: { name: "Comedy", color: "var(--color-yellow-400)" },
    Documentary: { name: "Documentary", color: "var(--color-blue-400)" },
    Romance: { name: "Romance", color: "var(--color-pink-400)" },
    "Sci-Fi/Fantasy": {
        name: "Sci-Fi/Fantasy",
        color: "var(--color-green-400)",
    },
    Horror: { name: "Horror", color: "var(--color-purple-400)" },
};

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function formatNumber(tick: number | Date): string {
    return typeof tick === "number" ? tick.toFixed(1) : String(tick);
}

const xAccessor1 = (d: any) => d.month;
const yAccessor1 = (d: any) => d.viewingHours;
const sizeAccessor1 = (d: any) => d.subscribers;
</script>

<template>
    <BubbleChart
        :data="bubbleChartData"
        :height="230"
        :categories="categories1"
        category-key="title"
        :x-accessor="xAccessor1"
        :y-accessor="yAccessor1"
        :y-domain-line="false"
        :size-accessor="sizeAccessor1"
        :legend-position="LegendPosition.BottomRight"
        :x-num-ticks="12"
        :x-formatter="(tick: number) => monthNames[tick - 1] ?? String(tick)"
        :y-formatter="(v: number | Date) => `${formatNumber(v)}B hrs`"
    />
</template>
