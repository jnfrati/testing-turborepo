const { ADMIN_URL, PUBLIC_URL } = process.env;

export const config = {
  matcher: ["/.*)"],
};

export default async function middleware(req) {
  const url = new URL(req.url);

  const hostname = url.hostname;

  let subdomain = hostname?.split(".")[0];

  if (subdomain && subdomain.includes("admin")) {
    url.hostname = ADMIN_URL;

    return Response.rewrite(url);
  }

  if (subdomain) {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  url.hostname = PUBLIC_URL;

  return Response.rewrite(url);
}
