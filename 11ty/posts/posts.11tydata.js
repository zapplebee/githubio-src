module.exports = {
  permalink: (data) => {
    return data.page.filePathStem + ".html";
  },
  tags: ["post"],
  theme: "post",
  author: "Zac Skalko",
  location: "Minneapolis, MN",
  twitter: true,
  twitterUser: "zapplebee",
};
