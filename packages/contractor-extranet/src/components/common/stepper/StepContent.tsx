import { Box, Divider, Stack, Typography } from "@mui/material"
import StepFooter from "./StepFooter"
import StepHeader from "./StepHeader"
import { FC } from "react"
import { StepContentProps } from "./types"

const StepContent: FC<StepContentProps> = ({ step, currentStepNumber }) => {
  const StepForm = step.form
  return (
    <Box display="flex" flexDirection="column" width={1} mt={4}>
      <Stack spacing={4} mb={5} divider={<Divider flexItem />}>
        <StepHeader
          title={step.title}
          description={step.description}
          label={step.label}
          stepNumber={currentStepNumber}
        />
        <Box mr={4} display='flex' justifyContent="center">
          <StepForm />
        </Box>
      </Stack>
      <StepFooter />
    </Box>
  )
}

export default StepContent
