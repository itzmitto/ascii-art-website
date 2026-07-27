"use client";

import { ChangeEvent, useState } from "react";
export default function Upload() {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
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
                {image && (
                    <div className="preview">
                        <img
                            src={image}
                            alt="Preview" />
                        <h3>{fileName}</h3>
                        <span>{fileSize}</span>
                    </div>
                )}
            </div>
        </section>
    );
}