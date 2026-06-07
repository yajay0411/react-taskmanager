// ---------------------------------------------------------------------------
// Section 2 — useReducer: action types + reducer logic
// ---------------------------------------------------------------------------

// Action types kept as constants so a typo throws instead of silently failing.
export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  DELETE_TASK: 'DELETE_TASK',
  CLEAR_TASKS: 'CLEAR_TASKS',
}

// The initial global state. `tasks` is an array of { id, text, completed }.
export const initialState = {
  tasks: [],
}

// A tiny helper so the reducer stays free of side effects / non-determinism.
const createTask = (text) => ({
  id: crypto.randomUUID(),
  text: text.trim(),
  completed: false,
})

/**
 * The single reducer that owns ALL task state transitions.
 * Given the current state and an action, it returns the next state.
 * It is pure: no mutation, no side effects — always returns a new object.
 */
export function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK: {
      const text = action.payload?.trim()
      if (!text) return state // ignore empty tasks
      return { ...state, tasks: [createTask(text), ...state.tasks] }
    }

    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }

    case ACTIONS.EDIT_TASK: {
      const { id, text } = action.payload
      const trimmed = text.trim()
      if (!trimmed) return state // don't allow editing to an empty name
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, text: trimmed } : task
        ),
      }
    }

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }

    case ACTIONS.CLEAR_TASKS:
      return { ...state, tasks: [] }

    default:
      return state
  }
}
