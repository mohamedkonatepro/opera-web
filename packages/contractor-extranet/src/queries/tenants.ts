import Tenant from "@/types/Tenant";
import axios from "axios";

interface Filters {
  firstname: string;
  lastname: string;
}

export const getTenants = async (filters: Filters): Promise<Tenant[]> => {
  try {
    const { firstname, lastname } = filters
    const { data } = await axios.get(`api/tenants?firstname=${firstname}&lastname=${lastname}`);
    return data;
  } catch (error) {
    throw error;
  }
};
