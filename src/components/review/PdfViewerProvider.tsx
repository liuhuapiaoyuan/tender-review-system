import { PDFDocumentProxy } from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
type PDFViewerApplication = PDFDocumentProxy;

type searchTextPositionsResult = {
  page: number;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
async function searchTextPositions(
  pdfDocument: PDFDocumentProxy,
  searchText: string
) {
  const results: searchTextPositionsResult[] = [];

  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const textContent = await page.getTextContent();

    // @ts-expect-error NONE
    const matches: TextItem[] = textContent.items.filter((item) => {
      if ("str" in item) {
        return item.str.includes(searchText);
      }
    });
    if (matches.length > 0) {
      const viewport = page.getViewport({ scale: 1.0 });

      matches.forEach((match) => {
        const transform = match.transform;
        results.push({
          page: i,
          text: match.str,
          x: transform[4], // 水平坐标
          y: viewport.height - transform[5], // 转换为从上到下的坐标
          width: match.width,
          height: match.height,
        });
      });
    }
  }

  return results;
}
// PDF查看器的上下文接口
interface PdfViewerContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  pdf: PDFViewerApplication;
  setPdf: (pdf: PDFViewerApplication) => void;
  /* 检索并定位 */
  search: (keyword: string) => Promise<searchTextPositionsResult[]>;

  /* 跳转到指定页码 */
  searchLocation: (keyword: string) => Promise<void>;
  goToPage: (pageNumber: number) => Promise<void>;
}

// 创建PDF查看器上下文
const PdfViewerContext = createContext<PdfViewerContextType | undefined>(
  undefined
);

// PDF查看器Provider属性接口
interface PdfViewerProviderProps {
  children: ReactNode;
}

// PDF查看器Provider组件
export const PdfViewerProvider = ({ children }: PdfViewerProviderProps) => {
  const [pdf, setPdf] = useState<PDFViewerApplication>();
  const containerRef = useRef<HTMLDivElement>(null);
  /* 检索并定位 */
  const search = async (keyword: string) => {
    if (!pdf) return;
    return searchTextPositions(pdf, keyword);
  };
  /* 检索并跳转 */
  const searchLocation = async (keyword: string) => {
    if (!pdf) return;
    const data = await searchTextPositions(pdf, keyword);
    if (data[0]) {
      /* 先看在第几页，然后前面一个个加进去 */
      /* 先判断单页的高度 */
      console.log(data);
    }
  };
  /* 跳转到指定页码 */
  const goToPage = async (pageNumber: number) => {
    if (!pdf) return;
    const page = pdf.getPage(pageNumber);
  };
  return (
    <PdfViewerContext.Provider
      value={{
        containerRef,
        pdf,
        setPdf,
        search,
        goToPage,
        searchLocation,
      }}
    >
      {children}
    </PdfViewerContext.Provider>
  );
};

// 自定义Hook用于访问PDF查看器上下文
export const usePdfViewer = () => {
  const context = useContext(PdfViewerContext);
  if (context === undefined) {
    throw new Error("usePdfViewer must be used within a PdfViewerProvider");
  }
  return context;
};
