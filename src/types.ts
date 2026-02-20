export type ExamStats = {
  participants: number | null;
  not_yet_graded: number | null;
  graded: number | null;
  passed: number | null;
  other: number | null;
  graded_but_not_passed: number | null;
  average_grade: number | null;
  median_grade: number | null;
  standard_deviation_grade: number | null;
  average_points: number | null;
};

// TODO: maybe add attempts object?
export type Lecture = {
  id: string;
  name: string | null;
  grade: number | null;
  points: number | null;
  passed: boolean | null;
  ects: number | null;
  stats: ExamStats | null;
};
