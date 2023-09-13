import { createSlice } from "@reduxjs/toolkit";

const storedTodos = localStorage.getItem("tasks");
const tasksInitialState = storedTodos ? JSON.parse(storedTodos) : [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },
    deleteTask(state, action) {
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    },
    updateTask(state, action) {
      for (const task of state) {
        if (task.id === action.payload.id) {
          task.title = action.payload.title;
          break;
        }
      }
    },
    toggleStatus(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.status = !task.status;
          break;
        }
      }
    },
  },
});

// Експортуємо генератори екшенів та редюсер
export const { addTask, deleteTask, updateTask, toggleStatus } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
