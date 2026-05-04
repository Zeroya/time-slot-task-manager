import dayjs from 'dayjs'
import type { Task } from '@/entities/task/model/types'
import {
  getContinuationOfTask,
  getTaskAtSlotStart,
} from '@/shared/lib/slotPlacementHelpers'
import { getComputedTaskStatus } from '@/shared/lib/taskStatusHelpers'

/** Які слоти показувати з урахуванням hideEmpty / onlyActive */
export function getVisibleSlotStarts(
  allSlotStarts: number[],
  tasks: Task[],
  now: dayjs.Dayjs,
  hideEmptySlots: boolean,
  onlyActiveSlots: boolean,
): number[] {
  return allSlotStarts.filter((slotMin) => {
    const startedHere = getTaskAtSlotStart(slotMin, tasks)
    const continuation = getContinuationOfTask(slotMin, tasks)
    const hasVisual =
      Boolean(startedHere) ||
      Boolean(continuation)

    const activeHere = tasks.some((t) => {
      const covers =
        slotMin >= t.startMinutes &&
        slotMin < t.startMinutes + t.durationMinutes
      return covers && getComputedTaskStatus(t, now) === 'active'
    })

    if (onlyActiveSlots && !activeHere) return false
    if (hideEmptySlots && !hasVisual) return false
    return true
  })
}
