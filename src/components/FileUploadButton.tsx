import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FileUploadButton = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("请选择PDF文件");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const reader = new FileReader();

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setProgress(progress);
        }
      };

      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], {
          type: "application/pdf",
        });
        const blobUrl = URL.createObjectURL(blob);
        setUploading(false);
        navigate(`/review?file=${encodeURIComponent(blobUrl)}`);
      };

      reader.onerror = () => {
        toast.error("文件读取失败");
        setUploading(false);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error("文件读取失败");
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      <Button
        size="lg"
        className={`group relative overflow-hidden h-14 px-8 text-lg ${
          uploading ? "pointer-events-none" : ""
        }`}
        onClick={handleClick}
        disabled={uploading}
      >
        {!uploading && (
          <>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-primary group-hover:bg-opacity-80"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-primary group-hover:bg-opacity-90"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-primary rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-primary -rotate-12"></span>
          </>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-primary/50">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <span className="relative flex items-center gap-2">
          <Upload className="h-5 w-5" />
          <span className="flex-1">
            {uploading ? "正在上传..." : "上传招标文件开始审查"}
          </span>
          {uploading && (
            <span className="text-sm font-medium">{progress}%</span>
          )}
        </span>
      </Button>
      {uploading && (
        <div className="absolute left-0 right-0 -bottom-12 flex flex-col items-center">
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative mb-1">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>
          <span className="text-sm text-gray-600 font-medium">{progress}%</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;
