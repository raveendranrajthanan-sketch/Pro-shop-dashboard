
import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export const getProducts = async () => {
  const response = await API.get("/products?limit=0");
  return response.data;
};

export const getCategories = async () => {
  const response = await API.get("/products/category-list");
  return response.data;
};

export default API;
