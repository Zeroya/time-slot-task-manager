import dayjs from 'dayjs'
import { MAX_RANGE_SPAN_DAYS } from '@/shared/config/calendarConfig'

export type DateKey = string

/** Inclusive list of YYYY-MM-DD from fromKey to toKey */
export function enumerateDateKeys(
  fromKey: DateKey,
  toKey: DateKey,
): DateKey[] {
  const from = dayjs(fromKey)
  const to = dayjs(toKey)
  if (from.isAfter(to)) return []
  const out: DateKey[] = []
  for (
    let d = from;
    d.isBefore(to) || d.isSame(to, 'day');
    d = d.add(1, 'day')
  ) {
    out.push(d.format('YYYY-MM-DD'))
  }
  return out
}

export function clampRangeEnd(
  fromKey: DateKey,
  toKey: DateKey,
  maxSpan: number = MAX_RANGE_SPAN_DAYS,
): DateKey {
  const from = dayjs(fromKey)
  const to = dayjs(toKey)
  const lastAllowed = from.add(maxSpan - 1, 'day')
  if (to.isAfter(lastAllowed)) {
    return lastAllowed.format('YYYY-MM-DD')
  }
  return toKey
}

export function todayKey(): DateKey {
  return dayjs().format('YYYY-MM-DD')
}
