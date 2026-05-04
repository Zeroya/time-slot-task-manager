import { DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 700,
  paddingBottom: theme.spacing(0.5),
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(1),
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3, 2.5),
}))
