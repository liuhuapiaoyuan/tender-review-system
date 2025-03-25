
export interface ReviewPoint {
  id: string;
  title: string;
  hasRisk: boolean;
  parentId?: string;
  children?: ReviewPoint[];
  status?: "pending" | "processing" | "risk" | "safe";
}

export interface ReviewDetail {
  id: string;
  riskWarning?: string;
  legalBasis?: string;
  recommendation?: string;
}

export interface TenderContent {
  id: string;
  content: string;
}

export interface TenderReview {
  id: string;
  title: string;
  hasRisk: boolean;
  reviewDate: string;
  totalPoints: number;
  riskPoints: number;
  reviewPoints: ReviewPoint[];
  reviewDetails: Record<string, ReviewDetail>;
  originalContent: Record<string, TenderContent>;
}

export interface ReviewProgress {
  progress: number;
  reviewPoints: ReviewPoint[];
  isComplete: boolean;
}
