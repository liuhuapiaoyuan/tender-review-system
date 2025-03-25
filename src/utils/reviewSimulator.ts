
import { TenderReview, ReviewPoint } from "../types/review";

// Helper function to get all leaf nodes (items without children) from the review points
export const getLeafNodes = (points: ReviewPoint[]): string[] => {
  const leafIds: string[] = [];
  
  const traverse = (point: ReviewPoint) => {
    if (!point.children || point.children.length === 0) {
      leafIds.push(point.id);
    } else {
      point.children.forEach(traverse);
    }
  };
  
  points.forEach(traverse);
  return leafIds;
};

// Helper to get random delay between min and max milliseconds
const getRandomDelay = (min = 500, max = 1500) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Simulate the review process with a generator function
export function* simulateReviewProcess(tenderReview: TenderReview) {
  // Get all leaf review point IDs that need to be processed
  const leafIds = getLeafNodes(tenderReview.reviewPoints);
  const totalItems = leafIds.length;
  
  // Clone the review data to avoid modifying the original
  const reviewData = JSON.parse(JSON.stringify(tenderReview)) as TenderReview;
  
  // Initialize all points as not yet reviewed
  const initializeReviewStatus = (points: ReviewPoint[]) => {
    points.forEach(point => {
      point.status = "pending";
      if (point.children && point.children.length > 0) {
        initializeReviewStatus(point.children);
      }
    });
  };
  
  initializeReviewStatus(reviewData.reviewPoints);
  
  // Initial state - all pending
  yield { 
    progress: 0, 
    reviewPoints: reviewData.reviewPoints,
    isComplete: false
  };
  
  // Process each leaf node one by one
  for (let i = 0; i < leafIds.length; i++) {
    // Simulate processing time
    const delay = getRandomDelay();
    yield new Promise(resolve => setTimeout(resolve, delay));
    
    const id = leafIds[i];
    
    // Update the status of the current item and its parent
    const updateStatus = (points: ReviewPoint[]): boolean => {
      return points.some(point => {
        if (point.id === id) {
          point.status = point.hasRisk ? "risk" : "safe";
          return true;
        }
        
        if (point.children && point.children.length > 0) {
          const foundInChildren = updateStatus(point.children);
          
          if (foundInChildren) {
            // Update parent status based on children
            const hasRiskChild = point.children.some(child => child.status === "risk");
            const allChildrenReviewed = point.children.every(child => 
              child.status === "risk" || child.status === "safe"
            );
            
            if (allChildrenReviewed) {
              point.status = hasRiskChild ? "risk" : "safe";
            }
            return true;
          }
        }
        return false;
      });
    };
    
    updateStatus(reviewData.reviewPoints);
    
    // Calculate progress
    const progress = Math.round(((i + 1) / totalItems) * 100);
    
    // Yield the updated state
    yield {
      progress,
      reviewPoints: reviewData.reviewPoints,
      isComplete: i === leafIds.length - 1
    };
  }
}
