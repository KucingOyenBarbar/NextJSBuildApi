import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com";

type Props = {
  params: {
    id: string
  }
}

export async function GET(request: Request, {params : {id}}: Props) {
  try {
    // const todoId = request.url.slice(request.url.lastIndexOf('/') + 1)
    const endpoint = "todos";
    const response: Response = await fetch(`${DATA_SOURCE_URL}/${endpoint}/${id}`);
    const todo: Todo = await response.json();
    if (!todo.id) return new NextResponse(JSON.stringify({
      status: "fail",
      message: "Todo Not Found"
    }), {
      status: 404, 
    })
    return NextResponse.json({todos: todo});
  } catch (error) {
    console.log(error);
    return  NextResponse.json({message: error})
  }
}