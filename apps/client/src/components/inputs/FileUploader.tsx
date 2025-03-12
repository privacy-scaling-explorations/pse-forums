"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { classed } from "@tw-classed/react";
import { Button } from "@/components/ui/Button";

const ImagePreview = classed.div(
  "size-[84px] rounded-full border border-dashed border-gray duration-200 flex items-center justify-center cursor-pointer bg-white-light hover:bg-white-dark transition-colors overflow-hidden",
);

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    console.log("Uploading file:", selectedFile);

    // Example implementation:
    // const formData = new FormData()
    // formData.append("file", selectedFile)
    // fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // })
  };

  const handleCircleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <ImagePreview onClick={handleCircleClick}>
        {previewUrl ? (
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <Upload className="size-4 text-black" />
        )}
      </ImagePreview>

      <div className="flex flex-col gap-3">
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            id="file-upload"
            accept="image/*"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center w-full px-3 py-1 text-sm rounded-md border border-[#E4E4E7] cursor-pointer gap-2 lg:min-w-[370px]"
          >
            <span className="font-medium text-base-foreground">Choose file</span>
            <span className="text-base-foreground font-normal">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
          </label>
        </div>

        <div className="div">
          <Button icon={Upload} onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};
