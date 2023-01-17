import { useParams } from "@solidjs/router"
import { createSignal, onMount } from "solid-js"
import { useTodos } from "../context/TodoContext"
import Todo from "../types/Todo"

export default function TodoDetail() {
  const params = useParams()
  const { getTodo } = useTodos()
  const [todo, setTodo] = createSignal({} as Todo)

  onMount(async () => {
    try {
      const todoDetail = await getTodo(params.id)
      if (todoDetail) setTodo(todoDetail)
    } catch (ex) {
      console.log('Error fetching todo with id', params.id, '. Cannot render it')
    }
  })
  return <>
    <h1>Todo detail</h1>
    <p>Todo id: {params.id}</p>
    <p>todo: {JSON.stringify(todo())}</p>
  </>
}
