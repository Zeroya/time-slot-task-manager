import dayjs from 'dayjs'
import type { Task } from '@/entities/task/model/types'
import type { StatusFilterMask } from '@/features/task-calendar/model/calendarFiltersSlice'
import { getComputedTaskStatus } from '@/shared/lib/taskStatusHelpers'

export function filterTasksForDayAndSettings(
  tasks: Task[],
  dayKey: string,
  now: dayjs.Dayjs,
  options: {
    searchQuery: string
    statusMask: StatusFilterMask
  },
): Task[] {
  const q = options.searchQuery.trim().toLowerCase()
  return tasks.filter((task) => {
    if (task.date !== dayKey) return false
    if (q && !task.title.toLowerCase().includes(q)) return false
    const st = getComputedTaskStatus(task, now)
    if (!options.statusMask[st]) return false
    return true
  })
}
