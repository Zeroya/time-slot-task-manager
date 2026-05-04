import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import dayjs from 'dayjs'
import type { Task } from '@/entities/task/model/types'
import { useAppSelector } from '@/app/store/hooks'
import {
  getComputedTaskStatus,
  getTaskStatusDisplayText,
} from '@/shared/lib/taskStatusHelpers'
import {
  StatusChip,
  StyledIconButton,
  TaskActions,
  TaskCardRoot,
  TaskCardWrapper,
  TaskTitle,
} from '@/features/task-calendar/ui/TaskCard/TaskCard.styles'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const nowMs = useAppSelector((s) => s.clock.nowMs)
  const now = dayjs(nowMs)
  const status = getComputedTaskStatus(task, now)
  const statusText = getTaskStatusDisplayText(task, now)

  return (
    <TaskCardWrapper>
      <TaskCardRoot elevation={0} variant="outlined">
        <TaskActions>
          <StyledIconButton
            aria-label="Edit task"
            size="small"
            onClick={() => onEdit(task)}
          >
            <EditOutlinedIcon fontSize="small" />
          </StyledIconButton>
          <StyledIconButton
            aria-label="Delete task"
            size="small"
            onClick={() => onDelete(task.id)}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </StyledIconButton>
        </TaskActions>
        <TaskTitle>{task.title}</TaskTitle>
        <StatusChip statusKey={status}>{statusText}</StatusChip>
      </TaskCardRoot>
    </TaskCardWrapper>
  )
}
