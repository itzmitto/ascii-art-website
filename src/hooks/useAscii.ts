"use client";
import { useEffect, useState } from "react";
import { imageToAscii } from "@/lib/ascii";

export type AsciiOptions = {
    width: number;
    brightness: number;
    contrast: number;
    invert: boolean;
    characterSet: "standard" | "dense" | "blocks";
};
export function useAscii(
    image: string | null,
    options: AsciiOptions
) {
    const [ascii, setAscii] = useState("");
    useEffect(() => {
        if (!image) {
            setAscii("");
            return;
        }
        const img = new Image();
        img.onload = () => {
            const result = imageToAscii(img, options);
            setAscii(result);
        };
        img.src = image;
    }, [
        image,
        options.width,
        options.brightness,
        options.contrast,
        options.invert,
        options.characterSet
    ]);
    return ascii;
}