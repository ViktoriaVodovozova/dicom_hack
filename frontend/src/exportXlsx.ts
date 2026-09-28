import * as XLSX from "xlsx";
import type { StudyRow } from "./types";

export function exportXlsx(rows: StudyRow[], filename = "result.xlsx") {
  const header1 = [
    "", "",
    "Позвоночник", "", "",
    "Проксимальный отдел правого бедра", "",
    "Проксимальный отдел левого бедра", "",
    "Итог", "", "", "",
    "Общий", "", "", "", "",
  ];

  const header2 = [
    "№", "study",
    "корректная укладка",
    "правильно выровнена ось (до 5)",
    "наличие посторонних предметов, артефактов или наложений",
    "позиционирование / ротация",
    "корректность области интересов",
    "позиционирование / ротация",
    "корректность области интересов",
    "Позвоночник",
    "Проксимальный отдел правого бедра",
    "Проксимальный отдел левого бедра",
    "Комментарий",
    "Позвоночник",
    "Проксимальный отдел правого бедра",
    "Проксимальный отдел левого бедра",
    "Итог",
    "Вердикт",
  ];

  const body = rows.map((r, i) => [
    i + 1, r.study_uid,
    r.spine_correct_positioning, r.spine_axis_alignment, r.spine_artifacts,
    r.hip_r_positioning, r.hip_r_roi,
    r.hip_l_positioning, r.hip_l_roi,
    r.result_spine, r.result_hip_r, r.result_hip_l, r.comment,
    r.score_spine, r.score_hip_r, r.score_hip_l, r.total_score, r.verdict,
  ]);

  const ws = XLSX.utils.aoa_to_sheet([header1, header2, ...body]);

  ws["!merges"] = [
    { s: { r: 0, c: 0 },  e: { r: 1, c: 0 } },
    { s: { r: 0, c: 1 },  e: { r: 1, c: 1 } },
    { s: { r: 0, c: 2 },  e: { r: 0, c: 4 } },
    { s: { r: 0, c: 5 },  e: { r: 0, c: 6 } },
    { s: { r: 0, c: 7 },  e: { r: 0, c: 8 } },
    { s: { r: 0, c: 9 },  e: { r: 0, c: 12 } },
    { s: { r: 0, c: 13 }, e: { r: 0, c: 17 } },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Results");
  XLSX.writeFile(wb, filename);
}