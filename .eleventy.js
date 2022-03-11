import { render } from "./lib/mdx";

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", { render });
  eleventyConfig.addPassthroughCopy("11ty/images/**/*");
  return {
    templateFormats: ["md", "11ty.js"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: false,
    pathPrefix: "/",
    dir: {
      input: "11ty",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
