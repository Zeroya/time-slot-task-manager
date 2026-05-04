import { Box, Paper, Stack } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const FiltersPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  marginBottom: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
}))

export const FiltersRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  '&:last-of-type': {
    marginBottom: 0,
  },
}))

export const WindowNavBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}))

export const NavHint = styled('span')(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
}))
