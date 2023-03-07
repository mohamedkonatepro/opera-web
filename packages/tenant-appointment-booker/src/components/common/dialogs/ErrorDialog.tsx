import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import { Error as ErrorIcon, Close as CloseIcon } from "@mui/icons-material"
import Circle from "../Circle"
interface ErrorDialogProps {
  open: boolean
  onClose?: () => void
  title?: string
  text?: string
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, title, text, onClose }) => {
  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle component={Stack} direction="row">
        <Circle bgcolor="error.light"><ErrorIcon color="error" /></Circle>
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{ alignSelf: "start", ml: 'auto' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <Stack></Stack>
        <DialogContentText variant="body1" fontWeight="500" color="text.primary">{title}</DialogContentText>
        <DialogContentText variant="body2">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" onClick={onClose} color="secondary" fullWidth>
            J&apos;ai compris
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDialog
