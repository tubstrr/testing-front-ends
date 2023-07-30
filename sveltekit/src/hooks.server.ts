/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);

  if (process.env.VERCEL_ENV === "production") {
    response.headers.set(
      "Cache-Control",
      "s-maxage=1, stale-while-revalidate=59"
    );
  } else {
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}
