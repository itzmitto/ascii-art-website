type PreviewProps = {
    image: string;
    fileName: string;
    fileSize: string;
};
export default function Preview({
    image,
    fileName,
    fileSize,
}: PreviewProps) {
    return (
        <>
            <img
                className="preview-image"
                src={image}
                alt={fileName}
            />
            <div className="preview-info">
                <h3>{fileName}</h3>
                <span>{fileSize}</span>
            </div>
        </>
    );
}