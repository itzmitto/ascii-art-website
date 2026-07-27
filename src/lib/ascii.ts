const CHARACTER_SETS = {
    standard: "@%#*+=-:. ",
    dense: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
    blocks: "█▓▒░ "
};

type CharacterSet = keyof typeof CHARACTER_SETS;
type AsciiOptions = {
    width: number;
    brightness?: number;
    contrast?: number;
    invert?: boolean;
    characterSet?: CharacterSet;
};
export function imageToAscii(
    image: HTMLImageElement,
    options: number | AsciiOptions
) {
    const settings: AsciiOptions =
        typeof options === "number"
            ? {
                width: options,
                brightness: 0,
                contrast: 0,
                invert: false,
                characterSet: "standard"
            }
            : {
                brightness: 0,
                contrast: 0,
                invert: false,
                characterSet: "standard",
                ...options
            };
    const chars = CHARACTER_SETS[settings.characterSet];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const ratio = image.height / image.width;
    canvas.width = settings.width;
    canvas.height = Math.max(
        1,
        Math.floor(settings.width * ratio * 0.55)
    );
    ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
    );
    const pixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    ).data;
    let ascii = "";
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            let r = pixels[index];
            let g = pixels[index + 1];
            let b = pixels[index + 2];
            let brightness =
                0.299 * r +
                0.587 * g +
                0.114 * b;
            brightness += settings.brightness;
            brightness = ((brightness - 128) * (1 + settings.contrast / 100)) + 128;
            brightness = Math.max(
                0,
                Math.min(255, brightness)
            );
            if (settings.invert) {
                brightness = 255 - brightness;
            }
            const charIndex = Math.floor(
                (brightness / 255) * (chars.length - 1)
            );
            ascii += chars[charIndex];
        }
        ascii += "\n";
    }
    return ascii;
}