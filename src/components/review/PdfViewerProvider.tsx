import { PDFDocumentProxy } from "pdfjs-dist";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Annotation,
  searchTextPositions,
  SearchTextPositionsResult,
} from "./util";
type PDFViewerApplication = PDFDocumentProxy;

// PDF查看器的上下文接口
interface PdfViewerContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  pdf: PDFViewerApplication;
  setPdf: (pdf: PDFViewerApplication) => void;
  /* 检索并定位 */
  search: (keyword: string) => Promise<SearchTextPositionsResult[]>;
  /* 跳转到指定页码 */
  searchLocation: (keyword: string) => Promise<void>;
  goToPage: (pageNumber: number) => Promise<void>;

  annotations: Annotation[];
  addAnnotation: (annotation: Omit<Annotation, "id">) => void;
  addSearchAnnotation: (
    searchResult: SearchTextPositionsResult
  ) => Promise<void>;
  removeAnnotation: (id: string) => void;
  clearAnnotations: () => void;
  getAnnotations: () => Annotation[];
}

// 创建PDF查看器上下文
const PdfViewerContext = createContext<PdfViewerContextType | undefined>(
  undefined
);

type AnnotationAction =
  | { type: "ADD"; payload: Omit<Annotation, "id"> }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" };

const annotationReducer = (
  state: Annotation[],
  action: AnnotationAction
): Annotation[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { ...action.payload, id: Math.random().toString(36).substr(2, 9) },
      ];
    case "REMOVE":
      return state.filter((annotation) => annotation.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

// PDF查看器Provider属性接口
interface PdfViewerProviderProps {
  children: ReactNode;
}

// PDF查看器Provider组件
export const PdfViewerProvider = ({ children }: PdfViewerProviderProps) => {
  const [pdf, setPdf] = useState<PDFViewerApplication>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [annotations, dispatch] = useReducer(annotationReducer, []);

  /* 检索并定位 */
  const search = useCallback(
    async (keyword: string) => {
      if (!pdf) return;
      return searchTextPositions(pdf, keyword);
    },
    [pdf]
  );

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

  const addAnnotation = useCallback((annotation: Omit<Annotation, "id">) => {
    dispatch({ type: "ADD", payload: annotation });
  }, []);
  const addSearchAnnotation = useCallback(
    async (searchResult: SearchTextPositionsResult) => {
      const item = searchResult;
      let height = item.y * 1.5 - item.height * 1.5;
      for (let i = 1; i < item.page; i++) {
        const itemPage = await pdf.getPage(i + 1);
        height += itemPage.getViewport({ scale: 1.5 }).height;
      }
      addAnnotation({
        page: item.page,
        type: "",
        x: item.x * 1.5,
        y: item.y * 1.5,
        scrollTop: height,
        width: item.width * 1.5,
        height: item.height * 1.5,
        text: item.text,
        color: "#f00",
      });
    },
    [pdf]
  );

  const removeAnnotation = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const clearAnnotations = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const getAnnotations = useCallback(() => annotations, [annotations]);

  return (
    <PdfViewerContext.Provider
      value={{
        containerRef,
        pdf,
        setPdf,
        search,
        goToPage,
        searchLocation,
        annotations,
        addAnnotation,
        addSearchAnnotation,
        removeAnnotation,
        clearAnnotations,
        getAnnotations,
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
