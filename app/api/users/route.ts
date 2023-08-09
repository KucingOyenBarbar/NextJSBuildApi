import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com";

export async function GET(request: Request) {
  const origin: string | null = request.headers.get('origin');
  const endpoint = "users";
  const response = await fetch(`${DATA_SOURCE_URL}/${endpoint}`);
  const users: Users[] = await response.json();

  return new NextResponse(JSON.stringify({
    status: "success",
    message: "Get All Users",
    data: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address
    })),
  }), {
    status: 200,
    headers: {
        'Access-Control-Allow-Origin': origin || "*",
        'Content-Type': 'application/json',
    }
  })
}