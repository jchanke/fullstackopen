import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async ({ id, updatedBlog }) => {
  const config = { headers: { Authorization: token } };
  const blogToSend = { ...updatedBlog, user: updatedBlog.user.id };
  const response = await axios.put(`${baseUrl}/${id}`, blogToSend, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getById, getAll, create, update, deleteBlog, setToken };
