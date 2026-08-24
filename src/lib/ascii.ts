const CHARACTER_SETS = {
  standard: "@%#*+=-:. ",
  dense:
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  blocks: "█▓▒░ ",
} as const;

type CharacterSet = keyof typeof CHARACTER_SETS;

export type AsciiOptions = {
  width: number;
  brightness?: number;
  contrast?: number;
  invert?: boolean;
  characterSet?: CharacterSet;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getBrightness(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function imageToAscii(
  image: HTMLImageElement,
  options: number | AsciiOptions,
): string {
  const settings: AsciiOptions =
    typeof options === "number"
      ? {
          width: options,
          brightness: 0,
          contrast: 0,
          invert: false,
          characterSet: "standard",
        }
      : {
          width: 120,
          brightness: 0,
          contrast: 0,
          invert: false,
          characterSet: "standard",
          ...options,
        };

  if (!image.complete || image.naturalWidth <= 0 || image.naturalHeight <= 0) {
    return "";
  }

  const width = Math.max(1, Math.floor(settings.width));
  const brightnessOffset = clamp(settings.brightness ?? 0, -100, 100);
  const contrast = clamp(settings.contrast ?? 0, -100, 100);
  const invert = settings.invert ?? false;
  const characterSet = settings.characterSet ?? "standard";
  const characters = CHARACTER_SETS[characterSet];

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  if (!ctx) {
    return "";
  }

  const aspectRatio = image.naturalHeight / image.naturalWidth;

  const height = Math.max(1, Math.floor(width * aspectRatio * 0.55));

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);

  const pixels = ctx.getImageData(0, 0, width, height).data;

  const contrastFactor = 1 + contrast / 100;
  const lines: string[] = [];

  for (let y = 0; y < height; y++) {
    let line = "";

    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const alpha = pixels[index + 3];

      let pixelBrightness = getBrightness(r, g, b);

      if (alpha === 0) {
        pixelBrightness = 255;
      }

      pixelBrightness += brightnessOffset;

      pixelBrightness = (pixelBrightness - 128) * contrastFactor + 128;

      pixelBrightness = clamp(pixelBrightness, 0, 255);

      if (invert) {
        pixelBrightness = 255 - pixelBrightness;
      }

      const characterIndex = Math.floor(
        (pixelBrightness / 255) * (characters.length - 1),
      );

      line += characters[characterIndex];
    }

    lines.push(line);
  }

  return lines.join("\n");
}
