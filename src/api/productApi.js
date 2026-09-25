import api from "./axios";

export const getProducts = async (
  limit,
  skip,
  search = "",
  category = "",
  sortBy = "",
  order = "",
  config = {}
) => {
  let endpoint = "/products";

  if (category) {
    endpoint = `/products/category/${category}`;
  } else if (search) {
    endpoint = "/products/search";
  }

  const response = await api.get(endpoint, {
    params: {
      limit,
      skip,
      ...(search && { q: search }),
      ...(sortBy && { sortBy }),
      ...(order && { order }),
    },
    ...config,
  });

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");

  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products/add", productData);

  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};