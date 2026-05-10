import React, { useState } from "react";

import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import { profileAction } from "../../redux/slices/profile.slice";
import { uinfoAct } from "../../redux/slices/userInfo.slice";
import { login } from "../../utils/dataProvider/auth";
import useDocumentTitle from "../../utils/documentTitle";

const Login = () => {
  const navigate = useNavigate();
  useDocumentTitle("Login to CoffeePK");

  const controller = React.useMemo(() => new AbortController(), []);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function loginHandler(e) {
    e.preventDefault();
    toast.dismiss();
    const valid = { email: "", password: "" };

    if (!form.email) valid.email = "Please enter your email address";
    if (!form.password) valid.password = "Please enter your password";

    setError({
      email: valid.email,
      password: valid.password,
    });

    if (valid.email == "" && valid.password == "" && !isLoading) {
      setIsLoading(true);
      toast.promise(
        login(form.email, form.password, form.rememberMe, controller).then(
          (res) => {
            dispatch(uinfoAct.assignToken(res.data.data.token));
            const { role } = jwtDecode(res.data.data.token);
            dispatch(uinfoAct.assignData({ role }));
            dispatch(
              profileAction.getProfileThunk({
                controller,
                token: res.data.data.token,
              })
            );
            return res.data.data.token;
          }
        ),
        {
          loading: () => {
            e.target.disabled = true;
            return "Brewing your login experience...";
          },
          success: () => {
            navigate("/products");
            toast.success("Welcome to CoffeePK! Your coffee journey begins ☕", {
              icon: "👋",
              duration: 4000,
            });
            return (
              <>
                Login successful!
                <br /> Welcome back, coffee lover
              </>
            );
          },
          error: () => {
            setIsLoading(false);
            e.target.disabled = false;
            return "Incorrect email or password. Please try again.";
          },
        }
      );
    }
  }

  function onChangeForm(e) {
    return setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  }

  function onCheck(e) {
    return setForm((form) => ({
      ...form,
      [e.target.name]: !form[e.target.name],
    }));
  }

  return (
    <>
      <header className="mb-12">
        <Link to="/" className="group">
          <div className="font-extrabold flex flex-row items-center gap-3 group">
            <img 
              src={icon} 
              alt="CoffeePK Logo" 
              width="36px" 
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent tracking-tight">
                CoffeePK
              </h1>
              <p className="text-xs text-amber-700/80 -mt-1 font-normal font-['Noto_Nastaliq_Urdu']">
                دل سے کفی، ہر سیپ میں کفی
              </p>
            </div>
          </div>
        </Link>
        <div className="mt-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-amber-700/80">
            Sign in to continue your coffee journey
          </p>
        </div>
      </header>

      <section className="mt-8">
        <form className="space-y-6 relative" onSubmit={loginHandler}>
          <div className="space-y-2">
            <label
              name="email"
              htmlFor="email"
              className="text-amber-800 font-semibold text-sm uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={
                `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                (error.email != "" ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
              }
              placeholder="you@example.com"
              value={form.email}
              onChange={onChangeForm}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
              {error.email || ""}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                name="password"
                htmlFor="password"
                className="text-amber-800 font-semibold text-sm uppercase tracking-wide"
              >
                Password
              </label>
              <Link
                to="/auth/forgotpass"
                className="text-sm text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className={
                `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                (error.password != "" ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
              }
              placeholder="Enter your password"
              value={form.password}
              onChange={onChangeForm}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
              {error.password || ""}
            </span>
          </div>

          <div className="flex items-center">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500/30 focus:ring-2"
                onChange={onCheck}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="remember" className="text-amber-700/90 font-medium">
                Remember me
              </label>
              <p className="text-xs text-amber-600/60 mt-0.5">
                Stay signed in on this device
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold rounded-xl text-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group ${
              isLoading 
                ? "bg-gradient-to-r from-amber-500/70 to-amber-600/70 cursor-not-allowed" 
                : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            } text-white border border-amber-500/30`}
            onClick={loginHandler}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In to Your Account</span>
              </>
            )}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-amber-700/70 font-medium">
                New to CoffeePK?
              </span>
            </div>
          </div>

          <Link to="/auth/register" className="block">
            <button 
              type="button"
              className="w-full font-bold rounded-xl text-lg p-4 bg-gradient-to-r from-white/80 to-amber-50/80 hover:from-white hover:to-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200/50 hover:border-amber-300/70 shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Create New Account</span>
            </button>
          </Link>

          {/* Additional info */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-50/50 to-white/50 border border-amber-200/30">
            <p className="text-center text-sm text-amber-700/80">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-amber-600 hover:text-amber-700 font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;