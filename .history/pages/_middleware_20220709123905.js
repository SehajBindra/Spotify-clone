import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   // token will exist if the user is login
//   const token = await getToken({ req, secret: process.env.JWT_SECRET });

//   const { pathname } = req.nextUrl;
//   // allow the request if the following is true
//   // 1) its request for next auth session & provider fetching
//   // 2) the token exists

//   if (pathname.includes("/api/auth") || token) {
//     return NextResponse.next();
//   }

//   // REDIRECT them to login page if they dont have the token and requesting a protected route
//   if (!token && pathname !== "/login") {
//     return NextResponse.redirect("/login");
//   }
// }
