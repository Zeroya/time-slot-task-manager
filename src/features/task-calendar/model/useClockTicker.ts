import { useEffect } from 'react'
import { useAppDispatch } from '@/app/store/hooks'
import { tick } from '@/features/task-calendar/model/clockSlice'

/** Оновлює `clock` у Redux щохвилини (і одразу при монтуванні) */
export function useClockTicker() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tick())
    const id = window.setInterval(() => {
      dispatch(tick())
    }, 60_000)
    return () => clearInterval(id)
  }, [dispatch])
}
