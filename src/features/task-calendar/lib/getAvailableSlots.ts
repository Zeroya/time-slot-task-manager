import {
  getSlotStartMinutesList,
  SLOT_DURATION_MINUTES,
} from '@/shared/config/calendarConfig'
import { canPlaceTaskAt } from '@/shared/lib/slotPlacementHelpers'
import type { Task } from '@/entities/task/model/types'

export function getAvailableSlotStarts(
  tasks: Task[],
  date: string,
  options?: { excludeTaskId?: string; preferMinutes?: number },
): number[] {
  const dayTasks = tasks.filter((t) => t.date === date)
  const list = getSlotStartMinutesList()
  const { excludeTaskId, preferMinutes } = options ?? {}
  return list.filter(
    (m) =>
      m === preferMinutes ||
      canPlaceTaskAt(
        date,
        m,
        SLOT_DURATION_MINUTES,
        dayTasks,
        excludeTaskId,
      ),
  )
}
