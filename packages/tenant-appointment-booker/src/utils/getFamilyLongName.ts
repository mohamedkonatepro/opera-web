const getFamilyLongName = (orderType: string, familyLongName: string) => {
  return (
    {
      ES: "État des lieux de sortie",
    }[orderType] ?? familyLongName
  );
};

export default getFamilyLongName;
