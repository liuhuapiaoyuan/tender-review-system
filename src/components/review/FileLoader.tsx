import { useToast } from "@/hooks/use-toast";
import pdf2html from "pdf2html";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useOfficeEditor } from "../office-editor/OfficeCanvasProvider";
async function convertPdfToHtml(pdfFilePath) {
  try {
    const html = await pdf2html.html(pdfFilePath);
    console.log(html);
    return html;
  } catch (error) {
    console.error("Error converting PDF to HTML:", error);
    throw error;
  }
}

export function FileLoader() {
  const [searchParams] = useSearchParams();
  const fileUrl = searchParams.get("file");
  const { toast } = useToast();
  const { editor } = useOfficeEditor();
  useEffect(() => {
    convertPdfToHtml(fileUrl)
      .then((content) => {
        editor?.command?.executeSetHTML(content);
      })
      .catch(() => {
        toast({
          title: "失败",
          description: "PDF文件读取失败",
          variant: "destructive",
        });
      });
  }, [fileUrl, editor]);
  return <div>{fileUrl}</div>;
}
