import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

console.log('middleware', process.env.NEXT_PUBLIC_OG_EXTRANET_URL)

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/order")) {
    const id = request.nextUrl.searchParams.get("id");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_OG_EXTRANET_URL}/ordremission.asp?numcom=${id}`
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/order/:id",
};
