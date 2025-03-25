
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Header from "./Header";
import ReviewCheckList from "./ReviewCheckList";
import ReviewDetail from "./ReviewDetail";
import OriginalContent from "./OriginalContent";
import { TenderReview, ReviewProgress } from "../types/review";
import { simulateReviewProcess } from "../utils/reviewSimulator";

interface TenderReviewSystemProps {
  data: TenderReview;
}

const TenderReviewSystem = ({ data }: TenderReviewSystemProps) => {
  const [selectedPointId, setSelectedPointId] = useState<string>("");
  const [reviewData, setReviewData] = useState<TenderReview>(data);
  const [progress, setProgress] = useState<number>(0);
  const [isSimulationComplete, setIsSimulationComplete] = useState<boolean>(false);

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
          setReviewData(prev => ({
            ...prev,
            reviewPoints: progressData.reviewPoints
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
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column - Review Points */}
        <div className="w-1/4 bg-white border-r shadow-sm">
          <ReviewCheckList 
            reviewPoints={reviewData.reviewPoints}
            selectedId={selectedPointId}
            onSelectPoint={handleSelectPoint}
            progress={progress}
          />
        </div>
        
        <Separator orientation="vertical" className="mx-1" />
        
        {/* Middle Column - Review Details */}
        <div className="w-2/5 bg-white border-r shadow-sm">
          <ReviewDetail 
            detail={data.reviewDetails[selectedPointId]} 
            isLoading={!isSimulationComplete && selectedPointId !== ""}
          />
        </div>
        
        <Separator orientation="vertical" className="mx-1" />
        
        {/* Right Column - Original Content */}
        <div className="w-1/3 bg-white shadow-sm">
          <OriginalContent content={data.originalContent[selectedPointId]} />
        </div>
      </main>
    </div>
  );
};

export default TenderReviewSystem;
