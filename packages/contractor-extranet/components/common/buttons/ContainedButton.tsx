import { Button, ButtonProps } from "@mui/material";

interface ContainedButtonProps extends Omit<ButtonProps, "variant"> {
  padding: "large" | "small";
  width: string;

}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  sx,
  padding,
  width,
  ...rest
}) => {
  const paddingSize = padding === "large" ? 1.5 : 1;
  return (
    <Button
      variant="contained"
      sx={{
        pt: paddingSize,
        pb: paddingSize,
        width,
      }}
      {...rest}
    />
  );
};

export default ContainedButton;
