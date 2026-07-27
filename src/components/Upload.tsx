"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { imageToAscii } from "@/lib/ascii";
import Preview from "@/components/Preview";
import AsciiViewer from "@/components/AsciiViewer";
import Controls from "@/components/Controls";

export default function Upload() {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [ascii, setAscii] = useState("");
    const [width, setWidth] = useState(120);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileName(file.name);
        setFileSize((file.size / 1024 / 1024).toFixed(2) + " MB");
        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result as string;
            setImage(src);
        };
        reader.readAsDataURL(file);
    }
    useEffect(() => {
        if (!image) return;
        const img = new Image();
        img.onload = () => {
            const result = imageToAscii(img, width);
            setAscii(result);
        };
        img.src = image;
    }, [image, width]);
    return (
        <section className="upload-section">
            <div className="upload-card">
                <div className="upload-icon">📁</div>
                <h2>Upload your Image or GIF</h2>
                <p>Select an image from your computer.</p>
                <input
                    type="file"
                    accept="image/*,.gif"
                    id="upload"
                    hidden
                    onChange={handleFile} />
                <label
                    htmlFor="upload"
                    className="upload-btn">Choose File
                </label>
                <Controls
                    width={width}
                    setWidth={setWidth} />
                {image && ascii && (
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