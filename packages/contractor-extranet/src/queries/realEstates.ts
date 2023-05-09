import axios from "axios";

interface Filters {
  address: string;
  buildingReference: string;
  unitReference: string;
  page: string;
  pageSize: string;
  firstnameTenant: string;
  lastnameTenant: string;
}

const buildQueryString = (filters: Filters): string => {
  const { address, buildingReference, unitReference, page, pageSize, firstnameTenant, lastnameTenant } = filters;
  const queryParams = new URLSearchParams({
    address,
    buildingReference,
    unitReference,
    page,
    pageSize,
    firstnameTenant,
    lastnameTenant,
  });

  return `api/real-estates?${queryParams.toString()}`;
};
export const getRealEstates = async (filters: Filters) => {
  try {
    const url = buildQueryString(filters);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
