import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith("/order")) {
    const id = request.nextUrl.pathname.split("/")[2];
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_OG_EXTRANET_URL}/ordremission.asp?numcom=${id}`
    );
  }

  if (request.nextUrl.pathname.startsWith("/appointment")) {
    const id = request.nextUrl.pathname.split("/")[2];
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_OG_EXTRANET_URL}/ficherdvconsultcli.asp?numero=${id}`
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/order/:id*", "/appointment/:id*"],
};
