import { parsePhoneNumber } from "libphonenumber-js";

export function formattedPhoneNumber(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  if (!digitsOnly) {
    return digitsOnly
  }
  const formattedPhoneNumber = `+33${digitsOnly.slice(-9)}`;

  return parsePhoneNumber(formattedPhoneNumber, "FR").formatInternational();
}
