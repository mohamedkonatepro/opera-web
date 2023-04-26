import RealEstate from "@/types/RealEstate";

const realEstateRemoveDuplicates = (
  objects: RealEstate[],
  key: keyof RealEstate
): RealEstate[] => {
  const uniqueObjects: RealEstate[] = [];
  const duplicateObjects: (string | number)[] = [];

  objects.forEach((object) => {
    const value = object[key];
    if (
      value != null &&
      (typeof value === "string" || typeof value === "number") &&
      !duplicateObjects.includes(value)
    ) {
      uniqueObjects.push(object);
      duplicateObjects.push(value);
    }
  });

  return uniqueObjects;
};

export default realEstateRemoveDuplicates;
