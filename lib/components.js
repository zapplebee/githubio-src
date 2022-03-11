import React from "react";
import path from "path";
import { format } from "date-fns";
import { useEleventy } from "./context";
import { karlaA, karlaB } from "./css";
import { formatISO } from "date-fns";

import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs";

function CodeWrapper({ children, style }) {
  return (
    <div style={{ ...style, fontSize: "0.6em", padding: "2em", margin: "1em" }}>
      {children}
    </div>
  );
}

export function Code({ className, children, starton, filename, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  const lineNumbers = starton
    ? { showLineNumbers: true, startingLineNumber: parseInt(starton, 10) }
    : {};
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag={CodeWrapper}
      style={nightOwl}
      {...lineNumbers}
    >
      {children.trimEnd()}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props} />
  );
}

export function Footer() {
  const data = useEleventy();

  const tweetShareEntrypoint =
    data.twitter && data.twitterUser && data.title ? (
      <div
        className="zapplebee-twitter-share"
        data-tweet-text={`I just read '${data.title}'`}
        data-tweet-username={data.twitterUser}
      ></div>
    ) : null;
  return (
    <footer>
      {tweetShareEntrypoint}
      <a href="https://twitter.com/zapplebee">twitter</a>
      <a href="https://github.com/zapplebee">github</a>
      <a href="https://www.linkedin.com/in/zachary-skalko">linkedin</a>
    </footer>
  );
}

export function FontLoader() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href={
          "https://fonts.googleapis.com/css2?family=Karla:wght@400;800&family=Source+Code+Pro&display=swap"
        }
        rel="stylesheet"
      />
    </>
  );
}

export function Style({ src }) {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `@import "~/styles/${src}";`,
      }}
    ></style>
  );
}

export function Script({ src }) {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: `import "~/${src}";`,
      }}
    ></script>
  );
}

export function Head() {
  const data = useEleventy();

  const isPost = data.tags?.includes("post");

  const rel = isPost ? ".." : ".";

  const description = isPost
    ? data.summary
    : `${data.title} page on Zac Skalko's blog`;

  function toAssetLocation(namespace) {
    debugger;
    return `./${
      data.page.fileSlug === "" ? "index" : data.page.fileSlug
    }-${namespace}`;
  }

  function toFavicon(size) {
    return `${rel}/icons/favicon-${size}.png`;
  }

  debugger;

  return (
    <head>
      <meta charset="UTF-8" />
      <title>{`zapplebee.github.io | ${data.title}`}</title>
      <link rel="apple-touch-icon" sizes="180x180" href={toFavicon(180)} />
      <link rel="icon" type="image/png" sizes="32x32" href={toFavicon(32)} />
      <link rel="icon" type="image/png" sizes="16x16" href={toFavicon(16)} />
      <link rel="icon" type="image/png" href={toFavicon(96)} sizes="96x96" />
      <link rel="apple-touch-icon" sizes="57x57" href={toFavicon(57)} />
      <link rel="apple-touch-icon" sizes="114x114" href={toFavicon(114)} />
      <link rel="apple-touch-icon" sizes="72x72" href={toFavicon(72)} />
      <link rel="apple-touch-icon" sizes="144x144" href={toFavicon(144)} />
      <link rel="apple-touch-icon" sizes="60x60" href={toFavicon(60)} />
      <link rel="apple-touch-icon" sizes="120x120" href={toFavicon(120)} />
      <link rel="apple-touch-icon" sizes="76x76" href={toFavicon(76)} />
      <link rel="apple-touch-icon" sizes="152x152" href={toFavicon(152)} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="twitter:site"
        content={`@${data.twitterUser ?? "zapplebee"}`}
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description} />
      <meta name="description" content={description} />
      <meta name="twitter:image" content={toAssetLocation("twitter.png")} />
      <meta
        name="twitter:image:alt"
        content={`Image of text: ${data.title} | zapplebee.github.io`}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={toAssetLocation("og.png")} />
      <link
        rel="canonical"
        href={`https://zapplebee.github.io${data.page.url}`}
      />
      <meta
        property="og:url"
        content={`https://zapplebee.github.io${data.page.url}`}
      />
      <meta property="og:description" content={data.summary} />
      <meta property="og:type" content={isPost ? "article" : "website"} />
      <meta property="og:title" content={data.title} />
      {isPost ? (
        <meta
          property="article:published_time"
          content={formatISO(data.date)}
        />
      ) : null}
      <Style src={"main.scss"} />
    </head>
  );
}

export function Body({ children }) {
  const data = useEleventy();
  return (
    <body className={data.theme === "post" ? "article-page" : ""}>
      {children}
    </body>
  );
}

export function useTo(fileSlug) {
  const data = useEleventy();

  const currentUrl = data.page.url;

  const destUrl = data.collections.all.find(
    (p) => p.fileSlug === fileSlug
  )?.url;

  const currentDir = path.parse(currentUrl).dir;

  const relative = path.relative(currentDir, destUrl);

  if (relative === "") {
    return "./" + currentUrl;
  }

  return "./" + relative;
}

