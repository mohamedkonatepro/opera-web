import { Button, ButtonProps } from "@mui/material";

interface OutlinedButtonProps extends Omit<ButtonProps, "variant"> {
  padding: "large" | "small";
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  sx,
  padding,
  ...rest
}) => {
  const paddingSize = padding === "large" ? 1.5 : 1;
  return (
    <Button
      variant="outlined"
      sx={{
        pt: paddingSize,
        pb: paddingSize,
      }}
      {...rest}
    />
  );
};

export default OutlinedButton;
