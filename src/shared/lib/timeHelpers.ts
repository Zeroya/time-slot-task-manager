import dayjs from 'dayjs'
import type { Task } from '@/entities/task/model/types'

/** Convert minutes from midnight to HH:mm */
export function formatMinutesAsClock(minutesFromMidnight: number): string {
  const h = Math.floor(minutesFromMidnight / 60)
  const m = minutesFromMidnight % 60
  return dayjs().hour(h).minute(m).second(0).format('HH:mm')
}

export function getTaskStartDateTime(task: Task): dayjs.Dayjs {
  return dayjs(task.date).startOf('day').add(task.startMinutes, 'minute')
}

export function getTaskEndDateTime(task: Task): dayjs.Dayjs {
  return getTaskStartDateTime(task).add(task.durationMinutes, 'minute')
}
