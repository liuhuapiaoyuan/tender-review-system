import { PDFTest } from "@/components/review/PDFTest";
import { PdfViewerProvider } from "@/components/review/PdfViewerProvider";
import TenderReviewSystem from "@/components/TenderReviewSystem";
import { mockTenderReview } from "@/data/mockData";

const ReviewPage = () => {
  return (
    <PdfViewerProvider>
      <PDFTest />
      <TenderReviewSystem data={mockTenderReview} />
    </PdfViewerProvider>
  );
};

export default ReviewPage;
