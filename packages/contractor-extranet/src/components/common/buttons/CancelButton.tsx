import OutlinedButton from "./OutlinedButton";
import { OutlinedButtonProps } from "./types";

interface CancelButtonProps extends Omit<OutlinedButtonProps, 'padding'> {}

const CancelButton: React.FC<CancelButtonProps> = (props) => {
  return <OutlinedButton {...props} selected padding="large" />;
};

export default CancelButton;
