import { parseGIF, decompressFrames } from "gifuct-js";

export type GifFrame = {
    patch: Uint8ClampedArray;
    dims: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    delay: number;
};

export type GifData = {
    width: number;
    height: number;
    frameCount: number;
    duration: number;
    frames: GifFrame[];
};

export async function readGif(file: File): Promise<GifData> {
    const buffer = await file.arrayBuffer();
    const gif = parseGIF(buffer);
    const frames = decompressFrames(gif, true);
    const duration = frames.reduce(
        (total, frame) => total + frame.delay,
        0
    );
    return {
        width: frames[0].dims.width,
        height: frames[0].dims.height,
        frameCount: frames.length,
        duration,
        frames: frames.map(frame => ({
            patch: frame.patch,
            dims: frame.dims,
            delay: frame.delay
        }))
    };
}