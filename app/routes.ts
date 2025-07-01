import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    
    route("blogs", "routes/blogs.tsx", [
        route("post/:postId","routes/blog-post.tsx")])

] satisfies RouteConfig;
