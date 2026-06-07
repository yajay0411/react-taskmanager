# Task Manager — React Context API + useReducer

A medium-sized Task Manager app built to practice **global state management**
with React's **Context API** and the **`useReducer`** hook. All task state lives
in one global store; components dispatch actions instead of drilling props.

## 🔗 Links

- **GitHub repo:** _<paste your public repo URL — e.g. https://github.com/yourusername/react-essentials-assignment>_
- **Live demo:** _<paste Netlify / Vercel / Render URL — e.g. https://react-taskmanager.netlify.app>_

> Submission note: the assignment asks for a public repo named
> **`react-essentials-assignment`**. Push this project there (or as a subfolder)
> and add the links above.

## ✨ Features

- ➕ **Add** tasks
- ✅ **Toggle** complete / incomplete (completed tasks are greyed out + struck through)
- ✏️ **Edit** a task name inline (double-click the text, or use the Edit button; Enter saves, Esc cancels)
- 🗑️ **Delete** a single task
- 🧹 **Clear all** tasks
- 📊 **Summary** of total / completed / remaining counts (derived from global state)
- 💾 **Persists** to `localStorage` so tasks survive a refresh
- 📱 **Responsive** layout with hover effects and entry animations

## 🧠 Architecture (how the requirements map to code)

| Requirement | Where |
|-------------|-------|
| Global Context + Provider + initial state | `src/context/TaskContext.jsx` |
| Reducer logic, action types, switch cases | `src/reducer/taskReducer.js` |
| `useReducer` wiring + action creators | `src/context/TaskContext.jsx` |
| `useTasks()` custom hook (no prop-drilling) | `src/context/TaskContext.jsx` |
| TaskInput (dispatch `ADD_TASK`) | `src/components/TaskInput.jsx` |
| TaskList (render from global state) | `src/components/TaskList.jsx` |
| TaskItem (toggle / edit / delete) | `src/components/TaskItem.jsx` |
| TaskSummary (totals + clear all) | `src/components/TaskSummary.jsx` |
| Layout + advanced styling | `src/index.css` |

### State flow

```
User action ──► component calls an action creator (e.g. addTask)
            ──► dispatch({ type, payload })
            ──► taskReducer(state, action) returns NEW state   (pure)
            ──► Context value updates
            ──► every consumer of useTasks() re-renders with fresh data
```

### Actions

`ADD_TASK` · `TOGGLE_TASK` · `EDIT_TASK` · `DELETE_TASK` · `CLEAR_TASKS`
(defined as constants in `ACTIONS` so typos fail loudly).

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## 🗂️ Project Structure

```
react-taskmanager/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # wraps <App/> in <TaskProvider/>
    ├── App.jsx                  # composes the UI (no prop-drilling)
    ├── index.css                # all styling (layout + advanced)
    ├── context/
    │   └── TaskContext.jsx      # context, provider, useReducer, useTasks()
    ├── reducer/
    │   └── taskReducer.js       # ACTIONS, initialState, reducer
    └── components/
        ├── TaskInput.jsx
        ├── TaskList.jsx
        ├── TaskItem.jsx
        └── TaskSummary.jsx
```

## 📸 Screenshots

> Add screenshots of the final UI here before submitting, e.g.:
>
> `![Task Manager](./screenshots/app.png)`

## 🌐 Deploy

- **Vercel / Netlify:** import the repo, framework preset **Vite**, build
  command `npm run build`, output dir `dist`.
- **Render:** Static Site, build `npm run build`, publish `dist`.
