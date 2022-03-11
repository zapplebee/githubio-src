import React from "react";
// import sharp from "sharp";
import { colors } from "./../lib/css";
import { render } from "./../lib/svgJsxToImgBuffer";
import { SvgKarlaStyle } from "./../lib/components";

class Index {
  data() {
    return {
      sizes: [180, 32, 16, 96, 57, 114, 72, 144, 60, 120, 76, 152],
      pagination: {
        data: "sizes",
        size: 1,
        alias: "size",
      },
      eleventyExcludeFromCollections: true,
      tag: [],
      width: (data) => data.size,
      permalink: (data) => {
        return `icons/favicon-${data.size}.png`;
      },
    };
  }

  async render(data) {
    const node = (
      <svg
        version="1.1"
        viewBox="0 0 630 630"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <SvgKarlaStyle />
        <defs>
          <linearGradient
            id="linearGradient904"
            x1="24"
            x2="488"
            y1="256"
            y2="256"
            gradientUnits="userSpaceOnUse"
          >
            <stop style={{ stopColor: colors.hotRed }} offset="0" />
            <stop style={{ stopColor: colors.peach }} offset="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" fill={colors.darkBlue} height={630} width={1200} />
        <path
          transform="translate(0,120)"
          d="M 0,0 L 1200,100 L1200,630 L 0,630 Z"
          style={{ fill: "url(#linearGradient904)" }}
        />

        <text
          x="8"
          y="550"
          fill={colors.darkBlue}
          fontSize={"480"}
          fontFamily="Karla"
          fontWeight={"bold"}
          fontStyle={"uppercase"}
        >
          ZS
        </text>
      </svg>
    );

    return render(node, data.size);
  }
}

module.exports = Index;
