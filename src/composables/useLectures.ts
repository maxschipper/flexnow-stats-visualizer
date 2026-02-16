/**
 * Global store for shared state for lectures.
 */
import { readonly, ref } from "vue";

import rawDemoData from "@/assets/exampleData.json";
import type { Lecture } from "@/types";

const lectures = ref<Lecture[]>([]);

export function useLectures() {
  const setLectures = (newLectures: Lecture[]) => {
    lectures.value = newLectures;
  };

  const clearLectures = () => {
    lectures.value = [];
  };

  const loadDemoData = () => {
    lectures.value = rawDemoData as Lecture[];
  };

  return {
    lectures: readonly(lectures),
    setLectures,
    clearLectures,
    loadDemoData,
  };
}
