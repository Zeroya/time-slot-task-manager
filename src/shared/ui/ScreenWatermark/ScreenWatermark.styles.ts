import { Box, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const WatermarkRoot = styled(Box)(() => ({
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  pointerEvents: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5em',
  padding: 16,
  overflow: 'hidden',
}))

export const WatermarkLine = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 0.95,
  textAlign: 'center',
  letterSpacing: '-0.04em',
  userSelect: 'none',
  fontSize: 'clamp(2.5rem, 12vw, 9rem)',
  color: alpha(theme.palette.text.primary, 0.08),
  textShadow: `0 0 40px ${alpha(theme.palette.common.black, 0.04)}`,
  [theme.breakpoints.up('md')]: {
    fontSize: 'clamp(3.5rem, 14vw, 11rem)',
  },
}))
