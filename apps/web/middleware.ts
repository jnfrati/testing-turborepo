import { NextRequest, NextResponse } from "next/server";
// import { getHostnameDataOrDefault } from './lib/db'

const { BLOG_URL } = process.env as any;

export const config = {
  matcher: ["/:path"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get("host");

  // // If localhost, assign the host value manually
  // // If prod, get the custom domain/subdomain value by removing the root URL
  // // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  // const currentHost = "zifosteam.com"
  //   process.env.NODE_ENV === 'production' &&
  //   hostname.replace(`.${process.env.ROOT_DOMAIN}`, '')
  // const data = await getHostnameDataOrDefault(currentHost)

  console.log({
    url,
    hostname,
  });
  console.log("URL", url);
  let subdomain = hostname?.replace((process.env as any).VERCEL_URL, "");

  if (hostname?.includes("zifosteam.com")) {
    subdomain = hostname?.replace("zifosteam.com", "");
  }

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

  // // Prevent security issues – users should not be able to canonically access
  // // the pages/sites folder and its respective contents.
  // if (url.pathname.startsWith(`/_sites`)) {
  //   url.pathname = `/404`
  // } else {
  //   console.log('URL 2', req.nextUrl.href)
  //   // rewrite to the current subdomain under the pages/sites folder
  //   url.pathname = `/_sites/${data.subdomain}${url.pathname}`
  // }

  // return NextResponse.rewrite(url)
}
