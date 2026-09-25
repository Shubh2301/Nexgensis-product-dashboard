import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    setProduct(null);

    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    try {
      const data = await getProductById(productId);

      setProduct(data);
    } catch (error) {
      console.error("Fetch product error:", error);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading message="Loading product..." />;
  }

  if (error) {
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

  if (!product) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-4 sm:p-6">

      {/* Decorative Background */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#86A1B8]/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#364669]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          className="mb-6 rounded-xl border border-[#3A4B75]/20 bg-white/80 px-4 py-2.5 font-medium text-[#3A4B75] shadow-sm backdrop-blur-md transition hover:bg-[#F4F6F9]"
        >
          ← Back to Products
        </button>

        {/* Product Card */}
        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-[0_20px_60px_rgba(54,70,105,0.12)] backdrop-blur-xl">

          {/* Product Image */}
          <div className="bg-linear-to-br from-[#F7F9FC] to-[#EEF3F8] p-6 sm:p-10">
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-white/70 p-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-72 w-full object-contain sm:max-h-80"
              />
            </div>
          </div>

          {/* Product Content */}
          <div className="p-6 sm:p-8">

            {/* Product Heading */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-[#9A9FA5]">
                Product #{product.id}
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-[#1A1D1F] sm:text-3xl">
                {product.title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#6F767E] sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Price / Rating */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-gradient-to-br from-[#86A1B8] to-[#364669] p-5 text-white shadow-lg">
                <p className="text-sm text-white/75">
                  Price
                </p>

                <p className="mt-1 text-3xl font-bold">
                  ${product.price}
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7F9FC] p-5">
                <p className="text-sm text-[#9A9FA5]">
                  Rating
                </p>

                <p className="mt-1 text-2xl font-bold text-[#1A1D1F]">
                  ⭐ {product.rating || "N/A"}
                </p>
              </div>
            </div>

            {/* Product Information */}
            <div className="rounded-2xl bg-[#F7F9FC] p-5 sm:p-6">

              <h2 className="mb-5 text-lg font-bold text-[#1A1D1F]">
                Product Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {/* Category */}
                <div>
                  <p className="text-sm text-[#9A9FA5]">
                    Category
                  </p>

                  <p className="mt-1 font-semibold capitalize text-[#1A1D1F]">
                    {product.category}
                  </p>
                </div>

                {/* Stock */}
                <div>
                  <p className="text-sm text-[#9A9FA5]">
                    Stock
                  </p>

                  <p className="mt-1 font-semibold text-[#1A1D1F]">
                    {product.stock}
                  </p>
                </div>

                {/* Brand */}
                <div>
                  <p className="text-sm text-[#9A9FA5]">
                    Brand
                  </p>

                  <p className="mt-1 font-semibold text-[#1A1D1F]">
                    {product.brand || "N/A"}
                  </p>
                </div>

                {/* SKU */}
                <div>
                  <p className="text-sm text-[#9A9FA5]">
                    SKU
                  </p>

                  <p className="mt-1 font-semibold text-[#1A1D1F]">
                    {product.sku || "N/A"}
                  </p>
                </div>

                {/* Discount */}
                <div>
                  <p className="text-sm text-[#9A9FA5]">
                    Discount
                  </p>

                  <p className="mt-1 font-semibold text-[#1A1D1F]">
                    {product.discountPercentage
                      ? `${product.discountPercentage}%`
                      : "N/A"}
                  </p>
                </div>

                {/* Minimum Order */}
                <div>
                  <p className="text-sm text-[#9A9FA5]">
                    Minimum Order
                  </p>

                  <p className="mt-1 font-semibold text-[#1A1D1F]">
                    {product.minimumOrderQuantity || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() =>
                  navigate(
                    `/products/${product.id}/edit`
                  )
                }
                className="rounded-xl bg-[#3A4B75] px-5 py-3 font-semibold text-white shadow-lg shadow-[#3A4B75]/20 transition hover:bg-[#364669] hover:shadow-xl"
              >
                Edit Product
              </button>

              <button
                onClick={() => navigate("/products")}
                className="rounded-xl border border-[#D9E1E8] bg-white px-5 py-3 font-semibold text-[#3A4B75] transition hover:bg-[#F4F6F9]"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;