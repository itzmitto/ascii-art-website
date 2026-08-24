"use client";

import { useState } from "react";
import Toolbar from "./Toolbar";

type Props = {
    ascii: string;
};

export default function AsciiViewer({ ascii }: Props) {
    const [zoom, setZoom] = useState(100);

    function decreaseZoom() {
        setZoom(current => Math.max(50, current - 10));
    }

    function increaseZoom() {
        setZoom(current => Math.min(300, current + 10));
    }

    function resetZoom() {
        setZoom(100);
    }

    const fontSize = 7 * zoom / 100;
    const lineHeight = 7 * zoom / 100;

    return (
        <>
            <Toolbar ascii={ascii} />

            <div className="ascii-controls">
                <button
                    type="button"
                    className="zoom-btn"
                    onClick={decreaseZoom}
                    disabled={zoom <= 50}
                    aria-label="Decrease ASCII zoom"
                >
                    −
                </button>

                <button
                    type="button"
                    className="zoom-value"
                    onClick={resetZoom}
                    aria-label="Reset ASCII zoom to 100 percent"
                >
                    {zoom}%
                </button>

                <button
                    type="button"
                    className="zoom-btn"
                    onClick={increaseZoom}
                    disabled={zoom >= 300}
                    aria-label="Increase ASCII zoom"
                >
                    +
                </button>
            </div>

            <pre
                className={`ascii-output ${!ascii ? "ascii-empty" : ""}`}
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`
                }}
            >
                {ascii || "Upload an image to generate ASCII art."}
            </pre>
        </>
    );
}