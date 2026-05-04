import { Box, Button, Container } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${theme.palette.background.default} 32%)`,
  paddingBottom: theme.spacing(4),
}))

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
  },
}))

export const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1),
}))

export const TitleBlock = styled(Box)(() => ({
  flex: '1 1 280px',
}))

export const PageTitle = styled('h1')(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  margin: `0 0 ${theme.spacing(0.5)}`,
}))

export const PageSubtitle = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: '0.95rem',
  maxWidth: 520,
}))

export const AddButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  boxShadow: 'none',
  fontWeight: 600,
  '&:hover': {
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
  },
}))
