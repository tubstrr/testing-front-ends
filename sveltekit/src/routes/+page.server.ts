/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  response.headers.set(
    "Cache-Control",
    "s-maxage=1, stale-while-revalidate=60"
  );

  return response;
}

export const config = {
  isr: {
    expiration: 60,
    bypassToken: "bypass",
  },
};
