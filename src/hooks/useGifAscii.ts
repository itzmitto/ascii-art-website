"use client";

import { useEffect, useState } from "react";

export default function useGifAscii() {
    const [frames, setFrames] = useState<string[]>([]);
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        if (frames.length === 0) return;
        const interval = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % frames.length);
        }, 100);
        return () => clearInterval(interval);
    }, [frames]);
    return {
        frames,
        setFrames,
        currentFrame,
        ascii: frames[currentFrame] ?? ""
    };

}