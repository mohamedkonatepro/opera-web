export interface RealEstateType {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    code: string;
    og_code: string;
  }
}

export interface RealEstateTypeResponse {
  data: RealEstateType;
}
