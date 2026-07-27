"use client";
import { ChangeEvent, useState } from "react";
import Preview from "@/components/Preview";
import AsciiViewer from "@/components/AsciiViewer";
import Controls from "@/components/Controls";
import { useAscii, AsciiOptions } from "@/hooks/useAscii";
import { UploadFile } from "@/types/ascii";

export default function Upload() {

    const [fileData, setFileData] = useState<UploadFile | null>(null);
    const [options, setOptions] = useState<AsciiOptions>({
        width: 120,
        brightness: 0,
        contrast: 0,
        invert: false,
        characterSet: "standard"
    });

    const ascii = useAscii(fileData?.url ?? null, options);
    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
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
    return (
        <section className="upload-section">

            <div className="upload-card">

                <div className="upload-icon">
                    📁
                </div>
                <h2>
                    Upload Image or GIF
                </h2>
                <p> PNG, JPG, WEBP and GIF are supported.</p>
                <input
                    hidden
                    id="upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                />
                <label
                    htmlFor="upload"
                    className="upload-btn">Choose File
                </label>
                <Controls
                    options={options}
                    setOptions={setOptions}
                />
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