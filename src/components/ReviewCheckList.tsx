
import { useState } from "react";
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle } from "lucide-react";
import { ReviewPoint } from "../types/review";
import { cn } from "@/lib/utils";

interface ReviewCheckListProps {
  reviewPoints: ReviewPoint[];
  selectedId: string;
  onSelectPoint: (id: string) => void;
}

const ReviewCheckList = ({ reviewPoints, selectedId, onSelectPoint }: ReviewCheckListProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderReviewItem = (item: ReviewPoint, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id] || false;
    const isSelected = selectedId === item.id;

    return (
      <div key={item.id} className="animate-slide-in" style={{ animationDelay: `${level * 0.05}s` }}>
        <div 
          className={cn(
            "flex items-center px-4 py-2 cursor-pointer review-item rounded-md my-1",
            isSelected ? "bg-tender-highlight border-l-4 border-tender-blue" : "hover:bg-tender-highlight/50",
            level > 0 && "ml-4",
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              onSelectPoint(item.id);
            }
          }}
        >
          {hasChildren ? (
            <span className="mr-1.5 text-gray-500">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          ) : (
            <span className="w-5"></span>
          )}
          
          <span className="text-sm flex-1 font-medium">{item.title}</span>
          
          {item.hasRisk ? (
            <AlertCircle className="h-4 w-4 text-risk" />
          ) : (
            <CheckCircle className="h-4 w-4 text-safe" />
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2 border-l border-gray-200 pl-2">
            {item.children?.map(child => renderReviewItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium text-lg">审查点列表</h2>
      </div>
      <div className="overflow-y-auto flex-1 p-2">
        {reviewPoints.map(item => renderReviewItem(item))}
      </div>
    </div>
  );
};

export default ReviewCheckList;
