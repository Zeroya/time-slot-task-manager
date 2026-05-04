import type { ReactNode } from 'react'
import {
  ContinuationBar,
  EmptySlotBox,
  RowRoot,
  SlotContent,
  TimeLabel,
} from '@/features/task-calendar/ui/TimeSlotRow/TimeSlotRow.styles'

interface TimeSlotRowProps {
  slotLabel: string
  children: ReactNode
}

export function TimeSlotRow({ slotLabel, children }: TimeSlotRowProps) {
  return (
    <RowRoot>
      <TimeLabel>{slotLabel}</TimeLabel>
      <SlotContent>{children}</SlotContent>
    </RowRoot>
  )
}

interface EmptySlotPlaceholderProps {
  label?: string
}

export function EmptySlotPlaceholder({
  label = 'Free slot',
}: EmptySlotPlaceholderProps) {
  return <EmptySlotBox>{label}</EmptySlotBox>
}

export function SlotContinuationStrip() {
  return <ContinuationBar />
}
