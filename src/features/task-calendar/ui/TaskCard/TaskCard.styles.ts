import { Box, IconButton, Paper } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const TaskCardRoot = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1.5, 2),
  paddingRight: theme.spacing(7),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
}))

export const TaskTitle = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle2,
  fontWeight: 600,
  fontSize: '0.95rem',
  lineHeight: 1.3,
}))

export const TaskActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
  display: 'flex',
  gap: 0,
}))

export const TaskCardWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
}))

export const StatusChip = styled(Box, {
  shouldForwardProp: (p) => p !== 'statusKey',
})<{ statusKey: 'pending' | 'active' | 'done' }>(({ theme, statusKey }) => {
  const colors = {
    pending: {
      bg: alpha(theme.palette.info.main, 0.12),
      fg: theme.palette.info.dark,
    },
    active: {
      bg: alpha(theme.palette.success.main, 0.15),
      fg: theme.palette.success.dark,
    },
    done: {
      bg: alpha(theme.palette.text.disabled, 0.12),
      fg: theme.palette.text.secondary,
    },
  }[statusKey]
  return {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: '2px 8px',
    borderRadius: 6,
    fontSize: '0.75rem',
    fontWeight: 500,
    backgroundColor: colors.bg,
    color: colors.fg,
    marginTop: 4,
  }
})

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
  color: theme.palette.text.secondary,
}))
