
import TenderReviewSystem from "@/components/TenderReviewSystem";
import { mockTenderReview } from "@/data/mockData";

const ReviewPage = () => {
  return <TenderReviewSystem data={mockTenderReview} />;
};

export default ReviewPage;
