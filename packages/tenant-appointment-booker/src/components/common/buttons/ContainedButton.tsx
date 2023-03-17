import { Button, ButtonProps } from "@mui/material";

interface ContainedButtonProps extends Omit<ButtonProps, "variant"> {
  padding: "large" | "small";
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  sx,
  padding,
  ...rest
}) => {
  const paddingSize = padding === "large" ? 1.5 : 1;
  return (
    <Button
      variant="contained"
      sx={{
        pt: paddingSize,
        pb: paddingSize,
      }}
      {...rest}
    />
  );
};

export default ContainedButton;
