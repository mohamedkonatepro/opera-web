import { Link, LinkProps } from "@mui/material";

const UnderlinedButton: React.FC<LinkProps> = (props) => {
  const { children, onClick, variant } = props;
  return (
    <Link
      component="button"
      variant={variant}
      color="secondary"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default UnderlinedButton;
