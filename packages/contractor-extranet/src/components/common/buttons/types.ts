import { ButtonProps } from "@mui/material";

export interface ContainedButtonProps extends Omit<ButtonProps, "variant"> {
  padding: "large" | "small";
  minWidth?: string;
}

export interface OutlinedButtonProps extends Omit<ButtonProps, "variant"> {
  padding: "large" | "small";
  selected?: boolean;
  minWidth?: string;
}
