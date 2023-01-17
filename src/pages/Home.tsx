import { createResource, For, onMount } from "solid-js"
import AddTodo from "../components/AddTodo/AddTodo"
import TodoCard from "../components/TodoCard/TodoCard"
import { useTodos } from "../context/TodoContext"
import { deleteItem, saveItem } from "../util/storage"

export default function Home() {
  // Work with context and async functions of non-primitive reactive cache:
  //
  // Have to import a reference to the current state (todosRef)
  // Pass that ref to the createResource key (1st arg)
  // So everytime it changes, it re-fetches the todos from the async function
  const { todos: todosRef, getTodos, setFromStorage } = useTodos()
  const [todos] = createResource(todosRef, getTodos)

  const onPersistClicked = () => {
    saveItem('todos', JSON.stringify(todos()))
  }

  onMount(() => {
    setFromStorage()
  })

  return <>
    <h1>Todos list</h1>
    <p>Here you can see the todos you have created</p>
    <AddTodo />
    <button onClick={() => onPersistClicked()}>Persist current Todos</button>
    {todos.loading && <span>Loading...</span>}
    <div style={{ display: 'flex', "flex-wrap": 'wrap' }}>
      <For each={todos()}>{
        (todo) =>
          <TodoCard todo={todo} />
      }</For>
    </div>
  </>
}
