import { Stack } from "@mui/material";
import CancelButton from "../buttons/CancelButton";
import { FC } from "react";
import { StepFooterAppointmentProps } from "./types";
import ContainedButton from "../buttons/ContainedButton";
import OutlinedButton from "../buttons/OutlinedButton";

const StepFooterAppointment: FC<StepFooterAppointmentProps> = ({
  formId,
  handleBack,
  isButtonAppointmentVisible,
  setSubmitWithAppointment,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <CancelButton onClick={handleBack} sx={{ minWidth: "130px" }}>
        Étape précédente
      </CancelButton>
      <Stack direction="row">
        <OutlinedButton
          type="submit"
          form={formId}
          padding="large"
          selected
          onClick={() => setSubmitWithAppointment(false)}
        >
          Continuer sans rendez-vous
        </OutlinedButton>
        {isButtonAppointmentVisible && (
          <ContainedButton
            type="submit"
            color="secondary"
            padding="small"
            sx={{ minWidth: "130px", marginLeft: "12px" }}
            form={formId}
            onClick={() => setSubmitWithAppointment(true)}
          >
            Valider le RDV
          </ContainedButton>
        )}
      </Stack>
    </Stack>
  );
};

export default StepFooterAppointment;
