import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import { register } from "../../utils/dataProvider/auth";
import useDocumentTitle from "../../utils/documentTitle";

const Register = () => {
  useDocumentTitle("Join CoffeePK - Register");

  const controller = React.useMemo(() => new AbortController(), []);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [error, setError] = React.useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  function registerHandler(e) {
    e.preventDefault();
    toast.dismiss();

    const valid = { email: "", password: "", phoneNumber: "" };
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const passRegex = /^(?=.*[0-9])(?=.*[a-z]).{8,}$/g;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

    // email validation
    if (!form.email) valid.email = "Please enter your email address";
    else if (!form.email.match(emailRegex))
      valid.email = "Please enter a valid email address";

    // password validation
    if (!form.password) valid.password = "Please enter your password";
    else if (form.password.length < 8)
      valid.password = "Password must be at least 8 characters";
    else if (!form.password.match(passRegex))
      valid.password = "Password must contain letters and numbers";

    // phone validation
    if (!form.phoneNumber) valid.phoneNumber = "Please enter your phone number";
    else if (!form.phoneNumber.match(phoneRegex))
      valid.phoneNumber = "Please enter a valid phone number";

    setError(valid);

    if (valid.email === "" && valid.password === "" && valid.phoneNumber === "") {
      setIsLoading(true);
      e.target.disabled = true;

      toast.promise(
        register(form.email, form.password, form.phoneNumber, controller).then(
          (res) => {
            e.target.disabled = false;
            setIsLoading(false);
            return res.data.msg;
          }
        ),
        {
          loading: "Creating your CoffeePK account...",
          success: () => {
            navigate("/auth/login", { replace: true });
            toast.success("Welcome to the CoffeePK family! ☕", {
              duration: 4000,
            });
            return "Registration successful! You can now sign in.";
          },
          error: ({ response }) => {
            setIsLoading(false);
            e.target.disabled = false;
            return response?.data?.msg || "Registration failed. Please try again.";
          },
        }
      );
    }
  }

  function onChangeForm(e) {
    return setForm({ ...form, [e.target.name]: e.target.value });
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
            Join CoffeePK Family
          </h2>
          <p className="text-amber-700/80">
            Create your account and start your premium coffee journey
          </p>
        </div>
      </header>

      <section className="mt-8">
        <form className="space-y-6 relative" onSubmit={registerHandler}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-amber-800 font-semibold text-sm uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={
                `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                (error.email ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
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
            <label htmlFor="password" className="text-amber-800 font-semibold text-sm uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={
                `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                (error.password ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
              }
              placeholder="Create a strong password"
              value={form.password}
              onChange={onChangeForm}
            />
            <div className="flex justify-between">
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
                {error.password || ""}
              </span>
              <span className="text-xs text-amber-600/60 mt-1">
                Min. 8 characters with letters & numbers
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-amber-800 font-semibold text-sm uppercase tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className={
                `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                (error.phoneNumber ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
              }
              placeholder="e.g. +92 300 1234567"
              value={form.phoneNumber}
              onChange={onChangeForm}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 h-4">
              {error.phoneNumber || ""}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold rounded-xl text-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group ${
              isLoading 
                ? "bg-gradient-to-r from-amber-500/70 to-amber-600/70 cursor-not-allowed" 
                : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            } text-white border border-amber-500/30`}
            onClick={registerHandler}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Create My CoffeePK Account</span>
              </>
            )}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-amber-700/70 font-medium">
                Already part of our coffee community?
              </span>
            </div>
          </div>

          <Link to="/auth/login" className="block">
            <button 
              type="button"
              className="w-full font-bold rounded-xl text-lg p-4 bg-gradient-to-r from-white/80 to-amber-50/80 hover:from-white hover:to-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200/50 hover:border-amber-300/70 shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Sign In to Existing Account</span>
            </button>
          </Link>

          {/* Benefits section */}
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-amber-50/60 to-white/60 border border-amber-200/30">
            <p className="text-sm font-semibold text-amber-800 mb-3">Why join CoffeePK?</p>
            <ul className="space-y-2 text-sm text-amber-700/80">
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span>Exclusive member discounts & offers</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span>Track your order history</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <span>Personalized coffee recommendations</span>
              </li>
            </ul>
            <p className="text-xs text-amber-600/60 mt-3 italic">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-amber-600 hover:text-amber-700 font-medium">
                Terms
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

export default Register;