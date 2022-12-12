import { NextRequest, NextResponse } from "next/server";
// import { getHostnameDataOrDefault } from './lib/db'

const { BLOG_URL } = process.env as any;

export const config = {
  matcher: ["/:path*"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host");

  let subdomain = hostname?.replace((process.env as any).VERCEL_URL, "");

  if (hostname?.includes("zifosteam.com")) {
    subdomain = hostname?.replace("zifosteam.com", "");
  }

  console.log(subdomain, url);

  if (subdomain?.includes(".") && url.pathname.includes("admin")) {
    return NextResponse.rewrite(
      `${BLOG_URL}/blog/${subdomain.replace(".", "")}${url.pathname}`
    );
  }

  if (subdomain) {
    return NextResponse.rewrite(
      `https://zifosteam.com/${subdomain.replace(".", "")}${url.pathname}`
    );
  }

  return NextResponse.rewrite(url);
}
