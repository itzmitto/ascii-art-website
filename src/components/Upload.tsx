"use client";
import { ChangeEvent, useState } from "react";
import Preview from "@/components/Preview";
import AsciiViewer from "@/components/AsciiViewer";
import Controls from "@/components/Controls";
import { useAscii, AsciiOptions } from "@/hooks/useAscii";

export default function Upload() {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [options, setOptions] = useState<AsciiOptions>({
        width: 120,
        brightness: 0,
        contrast: 0,
        invert: false,
        characterSet: "standard"
    });
    const ascii = useAscii(image, options);
    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileName(file.name);
        setFileSize((file.size / 1024 / 1024).toFixed(2) + " MB");
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
    return (
        <section className="upload-section">
            <div className="upload-card">
                <div className="upload-icon">📁</div>
                <h2>Upload your Image or GIF</h2>
                <p>Select an image or GIF from your computer.</p>
                <input
                    hidden
                    id="upload"
                    type="file"
                    accept="image/*,.gif"
                    onChange={handleFile}
                />
                <label
                    htmlFor="upload"
                    className="upload-btn"
                >Choose File
                </label>
                <Controls
                    options={options}
                    setOptions={setOptions}
                />
                {image && (
                    <div className="converter-grid">
                        <div className="converter-panel">
                            <h2>Original Image</h2>
                            <Preview
                                image={image}
                                fileName={fileName}
                                fileSize={fileSize}
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