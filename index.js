import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, NavLink, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { HouseHome, MagnifyingGlass } from "@vectopus/atlas-icons-react";
import React from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Nav() {
  const location = useLocation();
  const isBlogsActive = location.pathname === "/blogs" || location.pathname.startsWith("/blogs/post/");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchContainerRef = React.useRef(null);
  const handleSearchToggle = () => {
    if (isBlogsActive) {
      setIsSearchOpen((prev) => !prev);
    }
  };
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-orange-500 flex fixed top-0 left-0 right-0 p-4 z-20", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(NavLink, { to: "/", children: /* @__PURE__ */ jsx(HouseHome, { size: 24 }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-center space-x-10 items-center mx-auto ml-32", children: [
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(NavLink, { to: "/", className: ({ isActive }) => isActive ? "text-teal-500" : "text-black", children: "Home" }) }),
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(NavLink, { to: "/about", className: ({ isActive }) => isActive ? "text-teal-500" : "text-black", children: "About" }) }),
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(NavLink, { to: "/blogs", className: ({ isActive }) => isActive ? "text-teal-500" : "text-black", children: "Blogs" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-40 relative", children: /* @__PURE__ */ jsx("span", { children: isBlogsActive && /* @__PURE__ */ jsxs("div", { ref: searchContainerRef, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSearchToggle,
          className: "absolute right-2 top-1/2 transform -translate-y-1/2",
          children: /* @__PURE__ */ jsx(MagnifyingGlass, { size: 20 })
        }
      ),
      isSearchOpen ? /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search blogs...",
          className: "pr-10 p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full text-left",
          onBlur: () => setIsSearchOpen(false)
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-full h-6 invisible" })
    ] }) }) })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-0 pb-4 text-[100px] font-bold", children: "take drugs" });
}
function Clock() {
  const [date, setDate] = React.useState((/* @__PURE__ */ new Date()).toLocaleTimeString());
  React.useEffect(() => {
    (/* @__PURE__ */ new Date()).toLocaleTimeString();
    const intervalId = setInterval(() => {
      setDate((/* @__PURE__ */ new Date()).toLocaleTimeString());
    }, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    "Current time: ",
    date
  ] });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "p-20",
    children: [/* @__PURE__ */ jsx(Welcome, {}), /* @__PURE__ */ jsx(Clock, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function about2() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20 pl-6",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "About"
    }), /* @__PURE__ */ jsx("p", {
      children: "This is the about page."
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
async function fetchPostData() {
  try {
    const response = await fetch("/posts.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
}
const BlogPost = UNSAFE_withComponentProps(function BlogPost2() {
  const [post, setPost] = React.useState([]);
  const [selectedPost, setSelectedPost] = React.useState(null);
  React.useEffect(() => {
    fetchPostData().then((data) => setPost(data.Posts)).catch((error) => console.error("Error fetching blog posts:", error));
  }, []);
  const handlePostClick = (post2) => {
    setSelectedPost(post2);
  };
  const closePopup = () => {
    setSelectedPost(null);
  };
  const handleBackgroundClick = (e) => {
    closePopup();
  };
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "grid grid-cols-1 gap-4 p-4 pt-20",
    children: [post.map((post2) => /* @__PURE__ */ jsxs("div", {
      className: "border rounded-lg p-4 cursor-pointer hover:bg-gray-100",
      onClick: () => handlePostClick(post2),
      children: [/* @__PURE__ */ jsx("h2", {
        children: post2.title
      }), /* @__PURE__ */ jsx("p", {
        children: post2.summary
      })]
    }, post2.id)), selectedPost && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10",
      onClick: handleBackgroundClick,
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative",
        onClick: handleContentClick,
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-bold mb-4",
          children: selectedPost.title
        }), /* @__PURE__ */ jsx("p", {
          children: selectedPost.content
        }), /* @__PURE__ */ jsx("button", {
          onClick: closePopup,
          className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
          children: "✕ Close"
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogPost
}, Symbol.toStringTag, { value: "Module" }));
const blogs = UNSAFE_withComponentProps(function Blogs() {
  return /* @__PURE__ */ jsx("div", {
    className: "Justify-center flex flex-col items-center mx-auto",
    children: /* @__PURE__ */ jsx(BlogPost, {})
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blogs
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dhe23UtT.js", "imports": ["/assets/chunk-NL6KNZEE-Bert0LAe.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-pdiJS3il.js", "imports": ["/assets/chunk-NL6KNZEE-Bert0LAe.js"], "css": ["/assets/root-Doby7cEf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CMvcaZ8r.js", "imports": ["/assets/chunk-NL6KNZEE-Bert0LAe.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-BoXymJDB.js", "imports": ["/assets/chunk-NL6KNZEE-Bert0LAe.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blogs": { "id": "routes/blogs", "parentId": "root", "path": "blogs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blogs-ClYpZWJA.js", "imports": ["/assets/chunk-NL6KNZEE-Bert0LAe.js", "/assets/blog-post-DYgNbTF9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog-post": { "id": "routes/blog-post", "parentId": "routes/blogs", "path": "post/:postId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog-post-DYgNbTF9.js", "imports": ["/assets/chunk-NL6KNZEE-Bert0LAe.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-55b046bc.js", "version": "55b046bc", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/blogs": {
    id: "routes/blogs",
    parentId: "root",
    path: "blogs",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/blog-post": {
    id: "routes/blog-post",
    parentId: "routes/blogs",
    path: "post/:postId",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
