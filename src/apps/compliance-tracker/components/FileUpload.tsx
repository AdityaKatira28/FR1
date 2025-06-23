import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { 
  Upload, 
  File, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  X,
  FileText,
  FileSpreadsheet,
  FileImage
} from 'lucide-react';

interface FileUploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  uploadedUrl?: string;
}

interface FileUploadProps {
  onUploadComplete?: (files: FileUploadItem[]) => void;
  onUploadError?: (error: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number;
  uploadEndpoint?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  acceptedFileTypes = ['.csv'],
  maxFileSize = 10, // 10MB default
  maxFiles = 5,
  uploadEndpoint = '/api/v1/compliance/upload'
}) => {
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-400" />;
      case 'csv':
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="h-5 w-5 text-green-400" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className="h-5 w-5 text-blue-400" />;
      default:
        return <File className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusIcon = (status: FileUploadItem['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'uploading':
        return <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getStatusBadge = (status: FileUploadItem['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-900/50 text-yellow-300 text-xs">Pending</Badge>;
      case 'uploading':
        return <Badge className="bg-blue-900/50 text-blue-300 text-xs">Uploading</Badge>;
      case 'success':
        return <Badge className="bg-green-900/50 text-green-300 text-xs">Uploaded</Badge>;
      case 'error':
        return <Badge className="bg-red-900/50 text-red-300 text-xs">Failed</Badge>;
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }

    // Check file type
    const fileName = file.name.toLowerCase();
    const isValidType = acceptedFileTypes.some(type => 
      fileName.endsWith(type.replace('.', ''))
    );
    
    if (!isValidType) {
      return `File type not supported. Accepted types: ${acceptedFileTypes.join(', ')}`;
    }

    return null;
  };

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    
    // Check max files limit
    if (files.length + fileArray.length > maxFiles) {
      onUploadError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles: FileUploadItem[] = [];
    
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        onUploadError?.(error);
        return;
      }

      // Check for duplicates
      const isDuplicate = files.some(existingFile => 
        existingFile.file.name === file.name && 
        existingFile.file.size === file.size
      );

      if (isDuplicate) {
        onUploadError?.(`File "${file.name}" already added`);
        return;
      }

      validFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        progress: 0,
        status: 'pending'
      });
    });

    setFiles(prev => [...prev, ...validFiles]);
  }, [files, maxFiles, onUploadError]);

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const uploadFile = async (fileItem: FileUploadItem): Promise<void> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', fileItem.file);
      formData.append('type', 'compliance-document');

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, progress, status: 'uploading' as const }
              : f
          ));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { 
                    ...f, 
                    progress: 100, 
                    status: 'success' as const,
                    uploadedUrl: response.url || response.file_url
                  }
                : f
            ));
            resolve();
          } catch (error) {
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { 
                    ...f, 
                    status: 'error' as const,
                    error: 'Invalid server response'
                  }
                : f
            ));
            reject(new Error('Invalid server response'));
          }
        } else {
          const errorMessage = xhr.responseText || `Upload failed with status ${xhr.status}`;
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { 
                  ...f, 
                  status: 'error' as const,
                  error: errorMessage
                }
              : f
          ));
          reject(new Error(errorMessage));
        }
      });

      xhr.addEventListener('error', () => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { 
                ...f, 
                status: 'error' as const,
                error: 'Network error occurred'
              }
            : f
        ));
        reject(new Error('Network error occurred'));
      });

    // Add debug logging
console.log('🚀 Uploading to:', uploadEndpoint);
console.log('📁 File:', fileItem.file.name, fileItem.file.size, 'bytes');

xhr.open('POST', uploadEndpoint);
xhr.send(formData);
    });
  };

  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    setIsUploading(true);

    try {
      await Promise.all(pendingFiles.map(uploadFile));
      onUploadComplete?.(files);
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const retryFailedUploads = () => {
    setFiles(prev => prev.map(f => 
      f.status === 'error' 
        ? { ...f, status: 'pending' as const, error: undefined, progress: 0 }
        : f
    ));
  };

  const successCount = files.filter(f => f.status === 'success').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const pendingCount = files.filter(f => f.status === 'pending').length;

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Upload
        </CardTitle>
        <CardDescription className="text-slate-400">
          Upload compliance reports
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-purple-500 bg-purple-900/20'
              : 'border-slate-700 hover:border-slate-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-white font-medium mb-2">
            Drag and drop files here, or click to select
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          >
            Select Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">
                Files ({files.length}/{maxFiles})
              </h4>
              <div className="flex gap-2">
                {errorCount > 0 && (
                  <Button
                    onClick={retryFailedUploads}
                    size="sm"
                    variant="outline"
                    className="bg-red-900/20 border-red-700 text-red-300 hover:bg-red-900/30"
                  >
                    Retry Failed ({errorCount})
                  </Button>
                )}
                <Button
                  onClick={clearAllFiles}
                  size="sm"
                  variant="outline"
                  className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                >
                  Clear All
                </Button>
              </div>
            </div>

            {/* Status Summary */}
            {(successCount > 0 || errorCount > 0) && (
              <div className="flex gap-2 text-sm">
                {successCount > 0 && (
                  <Badge className="bg-green-900/50 text-green-300">
                    {successCount} Uploaded
                  </Badge>
                )}
                {errorCount > 0 && (
                  <Badge className="bg-red-900/50 text-red-300">
                    {errorCount} Failed
                  </Badge>
                )}
                {pendingCount > 0 && (
                  <Badge className="bg-yellow-900/50 text-yellow-300">
                    {pendingCount} Pending
                  </Badge>
                )}
              </div>
            )}

            {/* File Items */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700"
                >
                  {getFileIcon(fileItem.file.name)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white text-sm font-medium truncate">
                        {fileItem.file.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(fileItem.status)}
                        {getStatusBadge(fileItem.status)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{formatFileSize(fileItem.file.size)}</span>
                      {fileItem.status === 'uploading' && (
                        <span>{fileItem.progress}%</span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {fileItem.status === 'uploading' && (
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${fileItem.progress}%` }}
                        />
                      </div>
                    )}

                    {/* Error Message */}
                    {fileItem.status === 'error' && fileItem.error && (
                      <p className="text-red-400 text-xs mt-1">{fileItem.error}</p>
                    )}

                    {/* Success Message */}
                    {fileItem.status === 'success' && (
                      <p className="text-green-400 text-xs mt-1">
                        Upload completed successfully
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => removeFile(fileItem.id)}
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white hover:bg-slate-700 p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Upload Button */}
            {pendingCount > 0 && (
              <Button
                onClick={uploadAllFiles}
                disabled={isUploading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading {pendingCount} file{pendingCount > 1 ? 's' : ''}...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {pendingCount} file{pendingCount > 1 ? 's' : ''}
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

