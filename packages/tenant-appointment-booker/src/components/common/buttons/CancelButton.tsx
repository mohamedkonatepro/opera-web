import { Button, ButtonProps } from "@mui/material";

const CancelButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} variant="outlined" color="secondary" />;
};

export default CancelButton;
