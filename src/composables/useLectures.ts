import rawDemoData from "@/assets/exampleData.json";
import type { Lecture } from "@/types";
import { ref } from "vue";

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
    lectures,
    setLectures,
    clearLectures,
    loadDemoData,
  };
}