export function Header() {
  return (
    <>
      <header>
        <nav>
          <a className="title" href="/">
            <span>zapplebee</span>
            <span>.github.io</span>
          </a>
          <div className="header-links">
            <a href="/">posts</a>
            <a href={useTo("about")}>about</a>
          </div>
        </nav>
      </header>
      <div className="headshot">
        <img src="~/zac.png" alt="A photo of Zac's face." />
      </div>
    </>
  );
}

export function Details({ tagName, posts }) {
  return (
    <details open>
      <summary>
        <h1>
          <span className="section-name">
            {tagName}: <span className="open-brace"></span>
          </span>
        </h1>
      </summary>
      <div className="link-container">
        {posts.map((p) => {
          const dateString = format(p.data.date, "yyyy-MM-dd");
          return (
            <a href={useTo(p.fileSlug)} tabindex="0" key={p.url}>
              <h2>{p.data.title}</h2>
              <p>{p.data.summary}</p>
              <span>{dateString}</span>
            </a>
          );
        })}
      </div>
      <h1>
        <span className="close-brace"></span>
      </h1>
    </details>
  );
}

export function Posts() {
  const data = useEleventy();
  const posts = ["frontend", "backend", "personal"]
    .map((k) => [k, data.collections?.[k]])
    .filter(([_, posts]) => Boolean(posts));

  return (
    <>
      <h1 className="landing-brace">{"{"}</h1>
      {posts.map(([tagName, posts]) => {
        return <Details key={tagName} tagName={tagName} posts={posts} />;
      })}
      <h1 className="landing-brace">{"}"}</h1>
    </>
  );
}

export function Article({ children }) {
  const data = useEleventy();
  const dateString = data.date ? format(data.date, "yyyy-MM-dd") : null;

  const byLineElements = [
    data.author ? <span>{data.author}</span> : null,
    data.location ? <span>{data.location}</span> : null,
    dateString ? (
      <time className="article-date" datetime={dateString}>
        {dateString}
      </time>
    ) : null,
  ].filter((e) => e !== null);

  let i = 1;
  while (i < byLineElements.length) {
    byLineElements.splice(i, 0, <>{" | "}</>);
    i += 2;
  }

  return (
    <>
      <article>
        <h1>{data.title}</h1>
        <p>{data.summary}</p>
        <div className="by-line">{byLineElements}</div>
        {children}
      </article>
    </>
  );
}

export function Cite({ href, children }) {
  return (
    <cite>
      <a href={href}>{children}</a>
    </cite>
  );
}

export function Quote({ children, caption }) {
  return (
    <figure>
      <blockquote>
        <p>{children}</p>
      </blockquote>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function Tweet({ id, user = "zapplebee" }) {
  return (
    <>
      <div className="zapplebee-twitter-embed" data-tweet-id={id}></div>
      <noscript>
        Sorry. Can't show you an embedded Tweet without JavaScript enabled. You
        can see it <a href={`https://twitter.com/${user}/status/${id}`}>here</a>{" "}
        instead.
      </noscript>
    </>
  );
}

export function AttributedImage({ src, alt, attribution }) {
  return (
    <figure className="attributed-image">
      <img src={src} alt={alt} />
      <figcaption>{attribution}</figcaption>
    </figure>
  );
}

export function CodeSandbox({ src, title }) {
  return (
    <iframe
      src={src}
      title={title}
      style={{
        width: "99%",
        height: "80vh",
        border: 0,
        borderRight: "1px solid black",
        borderRadius: 0,
        overflow: "hidden",
      }}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
}

export function SvgKarlaStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `/* latin-ext */
@font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(data:font/woff2;base64,${karlaA}) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(data:font/woff2;base64,${karlaB}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(data:font/woff2;base64,${karlaA}) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(data:font/woff2;base64,${karlaB}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`,
      }}
    />
  );
}

function CardTable({ headers, rows }) {
  return (
    <div className="card-table" aria-hidden="true">
      {rows.map((cells) => {
        return (
          <div className="card">
            {cells.map((cell, index) => {
              return (
                <>
                  <div className="header">{headers[index]}</div>
                  <div className="cell">{cell}</div>
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const StandardTable = ({ children, ...props }) =>
  React.createElement("table", props, React.Children.toArray(children));

export function Table({ children }) {
  const contents = React.Children.toArray(children);

  let thead = null;
  let tbody = null;

  if (contents.length === 2) {
    [thead, tbody] = contents;
  } else {
    thead = null;
    tbody = contents[0];
  }

  const headers = thead
    ? React.Children.toArray(
        React.Children.toArray(thead.props.children)[0].props.children.map(
          (c) => c.props.children
        )
      )
    : null;

  const rows = React.Children.toArray(tbody.props.children).map((row) =>
    React.Children.toArray(row.props.children).map((td) => td.props.children)
  );

  return (
    <>
      <CardTable {...{ headers, rows }} />
      <StandardTable>{children}</StandardTable>
    </>
  );
}
