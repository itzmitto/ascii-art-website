"use client";
type ControlsProps = {
    width: number;
    setWidth: (value: number) => void;
};
export default function Controls({ width, setWidth }: ControlsProps) {
    return (
        <div className="controls">
            <div className="control-group">
                <div className="control-header">
                    <span>ASCII Width</span>
                    <span>{width}</span>
                </div>
                <input
                    type="range"
                    min="40"
                    max="300"
                    step="10"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                />
            </div>
            <div className="control-group">
                <div className="control-header">
                    <span>Character Set</span>
                </div>
                <select disabled>
                    <option>Standard (coming soon)</option>
                </select>
            </div>
            <div className="control-group">
                <label className="checkbox">
                    <input type="checkbox" disabled />
                    <span>Invert Colors (coming soon)</span>
                </label>
            </div>
        </div>
    );
}