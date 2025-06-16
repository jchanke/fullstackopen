import axios from "axios";
const baseUrl = "/api/users";

const fetch = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const fetchById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { fetch, fetchById };
