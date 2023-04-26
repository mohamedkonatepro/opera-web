import axios from "axios";

interface movingZoneFilter {
  postalCode: string;
}

export const getMovingZone = async ({ postalCode }: movingZoneFilter) => {
  try {
    const response = await axios.get(
      `api/moving-zones?postalCode=${postalCode}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
