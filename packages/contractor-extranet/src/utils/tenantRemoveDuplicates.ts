import Tenant from "@/types/Tenant";

const tenantRemoveDuplicates = (
  objects: Tenant[],
  key: keyof Tenant
): Tenant[] => {
  const uniqueObjects: Tenant[] = [];
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

export default tenantRemoveDuplicates;
