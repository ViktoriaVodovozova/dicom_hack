import { useRef, useState } from "react";

type Props = {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
};

export function UploadZone({ onFiles, disabled }: Props) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (list: FileList | null) => {
    if (!list) return;
    onFiles(Array.from(list));
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-colors
        ${drag ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white"}
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".dcm,application/dicom"
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
      <p className="text-slate-600">
        Перетащите DICOM-файлы сюда или нажмите, чтобы выбрать
      </p>
    </div>
  );
}