import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getCategories,
  getProducts,
  deleteProduct as deleteProductApi,
} from "../api/productApi";
import useDebounce from "./useDebounce";

import {
  getValidPage,
  getValidPageSize,
  getValidSortBy,
  getValidOrder,
} from "../utlis/validation";

const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Read and validate URL parameters
  const page = getValidPage(searchParams.get("page"));
  const pageSize = getValidPageSize(searchParams.get("limit"));

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const sortBy = getValidSortBy(
    searchParams.get("sortBy")
  );

  const order = getValidOrder(
    searchParams.get("order")
  );

  const debouncedSearch = useDebounce(search, 500);

  // Clean invalid URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    let changed = false;

    const rawPage = searchParams.get("page");
    const rawLimit = searchParams.get("limit");
    const rawSortBy = searchParams.get("sortBy");
    const rawOrder = searchParams.get("order");

    const validPage = getValidPage(rawPage);
    const validPageSize = getValidPageSize(rawLimit);
    const validSortBy = getValidSortBy(rawSortBy);
    const validOrder = getValidOrder(rawOrder);

    if (rawPage !== String(validPage)) {
      params.set("page", String(validPage));
      changed = true;
    }

    if (rawLimit !== String(validPageSize)) {
      params.set("limit", String(validPageSize));
      changed = true;
    }

    if (rawSortBy !== validSortBy) {
      if (validSortBy) {
        params.set("sortBy", validSortBy);
      } else {
        params.delete("sortBy");
      }

      changed = true;
    }

    if (rawOrder !== validOrder) {
      if (validOrder) {
        params.set("order", validOrder);
      } else {
        params.delete("order");
      }

      changed = true;
    }

    // sortBy and order must exist together
    if ((validSortBy && !validOrder) || (!validSortBy && validOrder)) {
      params.delete("sortBy");
      params.delete("order");
      changed = true;
    }

    if (changed) {
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);
  };

  const setPageSize = (newPageSize) => {
    const params = new URLSearchParams(searchParams);

    params.set("limit", String(newPageSize));
    params.set("page", "1");

    setSearchParams(params);
  };

  const setSearch = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // Search and category are mutually exclusive
    params.delete("category");

    params.set("page", "1");

    setSearchParams(params);
  };

  const setCategory = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    // Search and category are mutually exclusive
    params.delete("search");

    params.set("page", "1");

    setSearchParams(params);
  };

  const setSorting = (value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("sortBy");
      params.delete("order");
    } else {
      const [newSortBy, newOrder] = value.split("-");

      params.set("sortBy", newSortBy);
      params.set("order", newOrder);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Fetch categories error:",
        error
      );
    }
  };

  const fetchProducts = async (signal) => {
    setLoading(true);
    setError("");

    try {
      const skip = (page - 1) * pageSize;

      const data = await getProducts(
        pageSize,
        skip,
        debouncedSearch,
        category,
        sortBy,
        order,
        {
          signal,
        }
      );

      if (signal.aborted) {
        return;
      }

      setProducts(data?.products ?? []);
      setTotal(data?.total ?? 0);
    } catch (error) {
      if (signal.aborted) {
        return;
      }

      console.error(
        "Fetch products error:",
        error
      );

      setError("Failed to fetch products");
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductApi(id);

      const remainingProducts = products.filter(
        (product) => product.id !== id
      );

      setProducts(remainingProducts);

      setTotal((currentTotal) =>
        Math.max(currentTotal - 1, 0)
      );

      // Go to previous page if current page becomes empty
      if (
        remainingProducts.length === 0 &&
        page > 1
      ) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      setError("Failed to delete product");
    }
  };

  // Fetch categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products whenever URL state changes
  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [
    page,
    pageSize,
    debouncedSearch,
    category,
    sortBy,
    order,
  ]);

  return {
    products,
    categories,
    loading,
    error,

    page,
    setPage,

    pageSize,
    setPageSize,

    total,

    search,
    setSearch,

    category,
    setCategory,

    sortBy,
    order,
    setSorting,

    deleteProduct,
  };
};

export default useProducts;