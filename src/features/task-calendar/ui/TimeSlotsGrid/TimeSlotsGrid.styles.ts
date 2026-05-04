import { Box, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GridRoot = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2),
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 1.5, 1.5),
  },
}))

export const GridHeader = styled('h2')(({ theme }) => ({
  margin: 0,
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: theme.palette.text.secondary,
  padding: theme.spacing(2, 0, 1),
}))

export const GridFrame = styled(Box)(() => ({
  width: '100%',
}))
