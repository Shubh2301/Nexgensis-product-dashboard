import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const trimmedUsername = username.trim();

    // Validate empty fields
    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    // Prevent duplicate requests
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(
        trimmedUsername,
        password
      );

      localStorage.setItem(
        "token",
        data.accessToken
      );

      navigate("/products", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes loginCardIn {
            from {
              opacity: 0;
              transform: translateY(25px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes floatOne {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(20px, 15px);
            }
          }

          @keyframes floatTwo {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-20px, -15px);
            }
          }

          @keyframes errorIn {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .login-card-animation {
            animation: loginCardIn 0.7s ease-out;
          }

          .float-one {
            animation: floatOne 7s ease-in-out infinite;
          }

          .float-two {
            animation: floatTwo 8s ease-in-out infinite;
          }

          .error-animation {
            animation: errorIn 0.25s ease-out;
          }
        `}
      </style>

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-[#DCE8F4] via-[#E5EEF6] to-[#EBF2F8] p-6">

        {/* Decorative blurred background shapes */}
        <div className="float-one absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#86A1B8]/20 blur-3xl" />

        <div className="float-two absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#364669]/15 blur-3xl" />

        {/* Login Card */}
        <div className="login-card-animation relative w-full max-w-md rounded-3xl border border-white/60 bg-white/75 p-8 shadow-[0_20px_60px_rgba(54,70,105,0.15)] backdrop-blur-xl">

          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mb-3 text-3xl font-bold tracking-tight text-[#3A4B75]">
              Payno
            </div>

            <h1 className="text-2xl font-bold text-[#1A1D1F]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#6F767E]">
              Sign in to access your dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1A1D1F]">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter username"
                autoComplete="username"
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-[#1A1D1F] placeholder:text-[#9A9FA5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1A1D1F]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#D9E1E8] bg-[#F4F6F9] px-4 py-3 text-[#1A1D1F] placeholder:text-[#9A9FA5] outline-none transition duration-300 focus:-translate-y-0.5 focus:border-[#3A4B75] focus:bg-white focus:ring-2 focus:ring-[#3A4B75]/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="error-animation rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-xl bg-[#3A4B75] px-4 py-3 font-semibold text-white shadow-lg shadow-[#3A4B75]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#364669] hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 rounded-xl bg-[#F7F9FC] p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#6F767E]">
              Demo Credentials
            </p>

            <div className="space-y-1 text-sm text-[#1A1D1F]">
              <p>
                <span className="font-medium">
                  Username:
                </span>{" "}
                emilys
              </p>

              <p>
                <span className="font-medium">
                  Password:
                </span>{" "}
                emilyspass
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;