import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import type { Task } from '@/entities/task/model/types'
import { SLOT_DURATION_MINUTES } from '@/shared/config/calendarConfig'

interface TasksState {
  items: Task[]
}

const initialState: TasksState = {
  items: [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string
        date: string
        startMinutes: number
      }>,
    ) => {
      state.items.push({
        id: nanoid(),
        title: action.payload.title.trim(),
        date: action.payload.date,
        startMinutes: action.payload.startMinutes,
        durationMinutes: SLOT_DURATION_MINUTES,
      })
    },
    updateTask: (
      state,
      action: PayloadAction<{
        id: string
        title: string
        date: string
        startMinutes: number
      }>,
    ) => {
      const task = state.items.find((t) => t.id === action.payload.id)
      if (task) {
        task.title = action.payload.title.trim()
        task.date = action.payload.date
        task.startMinutes = action.payload.startMinutes
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTask, updateTask, removeTask } = tasksSlice.actions
