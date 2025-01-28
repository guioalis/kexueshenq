import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, Image, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onFileContent: (content: string) => void;
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setIsLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileContent(content);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setError('文件读取失败，请重试');
        setIsLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError('文件处理失败，请确保文件格式正确');
      setIsLoading(false);
    }
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setError('');
  };

  return (
    <div className="mb-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-300'}
          ${uploadedFile ? 'bg-gray-50' : 'hover:bg-gray-50 hover:border-blue-400'}
          ${error ? 'border-red-300' : ''}`}
      >
        <input {...getInputProps()} />
        
        {uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {uploadedFile.type.startsWith('image/') ? (
                <Image className="w-6 h-6 text-gray-500" />
              ) : (
                <File className="w-6 h-6 text-gray-500" />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">{uploadedFile.name}</span>
                <span className="text-xs text-gray-500">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">
              {isDragActive ? (
                "放开以上传文件"
              ) : (
                <>
                  将文件拖放到此处，或者
                  <span className="text-blue-500 hover:text-blue-600 mx-1 cursor-pointer">
                    点击选择文件
                  </span>
                </>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              支持 PDF, DOC, DOCX, TXT, JPG, PNG 格式
            </p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          正在处理文件...
        </div>
      )}

      {error && (
        <div className="mt-3 text-sm text-red-500 flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
