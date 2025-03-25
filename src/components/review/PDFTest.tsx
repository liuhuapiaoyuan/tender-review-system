import { Button } from "../ui/button";
import { usePdfViewer } from "./PdfViewerProvider";

export function PDFTest() {
  const { search, addSearchAnnotation } = usePdfViewer();
  return (
    <Button
      onClick={async () => {
        const list = await search("集成消息提醒");
        const item = list[0];
        addSearchAnnotation(item);
      }}
    >
      测试
    </Button>
  );
}
