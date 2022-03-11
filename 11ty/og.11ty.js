import React from "react";
import { colors } from "../lib/css";
import { SvgKarlaStyle } from "../lib/components";
import { render } from "./../lib/svgJsxToImgBuffer";
// import { theme } from "twin.macro";

class Index {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      pagination: {
        data: "collections.all",
        size: 1,
        alias: "post",
      },
      tag: [],
      title: "aaa",
      permalink: ({ post }) => {
        if (!post.url.includes(".html")) {
          return "index-og.png";
        }
        return post.url.replace(".html", "-og.png");
      },
    };
  }

  async render(data) {
    function* getLines() {
      const words = (data.post.data?.title ?? "").split(" ");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const possibleLine = line + " " + words[i];
        if (possibleLine.length > 30) {
          yield line;
          line = words[i];
        } else {
          line = possibleLine;
        }
      }
      yield line;
    }

    const x = [...getLines()];

    const node = (
      <svg
        version="1.1"
        viewBox="0 0 1200 630"
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
          d="M 0,0 L 1200,100 L1200,630 L 0,630 Z"
          style={{ fill: "url(#linearGradient904)" }}
        />

        {data.post.data?.ogTitle !== false
          ? x.map((line, index) => {
              return (
                <text
                  x="50"
                  y={164 + index * 64}
                  fill={colors.darkBlue}
                  fontSize={"64"}
                  fontFamily="Karla"
                  fontStyle={"uppercase"}
                  fontWeight={"700"}
                >
                  {line}
                </text>
              );
            })
          : null}

        <text
          x="200"
          y="550"
          fill={colors.darkBlue}
          fontSize={"102"}
          fontFamily="Karla"
          fontWeight={"bold"}
          fontStyle={"uppercase"}
        >
          zapplebee.github.io
        </text>
      </svg>
    );

    return render(node, 1200, 630);
  }
}

module.exports = Index;
