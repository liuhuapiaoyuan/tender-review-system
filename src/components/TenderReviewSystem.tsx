import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { ReviewProgress, TenderReview } from "../types/review";
import { simulateReviewProcess } from "../utils/reviewSimulator";
import Header from "./Header";
import ReviewCheckList from "./ReviewCheckList";
import ReviewDetail from "./ReviewDetail";
import { PdfViewer } from "./review/PdfViewer";
import { PdfViewerProvider } from "./review/PdfViewerProvider";

interface TenderReviewSystemProps {
  data: TenderReview;
}

const TenderReviewSystem = ({ data }: TenderReviewSystemProps) => {
  const [selectedPointId, setSelectedPointId] = useState<string>("");
  const [reviewData, setReviewData] = useState<TenderReview>(data);
  const [progress, setProgress] = useState<number>(0);
  const [isSimulationComplete, setIsSimulationComplete] =
    useState<boolean>(false);

  useEffect(() => {
    const runSimulation = async () => {
      const generator = simulateReviewProcess(data);

      // Initial state
      let result = generator.next();

      while (!result.done) {
        const value = result.value;

        // If the value is a Promise (delay), await it
        if (value instanceof Promise) {
          await value;
        } else {
          // Update the state with the new review progress
          const progressData = value as ReviewProgress;
          setProgress(progressData.progress);
          setReviewData((prev) => ({
            ...prev,
            reviewPoints: progressData.reviewPoints,
          }));

          if (progressData.isComplete) {
            setIsSimulationComplete(true);
          }
        }

        // Get the next value
        result = generator.next();
      }
    };

    runSimulation();
  }, [data]);

  const handleSelectPoint = (id: string) => {
    setSelectedPointId(id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title={data.title}
        hasRisk={data.hasRisk}
        reviewDate={data.reviewDate}
        totalPoints={data.totalPoints}
        riskPoints={data.riskPoints}
      />

      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 overflow-hidden"
      >
        {/* Left Column - Review Points */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <div className="h-full bg-white border-r shadow-sm">
            <ReviewCheckList
              reviewPoints={reviewData.reviewPoints}
              selectedId={selectedPointId}
              onSelectPoint={handleSelectPoint}
              progress={progress}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Middle Column - Review Details */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <div className="h-full bg-white border-r shadow-sm">
            <ReviewDetail
              detail={data.reviewDetails[selectedPointId]}
              isLoading={!isSimulationComplete && selectedPointId !== ""}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Column - Original Content */}
        <ResizablePanel
          className="flex flex-col "
          defaultSize={45}
          minSize={30}
          maxSize={60}
        >
          <div className="h-full bg-white shadow-sm flex">
            <PdfViewerProvider>
              <PdfViewer url="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" />
            </PdfViewerProvider>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default TenderReviewSystem;
