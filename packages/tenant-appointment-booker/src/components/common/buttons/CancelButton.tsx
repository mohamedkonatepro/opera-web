import { Button, ButtonProps } from "@mui/material";
import OutlinedButton from "./OutlinedButton";

const CancelButton: React.FC<ButtonProps> = (props) => {
  return <OutlinedButton {...props} selected padding="large" />;
};

export default CancelButton;
