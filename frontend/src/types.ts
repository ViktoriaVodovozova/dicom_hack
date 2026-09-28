export type Binary = 0 | 1 | "";

export type StudyRow = {
  study_uid: string;

  spine_correct_positioning: Binary;
  spine_axis_alignment: Binary;
  spine_artifacts: Binary;

  hip_r_positioning: Binary;
  hip_r_roi: Binary;

  hip_l_positioning: Binary;
  hip_l_roi: Binary;

  result_spine: Binary;
  result_hip_r: Binary;
  result_hip_l: Binary;
  comment: string;

  score_spine: number | "";
  score_hip_r: number | "";
  score_hip_l: number | "";
  total_score: number | "";
  verdict: "Норма" | "Патология" | "";
};