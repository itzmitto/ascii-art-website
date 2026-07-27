type AsciiViewerProps = {
    ascii: string;
};

export default function AsciiViewer({
    ascii,
}: AsciiViewerProps) {
    return (
        <>
            <h2>ASCII Output</h2>
            <pre className="ascii-output">
                {ascii}
            </pre>
        </>
    );
}