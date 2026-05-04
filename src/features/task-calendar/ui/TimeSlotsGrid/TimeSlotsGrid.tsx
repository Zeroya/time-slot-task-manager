import Alert from '@mui/material/Alert'
import type { Task } from '@/entities/task/model/types'
import { TaskCard } from '@/features/task-calendar/ui/TaskCard/TaskCard'
import {
  EmptySlotPlaceholder,
  SlotContinuationStrip,
  TimeSlotRow,
} from '@/features/task-calendar/ui/TimeSlotRow/TimeSlotRow'
import {
  GridFrame,
  GridHeader,
  GridRoot,
} from '@/features/task-calendar/ui/TimeSlotsGrid/TimeSlotsGrid.styles'
import { formatMinutesAsClock } from '@/shared/lib/timeHelpers'
import {
  getContinuationOfTask,
  getTaskAtSlotStart,
} from '@/shared/lib/slotPlacementHelpers'

interface TimeSlotsGridProps {
  /** Усі можливі початки слотів (конфігурація дня) */
  slotStartsTemplate: number[]
  /** Після фільтрів — які слоти показувати */
  visibleSlotStarts: number[]
  tasks: Task[]
  dayTitle: string
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

export function TimeSlotsGrid({
  slotStartsTemplate,
  visibleSlotStarts,
  tasks,
  dayTitle,
  onEditTask,
  onDeleteTask,
}: TimeSlotsGridProps) {
  const visibleSet = new Set(visibleSlotStarts)

  if (visibleSlotStarts.length === 0) {
    return (
      <GridRoot elevation={0} variant="outlined">
        <GridHeader>{dayTitle}</GridHeader>
        <Alert severity="info" sx={{ mt: 1 }}>
          No time slots match the current filters for this day.
        </Alert>
      </GridRoot>
    )
  }

  return (
    <GridRoot elevation={0} variant="outlined">
      <GridHeader>{dayTitle}</GridHeader>
      <GridFrame>
        {slotStartsTemplate.map((slotMin) => {
          if (!visibleSet.has(slotMin)) return null

          const timeLabel = formatMinutesAsClock(slotMin)
          const continuation = getContinuationOfTask(slotMin, tasks)
          if (continuation) {
            return (
              <TimeSlotRow key={slotMin} slotLabel={timeLabel}>
                <SlotContinuationStrip />
              </TimeSlotRow>
            )
          }

          const startedHere = getTaskAtSlotStart(slotMin, tasks)
          if (startedHere) {
            return (
              <TimeSlotRow key={slotMin} slotLabel={timeLabel}>
                <TaskCard
                  task={startedHere}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              </TimeSlotRow>
            )
          }

          return (
            <TimeSlotRow key={slotMin} slotLabel={timeLabel}>
              <EmptySlotPlaceholder />
            </TimeSlotRow>
          )
        })}
      </GridFrame>
    </GridRoot>
  )
}
