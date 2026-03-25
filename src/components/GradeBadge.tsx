import type { Grade } from "@/types/keyword";

const gradeStyles: Record<Grade, string> = {
  A: "grade-badge grade-A",
  B: "grade-badge grade-B",
  C: "grade-badge grade-C",
  D: "grade-badge grade-D",
  "N/A": "grade-badge grade-NA",
};

interface GradeBadgeProps {
  grade: Grade;
  label?: string;
}

export default function GradeBadge({ grade, label }: GradeBadgeProps) {
  return (
    <span className={gradeStyles[grade]}>
      {grade}
      {label && <span className="ml-1 font-normal">{label}</span>}
    </span>
  );
}
