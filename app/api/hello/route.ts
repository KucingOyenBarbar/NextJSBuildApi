import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";

export async function GET(requests: Request) {
  const origin = requests.headers.get('origin');
  const remaining = await limiter.removeTokens(1);
  console.log('remaining', remaining);

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 420,
      statusText: "Too Many Request",
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-Type': 'text/plain'
      }
    })
  }

  return NextResponse.json({message: "Hello, Next.js"})
}