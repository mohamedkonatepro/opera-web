import { Button } from "@mui/material";
import { OutlinedButtonProps } from "./types";

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  sx,
  padding,
  selected = false,
  ...rest
}) => {
  const paddingSize = padding === "large" ? 1.5 : 1;
  return (
    <Button
      variant="outlined"
      color={selected ? "secondary" : "inherit"}
      sx={{
        pt: paddingSize,
        pb: paddingSize,
        color: selected ? "secondary.main" : "text.secondary",
        ...sx,
      }}
      {...rest}
    />
  );
};

export default OutlinedButton;
