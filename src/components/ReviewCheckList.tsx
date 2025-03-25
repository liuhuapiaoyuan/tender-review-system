
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { ReviewPoint } from "../types/review";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ReviewCheckListProps {
  reviewPoints: ReviewPoint[];
  selectedId: string;
  onSelectPoint: (id: string) => void;
  progress?: number;
}

const ReviewCheckList = ({ reviewPoints, selectedId, onSelectPoint, progress = 100 }: ReviewCheckListProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Automatically expand all items when first loaded
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    const expandAll = (points: ReviewPoint[]) => {
      points.forEach(point => {
        initialExpanded[point.id] = true;
        if (point.children) {
          expandAll(point.children);
        }
      });
    };
    
    expandAll(reviewPoints);
    setExpandedItems(initialExpanded);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderStatusIcon = (status?: string, hasRisk?: boolean) => {
    if (status === "pending" || !status) {
      return <Clock className="h-4 w-4 text-gray-400" />;
    } else if (status === "risk") {
      return <AlertCircle className="h-4 w-4 text-risk" />;
    } else if (status === "safe") {
      return <CheckCircle className="h-4 w-4 text-safe" />;
    } else {
      return hasRisk ? 
        <AlertCircle className="h-4 w-4 text-risk" /> : 
        <CheckCircle className="h-4 w-4 text-safe" />;
    }
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
            item.status === "pending" && "text-gray-500",
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
          
          <span className={cn(
            "text-sm flex-1 font-medium",
            item.status === "pending" && "text-gray-500"
          )}>
            {item.title}
          </span>
          
          {renderStatusIcon(item.status, item.hasRisk)}
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
        <div className="mt-2">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>审查进度</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      <div className="overflow-y-auto flex-1 p-2">
        {reviewPoints.map(item => renderReviewItem(item))}
      </div>
    </div>
  );
};

export default ReviewCheckList;
