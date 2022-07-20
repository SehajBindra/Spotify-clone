// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   url.pathname = "/login";
//   // token will exist if the user is logged in
//   const token = await getToken({ req, secret: process.env.JWT_SECRET });
//   const { pathname } = req.nextUrl;

//   // ALlow the request if the following is true:
//   // 1) it's a request to next-auth session
//   // 2) the token exists

//   if (pathname.includes("/api/auth") || token) {
//     return NextResponse.next();
//   }

//   // redirect to login page if the user is not logged in and they are requesting a protected routeing a protected route
//   if (!token && pathname !== url.pathname) {
//     return NextResponse.rewrite(url);
//   }
// }

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   url.pathname = "/login";

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

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";
// import { JWT } from "next-auth/jwt";

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   url.pathname = "/login";
//   // token will exist if the user is logged in
//   const token = await getToken({ req, nextauth: { token: JWT | null } });
//   console.log(req);
//   const { pathname } = req.nextUrl;

//   // ALlow the request if the following is true:
//   // 1) it's a request to next-auth session
//   // 2) the token exists

//   if (pathname.includes("/api/auth") || token) {
//     return NextResponse.next();
//   }

//   // redirect to login page if the user is not logged in and they are requesting a protected routeing a protected route
//   if (!token && pathname !== url.pathname) {
//     return NextResponse.rewrite(url);
//   }
// }

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   url.pathname = "/login";
//   // token will exist if the user is logged in
//   const token = await getToken({ req, secret: process.env.JWT_SECRET });
//   const { pathname } = req.nextUrl;

//   // ALlow the request if the following is true:
//   // 1) it's a request to next-auth session
//   // 2) the token exists

//   if (pathname.includes("/api/auth") || token) {
//     return NextResponse.next();
//   }

//   // redirect to login page if the user is not logged in and they are requesting a protected routeing a protected route
//   if (!token && pathname !== url.pathname) {
//     return NextResponse.rewrite(url);
//   }
// }

import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.oursiteJWT;
  const url = req.url;
  if (url.includes("/api/auth")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/login");
    }

    try {
      verify(jwt, secret);

      return NextResponse.next();
    } catch (e) {}
  }
}
