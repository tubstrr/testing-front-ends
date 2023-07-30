export default defineEventHandler((event) => {
  if (process.env.VERCEL_ENV === "production") {
    event.node.res.setHeader(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
  } else {
    event.node.res.setHeader(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    event.node.res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
});
