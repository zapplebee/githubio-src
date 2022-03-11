import React from "react";
import { SvgKarlaStyle } from "../lib/components";
import { colors } from "../lib/css";
import { render } from "./../lib/svgJsxToImgBuffer";

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
          return "index-twitter.png";
        }
        return post.url.replace(".html", "-twitter.png");
      },
      width: 1200,
    };
  }

  async render(data) {
    function* getLines() {
      const words = data.post.data.title.split(" ");
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const possibleLine = line + " " + words[i];
        if (possibleLine.length > 22) {
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
          d="M 0,0 L 1200,100 L1200,630 L 0,630 Z"
          style={{ fill: "url(#linearGradient904)" }}
        />

        {x.map((line, index) => {
          return (
            <text
              x="44"
              y={128 + index * 56}
              fill={colors.darkBlue}
              fontSize={"48"}
              fontFamily="Karla"
              fontStyle={"uppercase"}
              fontWeight={"700"}
            >
              {line}
            </text>
          );
        })}

        <text
          x="610"
          y="510"
          fill={colors.darkBlue}
          fontSize={"114"}
          textAnchor="end"
          fontFamily="Karla"
          fontWeight={"bold"}
          fontStyle={"uppercase"}
        >
          zapplebee
        </text>

        <text
          x="610"
          y="550"
          fill={colors.hotRed}
          textAnchor="end"
          fontSize={"64"}
          fontFamily="Karla"
          fontWeight={"bold"}
          fontStyle={"uppercase"}
        >
          .github.io
        </text>
      </svg>
    );

    return render(node, 1200);
  }
}

module.exports = Index;
