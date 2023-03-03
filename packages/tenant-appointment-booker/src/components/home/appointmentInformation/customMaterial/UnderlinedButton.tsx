import { Link } from "@mui/material";

interface ButtonProps {
  label: string;
  handler?: () => void;
  lien?: string;
  display?: string;
}

const UnderlinedButton: React.FunctionComponent<ButtonProps> = (props) => {
  const { label, handler, lien, display } = props;
  return (
    <Link
      onClick={handler}
      href={lien}
      variant="body2"
      color="secondary"
      display={display}
      style={{ cursor: "pointer" }}
    >
      {label}
    </Link>
  );
};

export default UnderlinedButton;
