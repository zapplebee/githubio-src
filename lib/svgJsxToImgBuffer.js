import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

export async function render(input, width, height) {
  let svgString;
  if (typeof input === "string") {
    svgString = input;
  } else {
    svgString = renderToStaticMarkup(input);
  }
  const baseImage = sharp(Buffer.from(svgString));
  if (width) {
    return baseImage
      .clone()
      .resize({
        width: width,
        height: height ?? width,
      })
      .toBuffer();
  } else {
    return baseImage.clone().toBuffer();
  }
}
