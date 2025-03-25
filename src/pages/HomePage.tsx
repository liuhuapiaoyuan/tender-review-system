
import FileUploadButton from "@/components/FileUploadButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BarChart3, FileCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          智能招标文件审查系统
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          基于人工智能的招标文件审查工具，自动识别潜在风险，确保招标过程合规高效
        </p>
         
        <FileUploadButton />
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-white rounded-t-3xl shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">系统功能</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<FileCheck className="h-10 w-10 text-blue-500" />}
            title="智能合规审查"
            description="自动扫描招标文件，识别潜在的合规问题和风险点，确保招标过程符合法律法规要求"
          />
          
          <FeatureCard 
            icon={<AlertTriangle className="h-10 w-10 text-amber-500" />}
            title="风险预警"
            description="精准识别招标文件中的风险条款，提供风险等级评估和详细说明，帮助及时调整"
          />
          
          <FeatureCard 
            icon={<ShieldCheck className="h-10 w-10 text-green-500" />}
            title="法律法规依据"
            description="为每个风险点提供相关法律法规依据，帮助理解合规要求，提升招标文件质量"
          />
          
          <FeatureCard 
            icon={<BarChart3 className="h-10 w-10 text-purple-500" />}
            title="数据分析报告"
            description="生成全面的审查报告，包含风险点分布、严重程度分析和修改建议，支持一键导出"
          />
        </div>
      </div>
      
      {/* Advantages Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">使用优势</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <AdvantageCard 
            number="01"
            title="提高效率"
            description="将原本需要数小时的人工审查缩短至几分钟，大幅提升工作效率"
          />
          
          <AdvantageCard 
            number="02"
            title="降低风险"
            description="基于大量案例和法规的智能分析，有效识别隐蔽风险，降低合规风险"
          />
          
          <AdvantageCard 
            number="03"
            title="专业支持"
            description="提供专业的修改建议和法律依据，相当于拥有招投标专家团队支持"
          />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">立即开始使用</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          上传您的招标文件，立即体验智能审查系统带来的高效与安心
        </p>
        
        <Link to="/review">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            开始审查
          </Button>
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 flex flex-col items-center">
        <div className="mb-4 p-3 rounded-full bg-blue-50">{icon}</div>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-center text-sm">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const AdvantageCard = ({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 rounded-lg bg-white shadow hover:shadow-md transition-shadow">
      <div className="text-4xl font-bold text-blue-500 opacity-50 mb-4">{number}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;
