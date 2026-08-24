"use client";

import { AsciiOptions } from "@/hooks/useAscii";

type ControlsProps = {
  options: AsciiOptions;
  setOptions: React.Dispatch<React.SetStateAction<AsciiOptions>>;
};

const DEFAULT_OPTIONS: AsciiOptions = {
  width: 120,
  brightness: 0,
  contrast: 0,
  invert: false,
  characterSet: "standard",
};

export default function Controls({ options, setOptions }: ControlsProps) {
  function update<K extends keyof AsciiOptions>(
    key: K,
    value: AsciiOptions[K],
  ) {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetControls() {
    setOptions(DEFAULT_OPTIONS);
  }

  return (
    <div className="controls">
      <div className="controls-heading">
        <div>
          <span className="controls-eyebrow">CUSTOMIZE</span>
          <h3>ASCII Settings</h3>
        </div>

        <button type="button" className="reset-btn" onClick={resetControls}>
          Reset
        </button>
      </div>

      <div className="control-group">
        <div className="control-header">
          <span>ASCII Width</span>
          <span>{options.width}</span>
        </div>

        <input
          type="range"
          min="40"
          max="300"
          step="10"
          value={options.width}
          onChange={(e) => update("width", Number(e.target.value))}
          aria-label="ASCII width"
        />

        <div className="control-hint">
          More characters create more detailed ASCII art.
        </div>
      </div>

      <div className="control-group">
        <div className="control-header">
          <span>Brightness</span>
          <span>
            {options.brightness > 0
              ? `+${options.brightness}`
              : options.brightness}
          </span>
        </div>

        <input
          type="range"
          min="-100"
          max="100"
          step="1"
          value={options.brightness}
          onChange={(e) => update("brightness", Number(e.target.value))}
          aria-label="Brightness"
        />

        <div className="control-hint">
          Adjust the overall brightness of the image.
        </div>
      </div>

      <div className="control-group">
        <div className="control-header">
          <span>Contrast</span>
          <span>
            {options.contrast > 0 ? `+${options.contrast}` : options.contrast}
          </span>
        </div>

        <input
          type="range"
          min="-100"
          max="100"
          step="1"
          value={options.contrast}
          onChange={(e) => update("contrast", Number(e.target.value))}
          aria-label="Contrast"
        />

        <div className="control-hint">
          Increase or reduce the difference between dark and light areas.
        </div>
      </div>

      <div className="control-group">
        <div className="control-header">
          <span>Character Set</span>
        </div>

        <select
          value={options.characterSet}
          onChange={(e) =>
            update(
              "characterSet",
              e.target.value as AsciiOptions["characterSet"],
            )
          }
          aria-label="Character set"
        >
          <option value="standard">Standard</option>
          <option value="dense">Dense</option>
          <option value="blocks">Blocks</option>
        </select>

        <div className="control-hint">
          Choose the characters used to build the ASCII image.
        </div>
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={options.invert}
          onChange={(e) => update("invert", e.target.checked)}
        />

        <span>
          <strong>Invert Colors</strong>
          <small>Swap light and dark areas.</small>
        </span>
      </label>
    </div>
  );
}
