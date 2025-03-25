import { OfficeEditorProvider } from "@/components/office-editor/OfficeCanvasProvider";
import { FileLoader } from "@/components/review/FileLoader";
import TenderReviewSystem from "@/components/TenderReviewSystem";
import { mockTenderReview } from "@/data/mockData";

const ReviewPage = () => {
  return (
    <OfficeEditorProvider>
      <FileLoader />
      <TenderReviewSystem data={mockTenderReview} />
    </OfficeEditorProvider>
  );
};

export default ReviewPage;
