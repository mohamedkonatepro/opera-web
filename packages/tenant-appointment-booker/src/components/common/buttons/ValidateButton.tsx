import { Button, ButtonProps } from "@mui/material";

const ValidateButton: React.FC<ButtonProps> = ({ form, ...rest }) => {
  return (
    <Button {...rest} type="submit" form={form} variant="contained" color="secondary" />
  );
};

export default ValidateButton;
