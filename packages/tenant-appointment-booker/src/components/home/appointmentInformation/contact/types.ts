import Order from "@/types/order";
import { ContactFormSubmitValuesWithType } from "./form/types";

export interface ContactProps {
  order: Order;
}

export interface ContactDialogProps {
  open: boolean;
  order: Order;
  disabled: boolean;
  onClose: () => void;
  onSubmit: (values: ContactFormSubmitValuesWithType) => void;
}
