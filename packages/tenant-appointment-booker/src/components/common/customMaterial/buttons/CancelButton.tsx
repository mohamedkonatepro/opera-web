import { Button, ButtonProps } from "@mui/material";

const CancelButton: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props;
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={onClick}
      sx={{
        width: "100%",
        height: 48,
        backgroun: "#FFFFFF",
        border: "2px solid #5148E6",
        textTransform: "none",
        borderRadius: "6px",
      }}
    >
      {children}
    </Button>
  );
};

export default CancelButton;
