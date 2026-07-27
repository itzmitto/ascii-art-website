"use client";
import { ChangeEvent, useState } from "react";
import Preview from "@/components/Preview";
import AsciiViewer from "@/components/AsciiViewer";
import Controls from "@/components/Controls";
import { useAscii } from "@/hooks/useAscii";

export default function Upload() {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [width, setWidth] = useState(120);

    const ascii = useAscii(image, width);

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
                <div className="upload-icon">
                    📁
                </div>
                <h2>Upload your Image or GIF</h2>
                <p>
                    Select an image or animated GIF from your computer.
                </p>
                <input
                    type="file"
                    accept="image/*,.gif"
                    id="upload"
                    hidden
                    onChange={handleFile}
                />
                <label
                    htmlFor="upload"
                    className="upload-btn"
                >Choose File
                </label>
                <Controls
                    width={width}
                    setWidth={setWidth}
                />
                {image && (
                    <div className="converter-grid">
                        <div className="converter-panel">
                            <h2>Original Image</h2>
                            <Preview
                                image={image}
                                fileName={fileName}
                                fileSize={fileSize} />
                        </div>
                        <div className="converter-panel">
                            <AsciiViewer
                                ascii={ascii} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}