import { configureStore } from '@reduxjs/toolkit'
import { calendarFiltersSlice } from '@/features/task-calendar/model/calendarFiltersSlice'
import { clockSlice } from '@/features/task-calendar/model/clockSlice'
import { tasksSlice } from '@/features/task-calendar/model/tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    clock: clockSlice.reducer,
    calendarFilters: calendarFiltersSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
