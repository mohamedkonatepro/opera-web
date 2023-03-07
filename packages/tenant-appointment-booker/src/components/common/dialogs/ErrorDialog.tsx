import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import { Error as ErrorIcon, Close as CloseIcon } from "@mui/icons-material"
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
        <Box bgcolor="error.light" borderRadius="50%" width={40} height={40} display="flex" alignItems="center" justifyContent="center">
          <ErrorIcon
            color="error"
          />
        </Box>

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
        <DialogContentText variant="body1" fontWeight="500" color="text.primary">{title}</DialogContentText>
        <DialogContentText variant="body2" color="text.secondary">{text}</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default ErrorDialog
