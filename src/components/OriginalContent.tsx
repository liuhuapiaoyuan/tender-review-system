
import { File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TenderContent } from "../types/review";

interface OriginalContentProps {
  content?: TenderContent;
}

const OriginalContent = ({ content }: OriginalContentProps) => {
  if (!content) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <File className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>请从左侧选择一个审查点查看原文内容</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium text-lg">原文内容</h2>
      </div>
      <div className="overflow-y-auto p-4 flex-1">
        <Card className="shadow-sm animate-fade-in">
          <CardContent className="p-4 text-sm whitespace-pre-line">
            {content.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OriginalContent;
