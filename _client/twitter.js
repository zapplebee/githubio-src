import React from "react";
import ReactDom from "react-dom";
import { TwitterTweetEmbed, TwitterShareButton } from "react-twitter-embed";

const nodes = [...document.querySelectorAll(".zapplebee-twitter-embed")];

[...document.querySelectorAll(".zapplebee-twitter-embed")].forEach((e) => {
  ReactDom.render(
    <TwitterTweetEmbed tweetId={e.getAttribute("data-tweet-id")} />,
    e
  );
});

[...document.querySelectorAll(".zapplebee-twitter-share")].forEach((e) => {
  ReactDom.render(
    <TwitterShareButton
      url={window.location.href}
      options={{
        text: e.getAttribute("data-tweet-text"),
        via: e.getAttribute("data-tweet-username"),
      }}
    />,
    e
  );
});
