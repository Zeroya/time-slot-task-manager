import { Box } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const RowRoot = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '88px 1fr',
  gap: theme.spacing(2),
  alignItems: 'stretch',
  minHeight: 56,
  padding: theme.spacing(1.25, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.85)}`,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '72px 1fr',
    gap: theme.spacing(1),
  },
}))

export const TimeLabel = styled('div')(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontFeatureSettings: '"tnum"',
  paddingTop: 4,
}))

export const SlotContent = styled(Box)(() => ({
  minHeight: 40,
  display: 'flex',
  alignItems: 'center',
}))

export const EmptySlotBox = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: 48,
  borderRadius: theme.shape.borderRadius,
  border: `1px dashed ${alpha(theme.palette.text.disabled, 0.5)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  fontSize: '0.8rem',
}))

export const ContinuationBar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 6,
  borderRadius: 3,
  background: alpha(theme.palette.primary.main, 0.2),
}))
