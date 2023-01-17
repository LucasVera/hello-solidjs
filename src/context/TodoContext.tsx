import { createContext, createSignal, JSXElement, ParentComponent, useContext } from "solid-js"
import { createStore } from "solid-js/store"
import Todo from "../types/Todo"
import { generateId } from "../util/rand"
import sleep from "../util/sleep"
import { getItem } from "../util/storage"

interface TodoContextValue {
  todos: Todo[],
  setFromStorage: () => Promise<void>,
  getTodo: (id: string) => Promise<Todo | undefined>,
  getTodos: () => Promise<Todo[]>,
  addTodo: (todo: Todo) => Promise<Todo>,
  removeTodo: (id: string) => Promise<void>,
}

const defaultContextValue: TodoContextValue = {
  todos: [],
  setFromStorage: async () => undefined,
  getTodo: async () => undefined,
  getTodos: async () => [],
  addTodo: async (todo) => todo,
  removeTodo: async (id) => undefined,
}

export const TodoContext = createContext<TodoContextValue>(defaultContextValue)

interface TodoProviderProps {
  children?: JSXElement,
}
export const TodoProvider: ParentComponent<TodoProviderProps> = (props: TodoProviderProps) => {
  // createStore is used for object-like, where createSignal is used for primitives
  const [state, setState] = createStore([] as Todo[])

  const actions: TodoContextValue = {
    todos: state,
    async setFromStorage(): Promise<void> {
      await sleep(10)
      const todosJson = getItem('todos')
      if (!todosJson) return
      const persistedTodos: Todo[] = JSON.parse(todosJson)
      setState(persistedTodos)
    },
    async getTodo(id: string): Promise<Todo | undefined> {
      await sleep(10)
      return state.find(todo => todo.id === id)
    },
    async getTodos(): Promise<Todo[]> {
      await sleep(10)
      console.log('returning todos', state)
      return state
    },
    async addTodo(todo: Todo): Promise<Todo> {
      await sleep(10)
      const newTodo = { ...todo, id: generateId(), createdAt: new Date().toISOString() }
      setState([...state, newTodo])
      return newTodo
    },
    async removeTodo(id: string): Promise<void> {
      await sleep(10)
      setState([...state.filter(todo => todo.id !== id)])
    },
  }

  return (
    <TodoContext.Provider value={{ ...actions }}>
      {props.children}
    </TodoContext.Provider>
  )
}

export function useTodos() { return useContext(TodoContext) }

