"use client";

import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import Preview from "@/components/Preview";
import AsciiViewer from "@/components/AsciiViewer";
import Controls from "@/components/Controls";
import { useAscii, AsciiOptions } from "@/hooks/useAscii";
import { UploadFile } from "@/types/ascii";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export default function Upload() {
  const [fileData, setFileData] = useState<UploadFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<AsciiOptions>({
    width: 120,
    brightness: 0,
    contrast: 0,
    invert: false,
    characterSet: "standard",
  });

  const { ascii, loading } = useAscii(fileData?.url ?? null, options);

  useEffect(() => {
    return () => {
      if (fileData?.url) {
        URL.revokeObjectURL(fileData.url);
      }
    };
  }, [fileData?.url]);

  function loadFile(file: File) {
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please upload a PNG, JPG, WEBP or GIF file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("This file is too large. The maximum file size is 20 MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    const type = file.type === "image/gif" ? "gif" : "image";

    setFileData({
      type,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      url,
      file,
    });
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    loadFile(file);
    e.target.value = "";
  }

  function handleDrag(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    }

    if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    loadFile(file);
  }

  return (
    <section id="converter" className="upload-section">
      <div
        className={`upload-card ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          hidden
          id="upload"
          type="file"
          accept=".png,.jpg,.jpeg,.webp,.gif,image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFile}
        />

        <label
          htmlFor="upload"
          className={`upload-dropzone ${dragActive ? "drag-active" : ""}`}
        >
          <div className="upload-icon">↑</div>

          <h2>Drop your image here</h2>

          <p>Drag & drop PNG, JPG, WEBP or GIF</p>

          <span className="upload-divider">or</span>

          <span className="upload-btn">Browse Files</span>

          <small>Maximum file size: 20 MB</small>
        </label>

        {error && (
          <div
            role="alert"
            style={{
              marginTop: "18px",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 90, 90, 0.25)",
              background: "rgba(255, 90, 90, 0.08)",
              color: "#ff9b9b",
              textAlign: "left",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        <h2>Converter Settings</h2>

        <Controls options={options} setOptions={setOptions} />

        {fileData && (
          <div className="converter-grid">
            <div className="converter-panel">
              <h2>
                {fileData.type === "gif" ? "GIF Preview" : "Image Preview"}
              </h2>

              <Preview
                image={fileData.url}
                fileName={fileData.name}
                fileSize={fileData.size}
              />
            </div>

            <div className="converter-panel">
              <AsciiViewer ascii={ascii} />

              {loading && (
                <div className="ascii-loading">Generating ASCII art...</div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
