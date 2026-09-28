import { useState } from "react";
import { processDicom } from "./api";
import { exportXlsx } from "./exportXlsx";
import type { StudyRow } from "./types";
import { UploadZone } from "./components/UploadZone";
import { Toolbar } from "./components/Toolbar";
import { ResultsTable } from "./components/ResultsTable";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [rows, setRows] = useState<StudyRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleProcess() {
    setLoading(true);
    setError(null);
    try {
      setRows(await processDicom(files));
    } catch (e: any) {
      setError(e?.message ?? "Ошибка обработки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-xl font-bold mb-4">
        Оценка качества денситометрических исследований
      </h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6 space-y-4">
        <UploadZone onFiles={setFiles} disabled={loading} />
        <Toolbar
          count={files.length}
          loading={loading}
          hasResults={rows.length > 0}
          onProcess={handleProcess}
          onExport={() => exportXlsx(rows)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>

      {rows.length > 0 && <ResultsTable rows={rows} />}
    </div>
  );
}