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
        <div className="preview">
            <img
                src={image}
                alt="Preview"/>
            <h3>{fileName}</h3>
            <span>{fileSize}</span>
        </div>
    );
}