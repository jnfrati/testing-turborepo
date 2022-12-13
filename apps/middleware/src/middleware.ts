import { rewrite } from "@vercel/edge";

export const config = {
  matcher: "/(.*)",
};

export default async function middleware(req: Request) {
  const url = new URL(req.url);

  const hostname = url.hostname;

  let subdomain = hostname?.split(".")[0];
  console.log(url);

  if (subdomain && subdomain.includes("admin")) {
    url.hostname = process.env.ADMIN_URL || "";
    console.log(url);
    return rewrite(url);
  }

  if (subdomain) {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  url.hostname = process.env.PUBLIC_URL || "";
  console.log(url);
  return rewrite(url);
}
