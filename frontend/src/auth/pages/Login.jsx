import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 👇 IMPORT 'login' DIRECTLY (This was the missing piece)
import { login, authStore } from "../auth.store";

const Login = () => {
  const navigate = useNavigate();
  // We use authState for loading/error status, just like your LoginForm did
  const [authState, setAuthState] = useState(authStore.getState());

  // Local state for the inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = authStore.subscribe(setAuthState);
    return () => unsubscribe();
  }, []);

  // 🔥 REDIRECT ON SUCCESS
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authState.isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // 👇 EXACT LOGIC FROM YOUR LOGINFORM
    const payload = {
      email: email.trim(),
      password: password
    };

    login(payload);
  };

  return (
    // Outer Page Background (Soft Peach/Beige)
    <div className="min-h-screen w-full bg-[#fcece9] flex items-center justify-center p-4 md:p-8 font-sans">

      {/* Main Card Container (Dark Charcoal, Rounded) */}
      <div className="w-full max-w-6xl bg-[#1a2c2c] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Left Side: Branding */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-white font-bold text-xl tracking-wide">PERFORMANCE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#9ff0d4]">
            PERFOMANCE MANAGEMENT <br /> SYSTEM
          </h1>
        </div>

        {/* Right Side: Floating White Form Card */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-full max-w-[400px] shadow-lg">

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Error Alert (Using your store's error state) */}
              {authState.error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {authState.error}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">E-mail address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2c2c] focus:border-transparent transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a2c2c] focus:border-transparent transition-all placeholder-gray-400"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={authState.loading}
                className={`w-full text-white font-medium py-3.5 rounded-full transition-colors duration-200 shadow-md ${
                  authState.loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#1a2c2c] hover:bg-black"
                }`}
              >
                {authState.loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed px-2">
                By continuing, you agree to PERFORMANCE Terms of Service, Privacy Policy and Cookie Use.
              </p>

              <div className="text-sm space-y-2">
                <p>
                  <a href="/recover" className="text-gray-600 hover:text-gray-900 hover:underline">
                    Forgot your password? Recover &gt;
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;