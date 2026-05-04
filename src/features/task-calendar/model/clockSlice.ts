import { createSlice } from '@reduxjs/toolkit'

interface ClockState {
  /** Поточний час (ms) — оновлюється щохвилини */
  nowMs: number
}

const initialState: ClockState = {
  nowMs: Date.now(),
}

export const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    tick: (state) => {
      state.nowMs = Date.now()
    },
  },
})

export const { tick } = clockSlice.actions
