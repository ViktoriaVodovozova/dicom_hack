type Props = {
  count: number;
  loading: boolean;
  hasResults: boolean;
  onProcess: () => void;
  onExport: () => void;
};

export function Toolbar({ count, loading, hasResults, onProcess, onExport }: Props) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-slate-500">
        Выбрано файлов: <b>{count}</b>
      </span>

      <button
        onClick={onProcess}
        disabled={loading || count === 0}
        className="px-4 py-1.5 rounded-lg bg-blue-600 text-white disabled:opacity-50"
      >
        {loading ? "Обработка…" : "Обработать"}
      </button>

      {hasResults && (
        <button
          onClick={onExport}
          className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white ml-auto"
        >
          Скачать .xlsx
        </button>
      )}
    </div>
  );
}