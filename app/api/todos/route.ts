import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function POST(request: Request) {
  const todo: Todo = await request.json();

  if (!todo.userId || !todo.id || !todo.title || typeof (todo.completed) !== "boolean") return NextResponse.json({ message: "Missing required data!" })

  const endpoint = "todos";
  const response: Response = await fetch(`${DATA_SOURCE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
    body: JSON.stringify({
      userId: todo.userId,
      title: todo.title,
      completed: false
    })
  });
  
  const newTodo: Todo = await response.json();
  return NextResponse.json({message: "Added Todo", newTodo})
}

export async function GET(request: Request) {
  const origin = request.headers.get('origin');
  try {
    const endpoint = "todos";
    const response: Response = await fetch(`${DATA_SOURCE_URL}/${endpoint}`);
    const todos: Todo[] = await response.json();

    return new NextResponse(JSON.stringify(todos), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || "*",
        'Content-Type': 'application/json',
      }
    })
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err });
  }
}

export async function PUT(request: Request) {
  const todo: Todo = await request.json();

  if (!todo.userId || !todo.id || !todo.title || typeof (todo.completed) !== "boolean") return NextResponse.json({ message: "Missing required data!" })

  const endpoint = "todos";
  const response: Response = await fetch(`${DATA_SOURCE_URL}/${endpoint}/${todo.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
    body: JSON.stringify({
      userId: todo.userId,
      title: todo.title,
      completed: todo.completed
    })
  });

  const updatedTodo: Todo = await response.json();
  return NextResponse.json({message: "Todo Updated", todos: updatedTodo})
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();
  console.log(id)
  if (!id) return NextResponse.json({ message: "Todo id required" });
  const endpoint = "todos";
  await fetch(`${DATA_SOURCE_URL}/${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
  });

  return NextResponse.json({message: `Todo Deleted`})
}
