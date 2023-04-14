import { Button } from "@mui/material";
import { ContainedButtonProps } from "./types";

const ContainedButton: React.FC<ContainedButtonProps> = ({
  sx,
  padding,
  minWidth,
  ...rest
}) => {
  const paddingSize = padding === "large" ? 1.5 : 1;
  return (
    <Button
      variant="contained"
      sx={{
        pt: paddingSize,
        pb: paddingSize,
        minWidth,
      }}
      {...rest}
    />
  );
};

export default ContainedButton;
