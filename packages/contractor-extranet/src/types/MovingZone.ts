export interface MovingZone {
  id: number;
  code: string;
  postal_code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MovingZoneListResponse {
  data: MovingZone[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
