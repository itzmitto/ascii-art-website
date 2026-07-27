"use client";

type ToolbarProps = {
    ascii: string;
};

export default function Toolbar({ ascii }: ToolbarProps) {

    async function copyAscii() {
        if (!ascii) return;   
        await navigator.clipboard.writeText(ascii);
        alert("ASCII copied!");
    }
    function downloadTxt() {
        if (!ascii) return;
        const blob = new Blob([ascii], {
            type: "text/plain"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ascii-art.txt";
        a.click();
        URL.revokeObjectURL(url);
    }
    function downloadPng() {
        if (!ascii) return;
        const lines = ascii.split("\n");
        const fontSize = 12;
        const lineHeight = 16;
        const padding = 30;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.font = `${fontSize}px monospace`;
        let longest = 0;
        for (const line of lines) {
            const width = ctx.measureText(line).width;
            if (width > longest) {
                longest = width;
            }
        }
        canvas.width = Math.ceil(longest) + padding * 2;
        canvas.height = lines.length * lineHeight + padding * 2;
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px monospace`;
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "top";
        lines.forEach((line, index) => {
            ctx.fillText(
                line,
                padding,
                padding + index * lineHeight
            );
        });
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "ascii-art.png";
        a.click();
    }
    return (
        <div className="toolbar">
            <div className="toolbar-title">
                ASCII Output
            </div>
            <div className="toolbar-buttons">
                <button
                    className="toolbar-btn"
                    onClick={copyAscii}
                >Copy
                </button>
                <button
                    className="toolbar-btn"
                    onClick={downloadTxt}
                >TXT
                </button>
                <button
                    className="toolbar-btn"
                    onClick={downloadPng}
                >PNG
                </button>
            </div>
        </div>
    );
}