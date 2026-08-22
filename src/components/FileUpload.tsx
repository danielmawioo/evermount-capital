"use client";

import { useState, useRef } from "react";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  onUpload: (files: File[]) => Promise<void>;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function FileUpload({
  accept = "*/*",
  maxSize = 10,
  multiple = false,
  onUpload,
  label = "Upload File",
  description,
  disabled = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check MIME type if accept is specified
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const isValidType = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const baseType = type.split("/")[0];
          return file.type.startsWith(`${baseType}/`);
        }
        return file.type === type || file.name.endsWith(type);
      });

      if (!isValidType) {
        toast.error(`File type not allowed. Accepted types: ${accept}`);
        return false;
      }
    }

    return true;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles: File[] = [];
    const filesArray = Array.from(newFiles);

    filesArray.forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      if (multiple) {
        setFiles((prev) => [...prev, ...validFiles]);
      } else {
        setFiles(validFiles);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setUploading(true);
    try {
      await onUpload(files);
      toast.success("Files uploaded successfully");
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: unknown) {
      logger.error("File upload failed", error);
      toast.error(getApiErrorMessage(error, "Upload failed"));
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {description}
          </p>
        )}
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-[#00a76f] bg-[#00a76f]/5"
            : "border-gray-300 dark:border-gray-700"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <button
            type="button"
            onClick={() => !disabled && fileInputRef.current?.click()}
            className="text-[#00a76f] hover:text-emerald-700 font-medium"
            disabled={disabled}
          >
            Click to upload
          </button>{" "}
          or drag and drop
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
          Max size: {maxSize}MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-2 text-gray-400 hover:text-red-500 transition"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading || disabled}
            className="w-full bg-[#00a76f] hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}
    </div>
  );
}
