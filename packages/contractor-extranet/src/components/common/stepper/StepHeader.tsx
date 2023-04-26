import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { StepHeaderProps } from "./types";

const StepHeader: FC<StepHeaderProps> = ({
  label,
  title,
  description,
  stepNumber,
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="caption" fontWeight={500} color="border.bold">
        Étape {stepNumber} : {label}
      </Typography>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
};

export default StepHeader;
