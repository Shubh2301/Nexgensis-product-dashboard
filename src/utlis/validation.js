const VALID_PAGE_SIZES = [10, 20, 30];

const VALID_SORT_FIELDS = ["price", "rating", "title"];

const VALID_SORT_ORDERS = ["asc", "desc"];

export const getValidPage = (value) => {
  const page = Number(value);

  if (Number.isInteger(page) && page > 0) {
    return page;
  }

  return 1;
};

export const getValidPageSize = (value) => {
  const pageSize = Number(value);

  if (VALID_PAGE_SIZES.includes(pageSize)) {
    return pageSize;
  }

  return 10;
};

export const getValidSortBy = (value) => {
  if (VALID_SORT_FIELDS.includes(value)) {
    return value;
  }

  return "";
};

export const getValidOrder = (value) => {
  if (VALID_SORT_ORDERS.includes(value)) {
    return value;
  }

  return "";
};