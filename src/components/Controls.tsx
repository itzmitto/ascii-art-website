type ControlsProps = {
    width: number;
    setWidth: (value: number) => void;
};
export default function Controls({
    width,
    setWidth,
}: ControlsProps) {
    return (
        <section className="controls">
            <div className="control">

                <div className="control-header">
                    <span>ASCII Width</span>
                    <strong>{width}px</strong>
                </div>
                <input
                    type="range"
                    min={40}  
                    max={250}
                    step={1}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                />
                <p className="control-description">
                    Adjust the width of the generated ASCII art. Higher values
                    create more detail but take longer to render.
                </p>
            </div>
        </section>
    );
}