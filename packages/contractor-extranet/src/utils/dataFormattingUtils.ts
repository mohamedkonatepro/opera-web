export const formatRealEstateData = (realEstate: any) => {
  const { id, attributes } = realEstate;
  const { contractor, owner, real_estate_type, tenants } = attributes;
  const formattedContractor = formatContractorData(contractor.data);
  const formattedOwner = formatOwnerData(owner.data);
  const formattedRealEstateType = formatRealEstateTypeData(real_estate_type.data);
  const formattedTenants = tenants.data.map(formatTenantData);

  return {
    id, ...attributes,
    contractor: formattedContractor,
    owner: formattedOwner,
    real_estate_type: formattedRealEstateType,
    tenants: formattedTenants
  };
}

export const formatContractorData = (contractor: any) => {
  return contractor ? { id: contractor.id, ...contractor.attributes } : null;
}

export const formatOwnerData = (owner: any) => {
  return owner ? { id: owner.id, ...owner.attributes } : null;
}

export const formatRealEstateTypeData = (realEstateType: any) => {
  return realEstateType ? { id: realEstateType.id, ...realEstateType.attributes } : null;
}

export const formatTenantData = (tenant: any) => {
  return tenant ? { id: tenant.id, ...tenant.attributes } : null;
}
