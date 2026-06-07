import { useState } from 'react'
import { useTasks } from '../context/TaskContext.jsx'

/**
 * TaskInput — input field + "Add Task" button.
 * Dispatches ADD_TASK (via the addTask action creator) to the reducer.
 */
export default function TaskInput() {
  const { addTask } = useTasks()
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addTask(text)
    setText('') // reset the field after adding
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        className="task-input__field"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New task"
      />
      <button className="btn btn--primary" type="submit" disabled={!text.trim()}>
        + Add Task
      </button>
    </form>
  )
}
