import RealEstate from "@/types/realEstates";

const realEstateRemoveDuplicates = (objects: RealEstate[], key: keyof RealEstate['attributes']): RealEstate[] => {
  const uniqueObjects: RealEstate[] = [];
  const duplicateObjects: (string | number)[] = [];

  objects.forEach((object) => {
    const value = object.attributes[key];
    if (value != null && (typeof value === "string" || typeof value === "number") && !duplicateObjects.includes(value)) {
      uniqueObjects.push(object);
      duplicateObjects.push(value);
    }
  });

  return uniqueObjects;
}

export default realEstateRemoveDuplicates;