import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";

interface FileUploaderProps {
  onUploadComplete: (file: File) => void;
}

const FileUploader = ({ onUploadComplete }: FileUploaderProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileSelectAndUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("请选择PDF文件");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // 模拟上传过程
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(progress);
    }

    setIsUploading(false);
    onUploadComplete(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-6">标书审查系统</h2>
        
        <div className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelectAndUpload}
            className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
            disabled={isUploading}
          />

          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center text-gray-500">
                正在上传... {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;