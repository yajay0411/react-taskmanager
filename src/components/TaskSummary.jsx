import { useTasks } from '../context/TaskContext.jsx'

/**
 * TaskSummary — derives total / completed / remaining counts from the global
 * state and offers a "Clear all" action (CLEAR_TASKS).
 */
export default function TaskSummary() {
  const { tasks, clearTasks } = useTasks()

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const remaining = total - completed

  return (
    <div className="task-summary">
      <div className="task-summary__stats">
        <span className="stat">
          <strong>{total}</strong> total
        </span>
        <span className="stat stat--done">
          <strong>{completed}</strong> completed
        </span>
        <span className="stat stat--todo">
          <strong>{remaining}</strong> remaining
        </span>
      </div>

      <button
        className="btn btn--small btn--ghost"
        onClick={clearTasks}
        disabled={total === 0}
      >
        Clear all
      </button>
    </div>
  )
}
