import axios from "axios";
import { apiBaseUrl } from "../constants";

import { Diagnosis } from "@backend/src/types";

const getAll = async (): Promise<Diagnosis[]> => {
  const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

export default { getAll };
