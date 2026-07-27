"use client";

import { useEffect, useState } from "react";
import { imageToAscii } from "@/lib/ascii";

export function useAscii(image: string | null, width: number) {
    const [ascii, setAscii] = useState("");
    useEffect(() => {
        if (!image) {
            setAscii("");
            return;
        }
        const img = new Image();
        img.onload = () => {
            setAscii(imageToAscii(img, width));
        };
        img.src = image;
    }, [image, width]);
    return ascii;
}