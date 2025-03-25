
import { Download, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
  hasRisk: boolean;
  reviewDate: string;
  totalPoints: number;
  riskPoints: number;
}

const Header = ({ title, hasRisk, reviewDate, totalPoints, riskPoints }: HeaderProps) => {
  const handleExport = () => {
    toast.success("审查报告已开始生成，请稍候", {
      description: "报告将很快准备好并开始下载",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b bg-white/90 backdrop-blur-md shadow-sm animate-fade-in">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-gray-800">{title}审查</h1>
        <div className="flex items-center space-x-4">
          <Badge variant={hasRisk ? "destructive" : "default"} className="h-6 rounded-md">
            {hasRisk ? (
              <><AlertTriangle className="mr-1 h-3.5 w-3.5" /> 有风险</>
            ) : (
              <><CheckCircle className="mr-1 h-3.5 w-3.5" /> 无风险</>
            )}
          </Badge>
          <span className="text-sm text-muted-foreground">
            审查时间: {reviewDate}
          </span>
          <span className="text-sm text-muted-foreground">
            本次审查点 {totalPoints} 个，其中有 {riskPoints} 处存在风险
          </span>
        </div>
      </div>
      <Button 
        className="mt-4 sm:mt-0 bg-tender-blue hover:bg-tender-lightBlue transition-colors duration-200"
        onClick={handleExport}
      >
        <Download className="mr-1.5 h-4 w-4" />
        导出审查报告
      </Button>
    </div>
  );
};

export default Header;
