"use client";

import { GifData } from "@/lib/gif";
type Props = {
    gif: GifData | null;
};
export default function GifPlayer({ gif }: Props) {
    if (!gif) return null;
    return (
        <div className="gif-info">
            <h3>GIF Information</h3>
            <div className="gif-grid">
                <div>
                    <strong>Frames</strong>
                    <p>{gif.frameCount}</p>
                </div>
                <div>
                    <strong>Size</strong>
                    <p>{gif.width} × {gif.height}</p>
                </div>
                <div>
                    <strong>Duration</strong>
                    <p>{gif.duration} ms</p>
                </div>
            </div>
        </div>
    );
}