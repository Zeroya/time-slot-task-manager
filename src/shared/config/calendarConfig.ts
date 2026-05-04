/** Тривалість одного слота на календарі */
export const SLOT_DURATION_MINUTES = 30

/** Початок робочого дня — хвилини від півночі */
export const DAY_START_MINUTES = 9 * 60

/** Кінець робочого дня (останній слот починається до цього часу) */
export const DAY_END_MINUTES = 18 * 60

/** Максимум днів у горизонтальному «вікні» при довгому діапазоні (стрілки) */
export const MAX_VISIBLE_DAYS = 7

/** Максимальна довжина діапазону днів (from→to), включно */
export const MAX_RANGE_SPAN_DAYS = 31

export function getSlotStartMinutesList(): number[] {
  const slots: number[] = []
  for (
    let m = DAY_START_MINUTES;
    m < DAY_END_MINUTES;
    m += SLOT_DURATION_MINUTES
  ) {
    slots.push(m)
  }
  return slots
}
