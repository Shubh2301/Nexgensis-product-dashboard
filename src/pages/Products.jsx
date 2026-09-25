
import { useNavigate } from "react-router-dom";

import useProducts from "../hooks/useProducts";
import { logout } from "../utlis/auth";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function Products() {
  const navigate = useNavigate();

  const {
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
  } = useProducts();

  const totalPages = Math.ceil(total / pageSize);

  const handleLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    await deleteProduct(id);
  };

  if (loading && products.length === 0) {
    return <Loading message="Loading products..." />;
  }

  return (
  <div className="min-h-screen bg-linear-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-[#6F767E]">
              Poduct Dashboard
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1F] sm:text-3xl">
              Products
            </h1>

            <p className="mt-1 text-sm text-[#9A9FA5]">
              Manage your products and catalog
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/products/add")}
              className="rounded-xl bg-[#3A4B75] cursor-pointer px-4 py-2.5 font-semibold text-white shadow-lg shadow-[#3A4B75]/20 transition hover:bg-[#364669] hover:shadow-xl"
            >
              + Add Product
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border cursor-pointer border-[#3A4B75]/20 bg-white/80 px-4 py-2.5 font-semibold text-[#3A4B75] shadow-sm backdrop-blur-md transition hover:bg-[#F4F6F9]"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(54,70,105,0.10)] backdrop-blur-xl sm:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-sm text-[#1A1D1F] placeholder:text-[#9A9FA5] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Category
              </label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-sm text-[#1A1D1F] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              >
                <option value="">All Categories</option>

                {categories.map((item) => (
                  <option
                    key={item.slug || item}
                    value={item.slug || item}
                  >
                    {item.name || item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Sort By
              </label>

              <select
                value={
                  sortBy && order
                    ? `${sortBy}-${order}`
                    : ""
                }
                onChange={(event) =>
                  setSorting(event.target.value)
                }
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-sm text-[#1A1D1F] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              >
                <option value="">Default</option>

                <option value="price-asc">
                  Price: Low to High
                </option>

                <option value="price-desc">
                  Price: High to Low
                </option>

                <option value="rating-asc">
                  Rating: Low to High
                </option>

                <option value="rating-desc">
                  Rating: High to Low
                </option>

                <option value="title-asc">
                  Title: A to Z
                </option>

                <option value="title-desc">
                  Title: Z to A
                </option>
              </select>
            </div>

            {/* Page Size */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Products Per Page
              </label>

              <select
                value={pageSize}
                onChange={(event) =>
                  setPageSize(Number(event.target.value))
                }
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-sm text-[#1A1D1F] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <ErrorMessage
              message={error}
              fullPage={false}
            />
          </div>
        )}

        {/* Products */}
        {products.length === 0 ? (
          <EmptyState message="No products found." />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-[0_20px_60px_rgba(54,70,105,0.10)] backdrop-blur-xl md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E7EBF0] bg-[#F7F9FC]">
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
                        Image
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
                        Product
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
                        Category
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
                        Rating
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-[#EEF1F4] transition hover:bg-[#F7F9FC]/80"
                      >
                        {/* Small Square Image */}
                        <td className="px-5 py-4">
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-[#F4F6F9]">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Product Title */}
                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              navigate(
                                `/products/${product.id}`
                              )
                            }
                            className="text-left cursor-pointer font-semibold text-[#1A1D1F] transition hover:text-[#3A4B75]"
                          >
                            {product.title}
                          </button>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-[#3A4B75]">
                            ${product.price}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-[#EAF0F6] px-3 py-1 text-xs font-medium capitalize text-[#3A4B75]">
                            {product.category}
                          </span>
                        </td>

                        {/* Rating */}
                        <td className="px-5 py-4">
                          <span className="font-medium text-[#1A1D1F]">
                            ★ {product.rating}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/products/${product.id}/edit`
                                )
                              }
                              className="rounded-lg border border-[#3A4B75]/15 bg-white px-3 py-2 text-sm font-medium text-[#3A4B75] transition hover:bg-[#F4F6F9]"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(product.id)
                              }
                              className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(54,70,105,0.10)] backdrop-blur-xl"
                >
                  <div className="flex gap-4">

                    {/* Mobile Image */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F6F9]">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <button
                        onClick={() =>
                          navigate(
                            `/products/${product.id}`
                          )
                        }
                        className="text-left text-base font-semibold text-[#1A1D1F] transition hover:text-[#3A4B75]"
                      >
                        {product.title}
                      </button>

                      <p className="mt-1 text-sm text-[#6F767E] capitalize">
                        {product.category}
                      </p>

                      <p className="mt-2 font-semibold text-[#3A4B75]">
                        ${product.price}
                      </p>

                      <p className="mt-1 text-sm text-[#6F767E]">
                        ★ {product.rating}
                      </p>

          </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="mt-4 flex gap-2 border-t border-[#EEF1F4] pt-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/products/${product.id}/edit`
                        )
                      }
                      className="flex-1 rounded-xl border border-[#3A4B75]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#3A4B75] transition hover:bg-[#F4F6F9]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="flex-1 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_60px_rgba(54,70,105,0.10)] backdrop-blur-xl sm:flex-row">

            <p className="text-sm text-[#6F767E]">
              Page{" "}
              <span className="font-semibold text-[#1A1D1F]">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#1A1D1F]">
                {totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPage(page - 1)
                }
                disabled={page === 1}
                className="rounded-xl border border-[#D9E1E8] bg-white px-4 py-2 text-sm font-medium text-[#3A4B75] transition hover:bg-[#F4F6F9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={() =>
                  setPage(page + 1)
                }
                disabled={page === totalPages}
                className="rounded-xl bg-[#3A4B75] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#364669] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Loading indicator when changing filters/pages */}
        {loading && products.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-[#6F767E]">
              Loading products...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;