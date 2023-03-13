import { parsePhoneNumber } from "libphonenumber-js";

export function formattedPhoneNumber(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  const formattedPhoneNumber = `+33${digitsOnly.slice(-9)}`;

  return parsePhoneNumber(formattedPhoneNumber, "FR").formatInternational();
}
