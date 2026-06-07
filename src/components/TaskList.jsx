import { useTasks } from '../context/TaskContext.jsx'
import TaskItem from './TaskItem.jsx'

/**
 * TaskList — renders all tasks from the global state, mapping each into a
 * TaskItem. Shows an empty state when there are no tasks.
 */
export default function TaskList() {
  const { tasks } = useTasks()

  if (tasks.length === 0) {
    return (
      <p className="task-list__empty">
        No tasks yet. Add your first task above to get started! 🚀
      </p>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
