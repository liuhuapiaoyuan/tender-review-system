
import { AlertTriangle, Book, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewDetail as ReviewDetailType } from "../types/review";

interface ReviewDetailProps {
  detail?: ReviewDetailType;
  isLoading?: boolean;
}

const ReviewDetail = ({ detail, isLoading = false }: ReviewDetailProps) => {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>请从左侧选择一个审查点查看详情</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium text-lg">审查结果</h2>
      </div>
      <div className="overflow-y-auto p-4 flex-1 space-y-4">
        {detail.riskWarning && (
          <Card className="overflow-hidden shadow-sm border border-red-100 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="p-4 bg-risk-light/30 border-b border-red-100">
              <CardTitle className="text-base font-medium flex items-center text-risk">
                <AlertTriangle className="h-4 w-4 mr-2" />
                风险提示
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-sm">
              {detail.riskWarning}
            </CardContent>
          </Card>
        )}

        {detail.legalBasis && (
          <Card className="overflow-hidden shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="p-4 bg-tender-gray/50 border-b">
              <CardTitle className="text-base font-medium flex items-center">
                <Book className="h-4 w-4 mr-2" />
                法律依据
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-sm">
              {detail.legalBasis}
            </CardContent>
          </Card>
        )}

        {detail.recommendation && (
          <Card className="overflow-hidden shadow-sm border border-blue-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="p-4 bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-base font-medium flex items-center text-tender-blue">
                <FileText className="h-4 w-4 mr-2" />
                修改建议
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-sm">
              {detail.recommendation}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
