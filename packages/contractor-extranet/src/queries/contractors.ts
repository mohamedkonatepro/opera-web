import axios from "axios";

export const getContractor = async (contractorId: string) => {
  const response = await axios.get(`/api/contractors/${contractorId}`);
  return response.data;
};
