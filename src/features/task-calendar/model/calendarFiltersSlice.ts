import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import {
  clampRangeEnd,
  enumerateDateKeys,
  todayKey,
  type DateKey,
} from '@/shared/lib/dateRangeHelpers'
import { MAX_VISIBLE_DAYS } from '@/shared/config/calendarConfig'

export type CalendarViewMode = 'single' | 'range'

export interface StatusFilterMask {
  pending: boolean
  active: boolean
  done: boolean
}

interface CalendarFiltersState {
  viewMode: CalendarViewMode
  singleDate: DateKey
  rangeFrom: DateKey
  rangeTo: DateKey
  /** Index into enumerated range when length > MAX_VISIBLE_DAYS */
  dayWindowStart: number
  hideEmptySlots: boolean
  onlyActiveSlots: boolean
  statusMask: StatusFilterMask
  searchQuery: string
}

const t = todayKey()

const initialState: CalendarFiltersState = {
  viewMode: 'single',
  singleDate: t,
  rangeFrom: t,
  rangeTo: t,
  dayWindowStart: 0,
  hideEmptySlots: false,
  onlyActiveSlots: false,
  statusMask: { pending: true, active: true, done: true },
  searchQuery: '',
}

function rangeDaysList(state: CalendarFiltersState): DateKey[] {
  if (state.viewMode === 'single') {
    return [state.singleDate]
  }
  return enumerateDateKeys(state.rangeFrom, state.rangeTo)
}

function clampDayWindowStart(state: CalendarFiltersState): void {
  const list = rangeDaysList(state)
  const maxStart = Math.max(0, list.length - MAX_VISIBLE_DAYS)
  state.dayWindowStart = Math.min(
    Math.max(0, state.dayWindowStart),
    maxStart,
  )
}

export const calendarFiltersSlice = createSlice({
  name: 'calendarFilters',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<CalendarViewMode>) => {
      state.viewMode = action.payload
      state.dayWindowStart = 0
    },
    setSingleDate: (state, action: PayloadAction<DateKey>) => {
      state.singleDate = action.payload
      state.dayWindowStart = 0
    },
    setRangeFrom: (state, action: PayloadAction<DateKey>) => {
      state.rangeFrom = action.payload
      const capped = clampRangeEnd(state.rangeFrom, state.rangeTo)
      state.rangeTo = dayjs(capped).isBefore(state.rangeFrom)
        ? state.rangeFrom
        : capped
      state.dayWindowStart = 0
    },
    setRangeTo: (state, action: PayloadAction<DateKey>) => {
      const to = action.payload
      if (dayjs(to).isBefore(state.rangeFrom)) {
        state.rangeTo = state.rangeFrom
      } else {
        state.rangeTo = clampRangeEnd(state.rangeFrom, to)
      }
      state.dayWindowStart = 0
    },
    shiftDayWindowNext: (state) => {
      clampDayWindowStart(state)
      const list = rangeDaysList(state)
      const maxStart = Math.max(0, list.length - MAX_VISIBLE_DAYS)
      state.dayWindowStart = Math.min(maxStart, state.dayWindowStart + 1)
    },
    shiftDayWindowPrev: (state) => {
      clampDayWindowStart(state)
      state.dayWindowStart = Math.max(0, state.dayWindowStart - 1)
    },
    goToToday: (state) => {
      const today = todayKey()
      state.viewMode = 'single'
      state.singleDate = today
      state.rangeFrom = today
      state.rangeTo = today
      state.dayWindowStart = 0
    },
    setHideEmptySlots: (state, action: PayloadAction<boolean>) => {
      state.hideEmptySlots = action.payload
    },
    setOnlyActiveSlots: (state, action: PayloadAction<boolean>) => {
      state.onlyActiveSlots = action.payload
    },
    setStatusMask: (
      state,
      action: PayloadAction<Partial<StatusFilterMask>>,
    ) => {
      state.statusMask = { ...state.statusMask, ...action.payload }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const {
  setViewMode,
  setSingleDate,
  setRangeFrom,
  setRangeTo,
  shiftDayWindowNext,
  shiftDayWindowPrev,
  goToToday,
  setHideEmptySlots,
  setOnlyActiveSlots,
  setStatusMask,
  setSearchQuery,
} = calendarFiltersSlice.actions

export function selectVisibleDateKeys(
  state: CalendarFiltersState,
): DateKey[] {
  const list = rangeDaysList(state)
  if (list.length <= MAX_VISIBLE_DAYS) return list
  const maxStart = Math.max(0, list.length - MAX_VISIBLE_DAYS)
  const safeStart = Math.min(Math.max(0, state.dayWindowStart), maxStart)
  return list.slice(safeStart, safeStart + MAX_VISIBLE_DAYS)
}

export function selectDayWindowBounds(state: CalendarFiltersState): {
  safeStart: number
  maxStart: number
  totalDays: number
} {
  const list = rangeDaysList(state)
  const totalDays = list.length
  if (totalDays <= MAX_VISIBLE_DAYS) {
    return { safeStart: 0, maxStart: 0, totalDays }
  }
  const maxStart = Math.max(0, totalDays - MAX_VISIBLE_DAYS)
  const safeStart = Math.min(Math.max(0, state.dayWindowStart), maxStart)
  return { safeStart, maxStart, totalDays }
}

export function selectTotalRangeDays(
  state: CalendarFiltersState,
): number {
  return rangeDaysList(state).length
}
