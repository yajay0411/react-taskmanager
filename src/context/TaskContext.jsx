import { createContext, useContext, useEffect, useReducer } from 'react'
import { taskReducer, initialState, ACTIONS } from '../reducer/taskReducer.js'

// ---------------------------------------------------------------------------
// Section 1 — Context API: global context + provider + initial state
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'react-taskmanager.tasks'

// The context object. Components consume it through the useTasks() hook below.
const TaskContext = createContext(null)

// Lazy initializer: hydrate from localStorage on first load (nice-to-have so
// tasks survive a refresh). Falls back to the empty initial state.
function init(defaultState) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { tasks: JSON.parse(saved) } : defaultState
  } catch {
    return defaultState
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState, init)

  // Persist tasks whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks))
  }, [state.tasks])

  // Action creators: small helpers so components don't hand-build action
  // objects. This keeps dispatch usage consistent and typo-free.
  const addTask = (text) => dispatch({ type: ACTIONS.ADD_TASK, payload: text })
  const toggleTask = (id) => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id })
  const editTask = (id, text) =>
    dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, text } })
  const deleteTask = (id) => dispatch({ type: ACTIONS.DELETE_TASK, payload: id })
  const clearTasks = () => dispatch({ type: ACTIONS.CLEAR_TASKS })

  const value = {
    tasks: state.tasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    clearTasks,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

/**
 * Custom hook to consume the task context. Throwing when used outside the
 * provider catches integration mistakes early and removes prop-drilling —
 * any component can call useTasks() to reach the global state.
 */
export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) {
    throw new Error('useTasks must be used within a <TaskProvider>')
  }
  return ctx
}
