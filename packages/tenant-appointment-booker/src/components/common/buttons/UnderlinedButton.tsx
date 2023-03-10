import { Link, LinkProps } from "@mui/material";

const UnderlinedButton: React.FC<LinkProps> = (props) => {
  const { children, onClick } = props;
  return (
    <Link
      component="button"
      variant="body2"
      color="secondary"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default UnderlinedButton;
