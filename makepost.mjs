import { formatISO } from "date-fns";
import { writeFileSync, existsSync } from "fs";
const postTitle = process.argv?.[2] ?? "new post";

const initialContent = `---
title: ${postTitle}
summary: ""
date: ${formatISO(new Date())}
tags: []
---

`;

console.log(initialContent);

const path = `./11ty/posts/${postTitle.replaceAll(" ", "-")}.md`;
if (existsSync(path)) {
  console.error(`${path} already exists`);
} else {
  writeFileSync(path, initialContent);
  console.log(`${path} created`);
}
