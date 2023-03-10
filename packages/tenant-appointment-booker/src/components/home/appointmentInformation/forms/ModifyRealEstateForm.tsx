import { Stack, TextField } from "@mui/material";
import { useState } from "react";

export interface RealEstateFormSubmitValues {
  message: string;
}

interface FormProps {
  id: string;
  onSubmit: (values: RealEstateFormSubmitValues) => void;
}

const ModifyRealEstateForm: React.FunctionComponent<FormProps> = (props) => {
  const { id, onSubmit } = props;

  const [message, setMessage] = useState("");

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ message });
  };

  return (
    <Stack id={id} component="form" onSubmit={handleOnSubmit}>
      <TextField
        label="Votre message"
        placeholder="Votre message..."
        name="message"
        color="secondary"
        onChange={onChangeMessage}
        multiline
        required
        value={message}
      />
    </Stack>
  );
};

export default ModifyRealEstateForm;
