"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { OfficeCanvasContainer } from "./office-editor";
import { WordFooter } from "./WordFooter";
import { WordToolbar } from "./WordToolbar";

export function WordEditor() {
  return (
    <div className="h-full relative flex-1 w-1 flex  flex-col">
      <ErrorBoundary>
        <WordToolbar />
      </ErrorBoundary>
      <div className="flex-1 relative py-5 h-1 w-full flex justify-center bg-[#e3e9ed]  shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-y-auto">
        <ErrorBoundary>
          <div className="relative">
            <OfficeCanvasContainer />
          </div>
        </ErrorBoundary>
      </div>
      <WordFooter />
    </div>
  );
}
