// PdfViewer.tsx
import { cn } from "@/lib/utils";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePdfViewer } from "./PdfViewerProvider";

const pdfWorkerUrl = new URL("/pdf/pdf.worker.mjs", import.meta.url).href;

// PDF.js 默认 worker 路径（必须设置）
//pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface PdfViewerProps {
  url: string; // PDF 文件 URL
  children?: React.ReactNode;
  className?: string;
}

async function renderContent(
  canvas: HTMLCanvasElement,
  pdf: PDFDocumentProxy,
  pageNumber: number
) {
  const page = await pdf.getPage(pageNumber);
  const scale = 1.5;
  const viewport = page.getViewport({ scale: scale });
  const context = canvas.getContext("2d");

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;
  console.log(`Page ${pageNumber} rendered`);
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url, className }) => {
  const { setPdf, containerRef } = usePdfViewer();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // 加载PDF文档并渲染所有页面
    const loadAndRenderPdf = async () => {
      try {
        const data = await fetch(url).then((res) => res.arrayBuffer());
        const pdf = await pdfjsLib.getDocument(data).promise;
        setPdf(pdf);
        // 清空容器
        containerRef.current!.innerHTML = "";

        // 创建并渲染每一页
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const canvas = document.createElement("canvas");
          canvas.className = "pdf-page";
          containerRef.current!.appendChild(canvas);
          await renderContent(canvas, pdf, pageNum);
        }
      } catch (error) {
        console.error("PDF加载或渲染失败:", error);
      }
    };

    loadAndRenderPdf();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      // 清理动画帧
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [url, setPdf]);

  // 处理拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    // 取消之前的动画
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setStartY(e.pageY - containerRef.current!.offsetTop);
    setScrollLeft(containerRef.current!.scrollLeft);
    setScrollTop(containerRef.current!.scrollTop);
    setLastTime(Date.now());
    setLastPosition({ x: e.pageX, y: e.pageY });
  };

  // 处理拖拽
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const y = e.pageY - containerRef.current!.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;

    containerRef.current!.scrollLeft = scrollLeft - walkX;
    containerRef.current!.scrollTop = scrollTop - walkY;

    // 计算速度
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTime;
    if (timeElapsed > 0) {
      const velocityX = (e.pageX - lastPosition.x) / timeElapsed;
      const velocityY = (e.pageY - lastPosition.y) / timeElapsed;
      setVelocity({ x: velocityX, y: velocityY });
      setLastTime(currentTime);
      setLastPosition({ x: e.pageX, y: e.pageY });
    }
  };

  // 处理拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
      applyInertia();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };
  // 应用惯性
  const applyInertia = useCallback(() => {
    let currentVelocity = { ...velocity };
    const friction = 0.95;

    const animate = () => {
      if (
        Math.abs(currentVelocity.x) < 0.01 &&
        Math.abs(currentVelocity.y) < 0.01
      ) {
        // 当速度足够小时，取消动画
        cancelAnimationFrame(animationFrameRef.current!);
        return;
      }

      containerRef.current!.scrollLeft -= currentVelocity.x * 16;
      containerRef.current!.scrollTop -= currentVelocity.y * 16;
      currentVelocity.x *= friction;
      currentVelocity.y *= friction;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 开始动画前先取消之前的动画
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [velocity]);
  return (
    <div
      ref={containerRef}
      className={cn("pdf-container flex flex-col gap-4", className)}
      style={{ overflow: "auto", cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};
