"use client";
import { useState } from "react";
import Toolbar from "./Toolbar";

type Props = {
    ascii: string;
};
export default function AsciiViewer({ ascii }: Props) {
    const [zoom, setZoom] = useState(100);
    return (
        <>
            <Toolbar ascii={ascii} />
            <div className="ascii-controls">
                <button
                    className="zoom-btn"
                    onClick={() => setZoom(z => Math.max(50, z - 10))}
                >−
                </button>
                <span>{zoom}%</span>
                <button
                    className="zoom-btn"
                    onClick={() => setZoom(z => Math.min(300, z + 10))}
                >+</button>
            </div>
            <pre
                className="ascii-output"
                style={{
                    fontSize: `${7 * zoom / 100}px`,
                    lineHeight: `${7 * zoom / 100}px`
                }}>{ascii || "Upload an image to generate ASCII..."}
            </pre>
        </>
    );
}