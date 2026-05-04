import AddIcon from '@mui/icons-material/Add'
import dayjs from 'dayjs'
import { Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import type { Task } from '@/entities/task/model/types'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { removeTask } from '@/features/task-calendar/model/tasksSlice'
import {
  selectVisibleDateKeys,
} from '@/features/task-calendar/model/calendarFiltersSlice'
import { useClockTicker } from '@/features/task-calendar/model/useClockTicker'
import { filterTasksForDayAndSettings } from '@/features/task-calendar/lib/filterTasksForCalendar'
import { getVisibleSlotStarts } from '@/features/task-calendar/lib/getVisibleSlots'
import { CalendarFiltersBar } from '@/features/task-calendar/ui/CalendarFiltersBar/CalendarFiltersBar'
import { TaskDialog } from '@/features/task-calendar/ui/TaskDialog/TaskDialog'
import {
  AddButton,
  PageContainer,
  PageHeader,
  PageRoot,
  PageSubtitle,
  PageTitle,
  TitleBlock,
} from '@/features/task-calendar/ui/TaskCalendarPage/TaskCalendarPage.styles'
import { TimeSlotsGrid } from '@/features/task-calendar/ui/TimeSlotsGrid/TimeSlotsGrid'
import { getSlotStartMinutesList } from '@/shared/config/calendarConfig'
import { todayKey } from '@/shared/lib/dateRangeHelpers'

export function TaskCalendarPage() {
  useClockTicker()
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((s) => s.tasks.items)
  const nowMs = useAppSelector((s) => s.clock.nowMs)
  const calendarFilters = useAppSelector((s) => s.calendarFilters)

  const visibleDateKeys = useAppSelector((s) =>
    selectVisibleDateKeys(s.calendarFilters),
  )

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const slotStartsTemplate = useMemo(() => getSlotStartMinutesList(), [])
  const now = useMemo(() => dayjs(nowMs), [nowMs])

  const defaultDateForNewTask = visibleDateKeys[0] ?? todayKey()

  const subtitleText = useMemo(() => {
    if (calendarFilters.viewMode === 'single') {
      return dayjs(calendarFilters.singleDate).format('dddd, MMMM D, YYYY')
    }
    const n = visibleDateKeys.length
    if (n <= 1) {
      return dayjs(calendarFilters.rangeFrom).format('dddd, MMMM D, YYYY')
    }
    return `${n} days in view · refine with filters above`
  }, [calendarFilters, visibleDateKeys])

  const openCreate = () => {
    setEditingTask(null)
    setDialogOpen(true)
  }

  const openEdit = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setEditingTask(null)
  }

  return (
    <PageRoot>
      <PageContainer maxWidth="md">
        <PageHeader>
          <TitleBlock>
            <PageTitle>Time-slot planner</PageTitle>
            <PageSubtitle>{subtitleText}</PageSubtitle>
          </TitleBlock>
          <AddButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Add task
          </AddButton>
        </PageHeader>

        <CalendarFiltersBar />

        <Stack spacing={3}>
          {visibleDateKeys.map((dayKey) => {
            const dayTasks = filterTasksForDayAndSettings(
              tasks,
              dayKey,
              now,
              {
                searchQuery: calendarFilters.searchQuery,
                statusMask: calendarFilters.statusMask,
              },
            )

            const visibleSlots = getVisibleSlotStarts(
              slotStartsTemplate,
              dayTasks,
              now,
              calendarFilters.hideEmptySlots,
              calendarFilters.onlyActiveSlots,
            )

            const dayTitle = dayjs(dayKey).format('dddd · MMMM D, YYYY')

            return (
              <TimeSlotsGrid
                key={dayKey}
                slotStartsTemplate={slotStartsTemplate}
                visibleSlotStarts={visibleSlots}
                tasks={dayTasks}
                dayTitle={dayTitle}
                onEditTask={openEdit}
                onDeleteTask={(id) => dispatch(removeTask(id))}
              />
            )
          })}
        </Stack>
      </PageContainer>

      <TaskDialog
        open={dialogOpen}
        onClose={closeDialog}
        editingTask={editingTask}
        defaultDateKey={defaultDateForNewTask}
      />
    </PageRoot>
  )
}
