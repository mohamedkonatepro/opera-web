import ContainedButton from "./ContainedButton";
import { ContainedButtonProps } from "./types";

interface ValidateButtonProps extends Omit<ContainedButtonProps, 'padding'> {}


const ValidateButton: React.FC<ValidateButtonProps> = ({ form, ...rest }) => {
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
