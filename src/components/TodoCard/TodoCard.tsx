import { useNavigate } from "@solidjs/router"
import { useTodos } from "../../context/TodoContext"
import Todo from "../../types/Todo"
import styles from './TodoCard.module.css'

export interface TodoCardProps {
  todo: Todo
}
export default function TodoCard(props: TodoCardProps) {
  const { removeTodo } = useTodos()
  const navigate = useNavigate()
  console.log('todo', props.todo)
  return (
    <div class={styles.container}>
      <div class={styles.titleContainer}>
        <h2>{props.todo.title}</h2>
        <div class={styles.actionsContainer}>
          <button class={styles.removeTodoButton} onClick={() => removeTodo(props.todo.id ?? '')}>🗑</button>
          <button class={styles.gotoDetailButton} onClick={() => navigate(`/todo/${props.todo.id}`)}>🔗</button>
        </div>
      </div>

      <p><strong>Description: </strong>{props.todo.description}</p>
      <p><strong>Created at: </strong>{props.todo.createdAt}</p>
    </div>
  )
}