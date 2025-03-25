import { usePdfViewer } from "./PdfViewerProvider";

export function PdfAnnotation() {
  const { annotations } = usePdfViewer();

  return (
    <>
      {annotations.map((annotation) => (
        <div
          style={{
            position: "absolute",
            top: annotation.scrollTop,
            left: annotation.x,
            width: annotation.width,
            height: annotation.height,
          }}
          className="bg-red-400 select-text border border-input z-30 bg-opacity-15"
          key={annotation.id}
        >
          {/* 渲染注释内容 */}
        </div>
      ))}
    </>
  );
}
