"use client";

type Props = {
    ascii: string;
};

export default function AsciiGifViewer({ ascii }: Props) {
    return (
        <pre className="ascii-output">
            {ascii || "Loading GIF..."}
        </pre>
    );
}