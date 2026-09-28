import type { StudyRow } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "/api/process";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "1";

const rand = () => (Math.random() > 0.5 ? 1 : 0) as 0 | 1;

function makeMockRow(_: File, i: number): StudyRow {
  return {
    study_uid: `2.25.${Math.floor(Math.random() * 1e15)}`,
    spine_correct_positioning: rand(),
    spine_axis_alignment: rand(),
    spine_artifacts: rand(),
    hip_r_positioning: i % 2 ? rand() : "",
    hip_r_roi: i % 2 ? rand() : "",
    hip_l_positioning: i % 2 ? rand() : "",
    hip_l_roi: i % 2 ? rand() : "",
    result_spine: rand(),
    result_hip_r: rand(),
    result_hip_l: rand(),
    comment: Math.random() > 0.7 ? "сколиоз" : "",
    score_spine: Math.floor(Math.random() * 50) + 20,
    score_hip_r: Math.floor(Math.random() * 50) + 20,
    score_hip_l: Math.floor(Math.random() * 50) + 20,
    total_score: 50,
    verdict: Math.random() > 0.5 ? "Норма" : "Патология",
  };
}

export async function processDicom(files: File[]): Promise<StudyRow[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    return files.map(makeMockRow);
  }

  const form = new FormData();
  files.forEach((f) => form.append("files", f, f.name));

  const res = await fetch(API_URL, { method: "POST", body: form });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  return (await res.json()) as StudyRow[];
}