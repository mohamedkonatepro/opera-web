import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/order")) {
    const id = request.nextUrl.pathname.split('/')[2];
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_OG_EXTRANET_URL}/ordremission.asp?numcom=${id}`
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/order/:id*"],
};
