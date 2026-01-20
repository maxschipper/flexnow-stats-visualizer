<script setup lang="ts">
import { LineChart, LegendPosition } from "vue-chrts";

const data = [
    { month: "Jan", sales: 100 },
    { month: "Feb", sales: 120 },
    { month: "Mar", sales: 180 },
    { month: "Apr", sales: 110 },
    { month: "May", sales: 100 },
    { month: "Jun", sales: 160 },
];

// const categories: Record<string, BulletLegendItemInterface> = {
const categories = {
    sales: {
        name: "Sales",
        color: "#3b82f6",
    },
};

const height: number = 200;
</script>

<template>
    <LineChart
        :data="data"
        :categories="categories"
        :legendPosition="LegendPosition.TopCenter"
        :height
    />
</template>
