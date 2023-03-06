import { Button, Dialog, DialogTitle, List, Stack } from "@mui/material";
interface DialogProps {
  title: string;
  open: boolean;
  onValidateHandler?: () => void;
  onCancelHandler?: () => void;
  onLoadHandler?: () => void;
  onCloseHandler?: () => void;
  items?: any[];
}
const CustomDialog: React.FunctionComponent<DialogProps> = (props) => {
  const {
    title,
    open,
    onValidateHandler: onValidateHandler,
    onCancelHandler,
    onLoadHandler,
    onCloseHandler,
    items,
  } = props;
  return (
    <Dialog onClose={onCloseHandler} onLoad={onLoadHandler} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {/*items? items.map((item) => (item)) : NaN */}
      </List>
      <Stack direction="row" spacing={1}>
        <Button onClick={onCancelHandler} variant="contained">
          Annuler
        </Button>
        <Button onClick={onValidateHandler} variant="contained">
          Valider
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CustomDialog;
