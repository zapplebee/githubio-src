import fs from "fs";

export const colors = Object.fromEntries(
  fs
    .readFileSync("./_client/styles/colors.scss", "utf-8")
    .split("\n")
    .filter((r) => r.startsWith("$"))
    .map((r) => r.replace(";", ""))
    .map((r) => r.replace("$", ""))
    .map((r) => r.split(":").map((e) => e.trim()))
);

export const karlaA = fs.readFileSync("./_client/karla_a.woff2", "base64");
export const karlaB = fs.readFileSync("./_client/karla_b.woff2", "base64");
