export function formattedPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.replaceAll(".", " ");
  if (phoneNumber.substring(0, 1) == "0")
    phoneNumber = phoneNumber.substring(1);
  if (phoneNumber.indexOf("+33") == -1) 
    phoneNumber = "+33 " + phoneNumber;

  return phoneNumber;
}
