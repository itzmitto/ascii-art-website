"use client";
import { AsciiOptions } from "@/hooks/useAscii";

type ControlsProps = {
    options: AsciiOptions;
    setOptions: React.Dispatch<React.SetStateAction<AsciiOptions>>;
};

export default function Controls({ options, setOptions }: ControlsProps) {

    function update<K extends keyof AsciiOptions>(key: K, value: AsciiOptions[K]) {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }));
    }

    return (
        <div className="controls">
            <div className="control-group">
                <div className="control-header">
                    <span>ASCII Width</span>
                    <span>{options.width}px</span>
                </div>
                <input
                    type="range"
                    min="40"
                    max="300"
                    step="10"
                    value={options.width}
                    onChange={(e) => update("width", Number(e.target.value))}
                />
            </div>
            <div className="control-group">
                <div className="control-header">
                    <span>Brightness</span>
                    <span>{options.brightness}</span>
                </div>
                <input
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value={options.brightness}
                    onChange={(e) => update("brightness", Number(e.target.value))}
                />
            </div>
            <div className="control-group">
                <div className="control-header">
                    <span>Contrast</span>
                    <span>{options.contrast}</span>
                </div>
                <input
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value={options.contrast}
                    onChange={(e) => update("contrast", Number(e.target.value))}
                />
            </div>
            <div className="control-group">
                <div className="control-header">
                    <span>Character Set</span>
                </div>
                <select
                    value={options.characterSet}
                    onChange={(e) => update("characterSet", e.target.value as AsciiOptions["characterSet"])}
                >
                    <option value="standard">
                        Standard
                    </option>
                    <option value="dense">
                        Dense
                    </option>
                    <option value="blocks">
                        Blocks
                    </option>
                </select>
            </div>
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={options.invert}
                    onChange={(e) => update("invert", e.target.checked)}
                />
                <span>Invert Colors</span>
            </label>
        </div>
    );
}