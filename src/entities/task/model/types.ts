export interface Task {
  id: string
  title: string
  /** Calendar day YYYY-MM-DD */
  date: string
  /** Minutes from midnight (e.g. 540 = 09:00) */
  startMinutes: number
  /** Duration in minutes (aligned to slot, e.g. 30) */
  durationMinutes: number
}
