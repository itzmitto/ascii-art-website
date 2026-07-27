const CHARACTERS = "@%#*+=-:. ";

export function imageToAscii(
    image: HTMLImageElement,
    width = 120
) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return "";
    const aspectRatio = image.height / image.width;
    const height = Math.floor(width * aspectRatio * 0.55);
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    const { data } = context.getImageData(
        0,
        0,
        width,
        height
    );
    let ascii = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const brightness =
                0.299 * r +
                0.587 * g +
                0.114 * b;
            const charIndex = Math.floor(
                brightness / 255 * (CHARACTERS.length - 1)
            );
            ascii += CHARACTERS[charIndex];
        }
        ascii += "\n";
    }
    return ascii;
}