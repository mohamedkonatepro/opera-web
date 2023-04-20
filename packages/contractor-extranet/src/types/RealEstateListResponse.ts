import RealEstate from "./RealEstate";

interface RealEstateListResponse {
  data: RealEstate[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default RealEstateListResponse;
