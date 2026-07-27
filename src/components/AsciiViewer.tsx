"use client";

import Toolbar from "./Toolbar";

type Props = {
    ascii: string;
};
export default function AsciiViewer({ ascii }: Props) {
    return (
        <>
            <Toolbar ascii={ascii} />
            <pre className="ascii-output">
                {ascii || "Upload an image to generate ASCII..."}
            </pre>
        </>
    );
}