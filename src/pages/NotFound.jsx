import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-6">

      {/* Decorative Background */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#86A1B8]/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#364669]/10 blur-3xl" />

      {/* Content */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/70 bg-white/75 p-8 text-center shadow-[0_20px_60px_rgba(54,70,105,0.15)] backdrop-blur-xl sm:p-10">

        {/* Brand */}
        <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-[#3A4B75]">
          Payno
        </p>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold tracking-tight text-[#3A4B75] sm:text-8xl">
          404
        </h1>

        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#86A1B8] to-[#364669]" />

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-bold text-[#1A1D1F] sm:text-3xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6F767E] sm:text-base">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/products")}
          className="mt-8 rounded-xl bg-[#3A4B75] px-6 py-3 font-semibold text-white shadow-lg shadow-[#3A4B75]/20 transition hover:bg-[#364669] hover:shadow-xl"
        >
          Go to Products
        </button>
      </div>
    </div>
  );
}

export default NotFound;