import type { StudyRow, Binary } from "../types";

function Cell({ v }: { v: Binary }) {
  if (v === "") return <td className="border px-2 py-1 text-center text-slate-300">—</td>;
  const cls = v === 0
    ? "bg-green-200 text-green-900"
    : "bg-red-200 text-red-900";
  return (
    <td className={`border px-2 py-1 text-center font-medium ${cls}`}>{v}</td>
  );
}

export function ResultsTable({ rows }: { rows: StudyRow[] }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-auto">
      <table className="min-w-[1400px] text-xs border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th rowSpan={2} className="border px-2 py-1">№</th>
            <th rowSpan={2} className="border px-2 py-1 text-left">study</th>

            <th colSpan={3} className="border px-2 py-1 bg-blue-100">Позвоночник</th>
            <th colSpan={2} className="border px-2 py-1 bg-amber-100">Проксимальный отдел правого бедра</th>
            <th colSpan={2} className="border px-2 py-1 bg-emerald-100">Проксимальный отдел левого бедра</th>
            <th colSpan={4} className="border px-2 py-1 bg-purple-100">Итог</th>
            <th colSpan={5} className="border px-2 py-1 bg-slate-200">Общий</th>
          </tr>
          <tr>
            <th className="border px-2 py-1">корректная укладка</th>
            <th className="border px-2 py-1">ось (&lt;5°)</th>
            <th className="border px-2 py-1">посторонние предметы</th>

            <th className="border px-2 py-1">позиционирование / ротация</th>
            <th className="border px-2 py-1">область интересов</th>

            <th className="border px-2 py-1">позиционирование / ротация</th>
            <th className="border px-2 py-1">область интересов</th>

            <th className="border px-2 py-1">Позвоночник</th>
            <th className="border px-2 py-1">Правое бедро</th>
            <th className="border px-2 py-1">Левое бедро</th>
            <th className="border px-2 py-1">Комментарий</th>

            <th className="border px-2 py-1">Позвоночник</th>
            <th className="border px-2 py-1">Правое бедро</th>
            <th className="border px-2 py-1">Левое бедро</th>
            <th className="border px-2 py-1">Итог</th>
            <th className="border px-2 py-1">Вердикт</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={r.study_uid} className="hover:bg-slate-50">
              <td className="border px-2 py-1 text-center">{i + 1}</td>
              <td className="border px-2 py-1 font-mono text-[10px]">{r.study_uid}</td>

              <Cell v={r.spine_correct_positioning} />
              <Cell v={r.spine_axis_alignment} />
              <Cell v={r.spine_artifacts} />

              <Cell v={r.hip_r_positioning} />
              <Cell v={r.hip_r_roi} />

              <Cell v={r.hip_l_positioning} />
              <Cell v={r.hip_l_roi} />

              <Cell v={r.result_spine} />
              <Cell v={r.result_hip_r} />
              <Cell v={r.result_hip_l} />
              <td className="border px-2 py-1">{r.comment}</td>

              <td className="border px-2 py-1 text-center">{r.score_spine}</td>
              <td className="border px-2 py-1 text-center">{r.score_hip_r}</td>
              <td className="border px-2 py-1 text-center">{r.score_hip_l}</td>
              <td className="border px-2 py-1 text-center font-semibold">{r.total_score}</td>
              <td className={`border px-2 py-1 text-center font-semibold ${
                r.verdict === "Патология"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}>
                {r.verdict}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}