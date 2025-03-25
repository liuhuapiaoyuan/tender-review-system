import { PDFDocumentProxy } from "pdfjs-dist";

/**
 * 注解
 */
export type Annotation = {
    page: number;
    type: string;
    x: number;
    y: number;
    /* 页面位置 */
    scrollTop: number;
    width: number;
    height: number;
    text: string;
    color: string;
    id: string;
  };


export type SearchTextPositionsResult = {
    page: number;
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  export async function searchTextPositions(
    pdfDocument: PDFDocumentProxy,
    searchText: string
  ) {
    const results: SearchTextPositionsResult[] = [];
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