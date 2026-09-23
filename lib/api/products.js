import axios from "axios";

export async function getProducts() {
  const response = await axios.get(
    "https://fakestoreapi.com/products"
  );

  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(
    `https://fakestoreapi.com/products/${id}`
  );

  return response.data;
}