import { Button } from "@mui/material";

interface ButtonProps {
  label: string;
  handler: () => void;
  disabled?: boolean;
  display?: string;
}

const UnderlinedButton: React.FunctionComponent<ButtonProps> = (props) => {
  const { label, handler, disabled, display } = props;
  return (
    <Button
      onClick={handler}
      variant="text"
      color="secondary"
      sx={{ textDecorationLine: "underline", textTransform: "none" }}
      disabled={disabled}
      style={{ display: display }}
    >
      {label}
    </Button>
  );
};

export default UnderlinedButton;
