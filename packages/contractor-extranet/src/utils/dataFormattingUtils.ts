import formatServiceOption from "@/apiUtils/formatData/formatServiceOption";

export const formatRealEstateData = (realEstate: any) => {
  const { id, attributes } = realEstate;
  const { contractor, owner, real_estate_type, tenants, buildingAnnexes } = attributes;
  const formattedContractor = formatContractorData(contractor.data);
  const formattedOwner = formatOwnerData(owner.data);
  const formattedRealEstateType = formatRealEstateTypeData(
    real_estate_type.data
  );
  const formattedTenants = tenants.data.map(formatTenantData);
  const formattedBuildingAnnexes = buildingAnnexes.data.map(formatBuildingAnnexesData);
  return {
    id,
    ...attributes,
    contractor: formattedContractor,
    owner: formattedOwner,
    real_estate_type: formattedRealEstateType,
    tenants: formattedTenants,
    buildingAnnexes: formattedBuildingAnnexes,
  };
};

export const formatContractorData = (contractor: any) => {
  return contractor
    ? {
        id: contractor.id,
        ...contractor.attributes,
        serviceOptions:
          contractor.attributes.service_options?.data?.map(
            formatServiceOption
          ) ?? [],
        service_options: undefined,
      }
    : null;
};

export const formatOwnerData = (owner: any) => {
  return owner ? { id: owner.id, ...owner.attributes } : null;
};

export const formatRealEstateTypeData = (realEstateType: any) => {
  return realEstateType
    ? { id: realEstateType.id, ...realEstateType.attributes }
    : null;
};

export const formatTenantData = (tenant: any) => {
  return tenant ? { id: tenant.id, ...tenant.attributes } : null;
};

export const formatMovingZoneData = (movingZone: any) => {
  return movingZone ? { id: movingZone.id, ...movingZone.attributes } : null;
};

export const formatBuildingAnnexesData = (annex: any) => {
  const { id, attributes } = annex;
  const { buildingAnnexType } = attributes;

  const formattedBuildingAnnexType = buildingAnnexType
    ? formatBuildingAnnexTypeData(buildingAnnexType.data)
    : undefined;

  return {
    id,
    ...attributes,
    type: formattedBuildingAnnexType,
  };
};

export const formatBuildingAnnexTypeData = (annexType: any) => {
  return annexType ? { id: annexType.id, ...annexType.attributes } : null;
};