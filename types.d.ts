type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

type Users = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      city: string,
      zipcode: number,
    },
    phone:string | number, 
}