import { useState } from 'react'
import { useTasks } from '../context/TaskContext.jsx'

/**
 * TaskItem — a single task row supporting:
 *   - marking complete/incomplete (TOGGLE_TASK)
 *   - editing the task name        (EDIT_TASK)
 *   - deleting the task            (DELETE_TASK)
 */
export default function TaskItem({ task }) {
  const { toggleTask, editTask, deleteTask } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const saveEdit = () => {
    if (draft.trim()) {
      editTask(task.id, draft)
      setIsEditing(false)
    }
  }

  const cancelEdit = () => {
    setDraft(task.text)
    setIsEditing(false)
  }

  return (
    <li className={`task-item ${task.completed ? 'task-item--done' : ''}`}>
      <input
        className="task-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      {isEditing ? (
        <input
          className="task-item__edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit()
            if (e.key === 'Escape') cancelEdit()
          }}
          autoFocus
        />
      ) : (
        <span className="task-item__text" onDoubleClick={() => setIsEditing(true)}>
          {task.text}
        </span>
      )}

      <div className="task-item__actions">
        {isEditing ? (
          <>
            <button className="btn btn--small btn--save" onClick={saveEdit}>Save</button>
            <button className="btn btn--small btn--ghost" onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn--small btn--ghost" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn btn--small btn--danger" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}
