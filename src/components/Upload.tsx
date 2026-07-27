"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import Preview from "@/components/Preview";
import AsciiViewer from "@/components/AsciiViewer";
import Controls from "@/components/Controls";
import { useAscii, AsciiOptions } from "@/hooks/useAscii";
import { UploadFile } from "@/types/ascii";

export default function Upload() {
    const [fileData, setFileData] = useState<UploadFile | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const [options, setOptions] = useState<AsciiOptions>({
        width: 120,
        brightness: 0,
        contrast: 0,
        invert: false,
        characterSet: "standard"
    });

    const ascii = useAscii(fileData?.url ?? null, options);

    function loadFile(file: File) {
        const url = URL.createObjectURL(file);
        const type = file.type === "image/gif"
            ? "gif"
            : "image";
        setFileData({
            type,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + " MB",
            url,
            file
        });
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        loadFile(file);
    }

    function handleDrag(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }
    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        loadFile(file);
    }
    return (
        <section className="upload-section">
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
                    accept="image/*"
                    onChange={handleFile}
                />
                <label
                    htmlFor="upload"
                    className={`upload-dropzone ${dragActive ? "drag-active" : ""}`}
                >
                    <div className="upload-icon">
                        ⬆️
                    </div>
                    <h2>Drop your image here</h2>
                    <p>
                        Drag & drop PNG, JPG, WEBP or GIF
                    </p>
                    <span className="upload-divider">
                        or
                    </span>
                    <span className="upload-btn">
                        Browse Files
                    </span>
                    <small>
                        Maximum file size: 20 MB
                    </small>
                </label>
                <h2
                    style={{
                        marginTop: "50px",
                        marginBottom: "20px"
                    }}
                >Converter Settings
                </h2>
                <Controls
                    options={options}
                    setOptions={setOptions} />
                {fileData && (
                    <div className="converter-grid">
                        <div className="converter-panel">
                            <h2>
                                {fileData.type === "gif"
                                    ? "GIF Preview"
                                    : "Image Preview"}
                            </h2>
                            <Preview
                                image={fileData.url}
                                fileName={fileData.name}
                                fileSize={fileData.size}
                            />
                        </div>
                        <div className="converter-panel">
                            <AsciiViewer
                                ascii={ascii}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}