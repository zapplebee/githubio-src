const title = document.querySelector(".title");
function doAnimate() {
  window.requestAnimationFrame(doAnimate);
  const time = Math.floor(Date.now() / 50);
  let deg3 = time % 360;
  title.style.setProperty("--turn", `${deg3}deg`);
}
doAnimate();

const imageUrl = new URL("~/clippy.png", import.meta.url);

console.log(
  "%c         ",
  `font-size: 100px;letter-spacing:-1em;background-size:contain;background-repeat: no-repeat;background-image: url("${imageUrl.href}")`
);

console.log(
  "%cLooks like you're trying to see how this webpage works. Why not have a look at the repository?",
  "font-size: 24px;letter-spacing:-1em; font-family: serif;"
);

console.log("https://github.com/zapplebee/personal-blog");
