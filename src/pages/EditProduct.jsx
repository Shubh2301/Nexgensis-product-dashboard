import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../api/productApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      const productId = Number(id);

      if (!Number.isInteger(productId) || productId <= 0) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        const product = await getProductById(productId);

        setTitle(product.title || "");
        setPrice(product.price ?? "");
        setCategory(product.category || "");
      } catch (error) {
        console.error("Fetch product error:", error);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

    if (saving) {
      return;
    }

    setSaving(true);

    try {
      const productData = {
        title: title.trim(),
        price: Number(price),
        category: category.trim(),
      };

      const updatedProduct = await updateProduct(
        id,
        productData
      );

      console.log("Product updated:", updatedProduct);

      navigate("/products", {
        state: {
          updatedProduct,
        },
      });
    } catch (error) {
      console.error("Update product error:", error);
      setError("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading product..." />;
  }

  if (error && !title && !price && !category) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-6">
        
        {/* Decorative Background */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#86A1B8]/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#364669]/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-5">
          <ErrorMessage message={error} />

          <button
            onClick={() => navigate("/products")}
            className="rounded-xl bg-[#3A4B75] px-5 py-2.5 font-medium text-white shadow-lg shadow-[#3A4B75]/20 transition hover:bg-[#364669]"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
   <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-4 sm:p-6">

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
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-[#9A9FA5]">
              Update the details of your product
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="rounded-xl border border-[#3A4B75]/20 bg-white/80 px-4 py-2.5 font-medium text-[#3A4B75] shadow-sm backdrop-blur-md transition hover:bg-[#F4F6F9]"
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

            {/* Inline Error */}
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
              disabled={saving}
              className="w-full rounded-xl bg-[#3A4B75] px-4 py-3 font-semibold text-white shadow-lg shadow-[#3A4B75]/20 transition hover:bg-[#364669] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Updating..."
                : "Update Product"}
            </button>
          </form>
        </div>

        {/* Helper Text */}
        <p className="mt-4 text-center text-xs text-[#9A9FA5]">
          Make sure all product details are correct before updating.
        </p>
      </div>
    </div>
  );
}

export default EditProduct;