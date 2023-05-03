enum KeyEnum {
  TENANT = '0',
  CONTRACTOR = '1',
  OPERATOR = '2',
  KEEPER = '3',
}

type EnumWithStrIndex = {
  [key: string]: string;
}

export const KeyEnumWithStrIndex: EnumWithStrIndex = {
  ...KeyEnum,
};
