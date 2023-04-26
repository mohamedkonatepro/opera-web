import { Button } from "@mui/material";
import { ContainedButtonProps } from "./types";

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
        ...sx,
      }}
      {...rest}
    />
  );
};

export default ContainedButton;
