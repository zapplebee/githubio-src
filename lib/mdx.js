import React from "react";

import { renderToString } from "react-dom/server";
import { colors } from "./css";
import MDX from "@mdx-js/runtime";
import {
  Footer,
  Header,
  Head,
  FontLoader,
  Script,
  Body,
  Posts,
  Code,
  Article,
  Cite,
  Quote,
  Tweet,
  AttributedImage,
  CodeSandbox,
  Table,
} from "./components";
import { EleventyProvider } from "./context";

console.log(colors);

// Provide custom components for markdown elements
const components = {
  code: Code,
  blockquote: Quote,
  Cite,
  Quote,
  Tweet,
  AttributedImage,
  CodeSandbox,
  table: Table,
};

export const render = async (content, data) => {
  const Wrapper = data.theme === "post" ? Article : "section";

  const Kids =
    data.theme === "post" || data.theme === "about" ? (
      <MDX components={components} scope={data}>
        {content}
      </MDX>
    ) : (
      <Posts />
    );

  return (
    `<!DOCTYPE html>` +
    renderToString(
      <EleventyProvider value={data}>
        <html lang="en">
          <Head />
          <Body>
            <FontLoader />
            <Header />
            <Wrapper>{Kids}</Wrapper>
            <Footer />
            <Script src={"rotate.js"} />
            {data.twitter && <Script src={"twitter.js"} />}
          </Body>
        </html>
      </EleventyProvider>
    )
  );
};
