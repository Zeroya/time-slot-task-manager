import type { Task } from '@/entities/task/model/types'

export function tasksOverlap(a: Task, b: Task): boolean {
  if (a.date !== b.date) return false
  const aEnd = a.startMinutes + a.durationMinutes
  const bEnd = b.startMinutes + b.durationMinutes
  return a.startMinutes < bEnd && b.startMinutes < aEnd
}

export function canPlaceTaskAt(
  date: string,
  startMinutes: number,
  durationMinutes: number,
  tasks: Task[],
  excludeTaskId?: string,
): boolean {
  const candidate: Task = {
    id: excludeTaskId ?? '__new__',
    title: '',
    date,
    startMinutes,
    durationMinutes,
  }
  return !tasks
    .filter((t) => t.id !== excludeTaskId)
    .some((t) => tasksOverlap(candidate, t))
}

export function getTaskAtSlotStart(
  slotStartMinutes: number,
  tasks: Task[],
): Task | undefined {
  return tasks.find((t) => t.startMinutes === slotStartMinutes)
}

export function getContinuationOfTask(
  slotStartMinutes: number,
  tasks: Task[],
): Task | undefined {
  return tasks.find(
    (t) =>
      slotStartMinutes > t.startMinutes &&
      slotStartMinutes < t.startMinutes + t.durationMinutes,
  )
}
