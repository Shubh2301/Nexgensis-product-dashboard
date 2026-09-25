import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi";
import ErrorMessage from "../components/ErrorMessage";

function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Product title is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        title: title.trim(),
        price: Number(price),
        category: category.trim(),
      };

      const createdProduct = await createProduct(productData);

      console.log("Product created:", createdProduct);

      navigate("/products", {
        state: {
          createdProduct,
        },
      });
    } catch (error) {
      console.error("Create product error:", error);
      setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-4 sm:p-6">

      {/* Decorative Background */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#86A1B8]/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#364669]/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="mb-1 text-sm font-medium text-[#6F767E]">
              Product Management
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1F]">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-[#9A9FA5]">
              Create a new product for your catalog
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="rounded-xl cursor-pointer border border-[#3A4B75]/20 bg-white/80 px-4 py-2.5 font-medium text-[#3A4B75] shadow-sm backdrop-blur-md transition hover:bg-[#F4F6F9]"
          >
            ← Back
          </button>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(54,70,105,0.12)] backdrop-blur-xl sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Product Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Enter product title"
                autoComplete="off"
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-[#1A1D1F] placeholder:text-[#9A9FA5] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-[#6F767E]">
                  $
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="0.00"
                  className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] py-3 pl-9 pr-4 text-[#1A1D1F] placeholder:text-[#9A9FA5] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1A1D1F]">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder="Enter category"
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-[#1A1D1F] placeholder:text-[#9A9FA5] outline-none transition focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <ErrorMessage
                  message={error}
                  fullPage={false}
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl cursor-pointer bg-[#3A4B75] px-4 py-3 font-semibold text-white shadow-lg shadow-[#3A4B75]/20 transition hover:bg-[#364669] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>

        {/* Helper Text */}
        <p className="mt-4 text-center text-xs text-[#9A9FA5]">
          Fill in all required fields before creating the product.
        </p>
      </div>
    </div>
  );
}

export default AddProduct;