import { Button, ButtonProps } from "@mui/material";

const ValidateButton: React.FC<ButtonProps> = (props) => {
  const { children, onClick, form } = props;
  return (
    <Button
      onClick={onClick}
      type="submit"
      form={form}
      variant="contained"
      color="secondary"
      sx={{
        width: "100%",
        height: 48,
        background: "linear-gradient(180deg, #6061F0 0.01%, #5046E5 100%)",
        boxShadow:
          "0px 1px 2px rgba(17, 17, 34, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.1), inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
        textTransform: "none",
        borderRadius: "6px",
      }}
    >
      {children}
    </Button>
  );
};

export default ValidateButton;
