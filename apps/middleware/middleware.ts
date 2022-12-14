import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/(.*)",
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = url.hostname;

  let subdomain = hostname?.split(".")[0];
  console.log("BASE OBJECT", url);

  if (subdomain && subdomain.includes("admin")) {
    const newUrl = new URL(process.env.ADMIN_URL || "");
    newUrl.pathname = url.pathname;
    console.log("REWRITE TO ADMIN", newUrl);
    return NextResponse.rewrite(newUrl);
  }

  const newUrl = new URL(process.env.ADMIN_URL || "");
  newUrl.pathname = url.pathname;
  if (subdomain) {
    newUrl.pathname = `/${subdomain}${newUrl.pathname}`;
  }

  newUrl.hostname = process.env.PUBLIC_URL || "";
  console.log("REWRITE TO PUBLIC", newUrl);
  return NextResponse.rewrite(newUrl);
}
