import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import type { Task } from '@/entities/task/model/types'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { addTask, updateTask } from '@/features/task-calendar/model/tasksSlice'
import {
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from '@/features/task-calendar/ui/TaskDialog/TaskDialog.styles'
import { getAvailableSlotStarts } from '@/features/task-calendar/lib/getAvailableSlots'
import { SLOT_DURATION_MINUTES } from '@/shared/config/calendarConfig'
import { canPlaceTaskAt } from '@/shared/lib/slotPlacementHelpers'
import { formatMinutesAsClock } from '@/shared/lib/timeHelpers'
import Dialog from '@mui/material/Dialog'

const formSchema = z.object({
  title: z.string().min(1, 'Enter a title'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startMinutes: z.number().int(),
})

type FormValues = z.infer<typeof formSchema>

interface TaskDialogProps {
  open: boolean
  onClose: () => void
  editingTask: Task | null
  /** Для нової задачі — день за замовучуванням */
  defaultDateKey: string
}

export function TaskDialog({
  open,
  onClose,
  editingTask,
  defaultDateKey,
}: TaskDialogProps) {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((s) => s.tasks.items)

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      title: '',
      date: defaultDateKey,
      startMinutes: 540,
    },
  })

  const watchedDate = useWatch({ control, name: 'date' })

  const slotOptions = useMemo(() => {
    const dk = watchedDate ?? defaultDateKey
    return getAvailableSlotStarts(tasks, dk, {
      excludeTaskId: editingTask?.id,
      preferMinutes: editingTask?.startMinutes,
    })
  }, [
    tasks,
    watchedDate,
    defaultDateKey,
    editingTask?.id,
    editingTask?.startMinutes,
  ])

  const defaultStart =
    slotOptions[0] ?? editingTask?.startMinutes ?? 540

  useEffect(() => {
    if (!open) return
    reset({
      title: editingTask?.title ?? '',
      date: editingTask?.date ?? defaultDateKey,
      startMinutes: editingTask?.startMinutes ?? defaultStart,
    })
  }, [open, editingTask, reset, defaultDateKey, defaultStart])

  const submit = (values: FormValues) => {
    const ok = canPlaceTaskAt(
      values.date,
      values.startMinutes,
      SLOT_DURATION_MINUTES,
      tasks,
      editingTask?.id,
    )
    if (!ok) {
      setError('startMinutes', {
        type: 'manual',
        message: 'This time overlaps another task on that day',
      })
      return
    }

    if (editingTask) {
      dispatch(
        updateTask({
          id: editingTask.id,
          title: values.title,
          date: values.date,
          startMinutes: values.startMinutes,
        }),
      )
    } else {
      dispatch(
        addTask({
          title: values.title,
          date: values.date,
          startMinutes: values.startMinutes,
        }),
      )
    }
    onClose()
  }

  const titleText = editingTask ? 'Edit task' : 'New task'

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(submit)} noValidate>
        <StyledDialogTitle>{titleText}</StyledDialogTitle>
        <StyledDialogContent>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                autoFocus
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Day"
                value={dayjs(field.value)}
                onChange={(v) => {
                  field.onChange(v ? v.format('YYYY-MM-DD') : field.value)
                }}
                slots={{ openPickerIcon: CalendarMonthIcon }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(errors.date),
                    helperText: errors.date?.message,
                  },
                }}
              />
            )}
          />
          <Controller
            name="startMinutes"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.startMinutes)}>
                <InputLabel id="slot-select-label">Start time</InputLabel>
                <Select
                  labelId="slot-select-label"
                  label="Start time"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value))
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  inputRef={field.ref}
                  disabled={slotOptions.length === 0}
                >
                  {slotOptions.map((m) => (
                    <MenuItem key={m} value={m}>
                      {formatMinutesAsClock(m)} ({SLOT_DURATION_MINUTES} min)
                    </MenuItem>
                  ))}
                </Select>
                {slotOptions.length === 0 ? (
                  <FormHelperText>
                    All slots are busy on this day — pick another date or edit
                    another task.
                  </FormHelperText>
                ) : null}
                {errors.startMinutes ? (
                  <FormHelperText>{errors.startMinutes.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </StyledDialogContent>
        <StyledDialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={slotOptions.length === 0}
          >
            Save
          </Button>
        </StyledDialogActions>
      </form>
    </Dialog>
  )
}
