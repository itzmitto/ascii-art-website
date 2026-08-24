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

export function useAscii(image: string | null, options: AsciiOptions) {
  const [ascii, setAscii] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!image) {
      setAscii("");
      setLoading(false);
      return;
    }

    setLoading(true);

    const img = new Image();

    img.onload = () => {
      if (cancelled) {
        return;
      }

      const result = imageToAscii(img, options);

      if (!cancelled) {
        setAscii(result);
        setLoading(false);
      }
    };

    img.onerror = () => {
      if (cancelled) {
        return;
      }

      setAscii("");
      setLoading(false);
    };

    img.src = image;

    return () => {
      cancelled = true;
    };
  }, [
    image,
    options.width,
    options.brightness,
    options.contrast,
    options.invert,
    options.characterSet,
  ]);

  return {
    ascii,
    loading,
  };
}
