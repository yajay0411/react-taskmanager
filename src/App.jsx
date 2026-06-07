import TaskInput from './components/TaskInput.jsx'
import TaskList from './components/TaskList.jsx'
import TaskSummary from './components/TaskSummary.jsx'

/**
 * App — composes the UI. Note there is NO prop-drilling: every component
 * reaches the global task state directly through the useTasks() context hook.
 */
export default function App() {
  return (
    <div className="app">
      <main className="card">
        <header className="card__header">
          <h1 className="card__title">📋 Task Manager</h1>
          <p className="card__subtitle">
            Global state with React Context API &amp; useReducer
          </p>
        </header>

        <TaskInput />
        <TaskSummary />
        <TaskList />
      </main>

      <footer className="app__footer">
        Built with React · Context API · useReducer
      </footer>
    </div>
  )
}
