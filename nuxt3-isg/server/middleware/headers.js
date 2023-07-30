export default defineEventHandler((event) => {
  if (process.env.VERCEL_ENV === "production") {
    event.node.res.setHeader(
      "Cache-Control",
      "s-maxage=1, stale-while-revalidate=59"
    );
  } else {
    event.node.res.setHeader(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    event.node.res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
});
