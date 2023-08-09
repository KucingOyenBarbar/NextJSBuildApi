import { NextResponse } from "next/server";

const allowedOrigins: string[] = process.env.NODE_ENV === 'production'
  ? ['https://www.yoursite.com', 'https://yoursite.com']
  : ['http://localhost:3000', 'https://www.google.com']

export default function middleware(request: Request) {
  const origin: string | null = request.headers.get('origin')
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Server Bad Request",
      headers: {'Content-Type': 'text/plain'}
    })
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}