import { Button, ButtonProps } from "@mui/material";
import ContainedButton from "./ContainedButton";

const ValidateButton: React.FC<ButtonProps> = ({ form, ...rest }) => {
  return (
    <ContainedButton
      {...rest}
      type="submit"
      form={form}
      color="secondary"
      padding="large"
    />
  );
};

export default ValidateButton;
