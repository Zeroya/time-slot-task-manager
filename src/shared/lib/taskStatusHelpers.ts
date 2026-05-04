import dayjs from 'dayjs'
import type { Task } from '@/entities/task/model/types'
import { getTaskEndDateTime, getTaskStartDateTime } from '@/shared/lib/timeHelpers'

export type ComputedTaskStatus = 'pending' | 'active' | 'done'

export function getComputedTaskStatus(
  task: Task,
  now: dayjs.Dayjs,
): ComputedTaskStatus {
  const start = getTaskStartDateTime(task)
  const end = getTaskEndDateTime(task)

  if (now.isBefore(start)) return 'pending'
  if (now.isBefore(end)) return 'active'
  return 'done'
}

export function getMinutesUntilStart(task: Task, now: dayjs.Dayjs): number {
  const start = getTaskStartDateTime(task)
  const diff = start.diff(now, 'minute', true)
  return Math.max(0, Math.ceil(diff))
}

export function getTaskStatusDisplayText(
  task: Task,
  now: dayjs.Dayjs,
): string {
  const status = getComputedTaskStatus(task, now)

  switch (status) {
    case 'pending': {
      const n = getMinutesUntilStart(task, now)
      return n === 1 ? 'in 1 min' : `in ${n} min`
    }
    case 'active':
      return 'In progress'
    case 'done': {
      const start = getTaskStartDateTime(task)
      const end = getTaskEndDateTime(task)
      return `${start.format('HH:mm')}–${end.format('HH:mm')}`
    }
  }
}
