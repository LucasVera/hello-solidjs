import { createSignal } from "solid-js"
import { useTodos } from "../../context/TodoContext"
import styles from './AddTodo.module.css'

export default function AddTodo() {
  const [title, setTitle] = createSignal('')
  const [description, setDescription] = createSignal('')
  const { addTodo } = useTodos()

  const onSave = async () => {
    try {
      await addTodo({
        title: title(),
        description: description(),
      })
      setTitle('')
      setDescription('')
    } catch (ex) {
      console.log('error saving todo', ex)
    }
  }

  return (
    <div class={styles.container}>
      <input class={styles.formControl} placeholder="Title" value={title()} onInput={(e) => setTitle(e.currentTarget.value)} />
      <textarea class={styles.formControl} placeholder="Description" value={description()} onInput={(e) => setDescription(e.currentTarget.value)} />
      <button disabled={!title() || !description()} class={styles.formControl} onClick={() => onSave()}>Save</button>
    </div>
  )
}
