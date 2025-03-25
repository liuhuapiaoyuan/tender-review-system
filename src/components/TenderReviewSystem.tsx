
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Header from "./Header";
import ReviewCheckList from "./ReviewCheckList";
import ReviewDetail from "./ReviewDetail";
import OriginalContent from "./OriginalContent";
import { TenderReview } from "../types/review";

interface TenderReviewSystemProps {
  data: TenderReview;
}

const TenderReviewSystem = ({ data }: TenderReviewSystemProps) => {
  const [selectedPointId, setSelectedPointId] = useState<string>("");

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
            reviewPoints={data.reviewPoints}
            selectedId={selectedPointId}
            onSelectPoint={handleSelectPoint}
          />
        </div>
        
        <Separator orientation="vertical" className="mx-1" />
        
        {/* Middle Column - Review Details */}
        <div className="w-2/5 bg-white border-r shadow-sm">
          <ReviewDetail detail={data.reviewDetails[selectedPointId]} />
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
