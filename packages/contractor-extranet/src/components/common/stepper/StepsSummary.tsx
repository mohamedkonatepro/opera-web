import { Stack, Typography } from "@mui/material";
import { StepsSummaryProps } from "./types";
import { FC } from "react";

const StepsSummary: FC<StepsSummaryProps> = ({ steps, currentStepNumber }) => {
  return (
    <Stack spacing={2.5} pt={4} pl={4} pr={4} minWidth="308px">
      <Typography variant="subtitle2">
        Étapes {currentStepNumber}/{steps.length}
      </Typography>
      {steps.map((step, index) => (
        <Stack key={step.label}>
          <Typography
            variant="subtitle2"
            color={
              index + 1 === currentStepNumber ? "border.bold" : "text.disabled"
            }
          >
            {step.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default StepsSummary;
