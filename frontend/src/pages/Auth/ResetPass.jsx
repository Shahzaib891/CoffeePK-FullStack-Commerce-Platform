import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import notfoundImage from "../../assets/images/empty-box.svg";
import loadingImage from "../../assets/images/loading.svg";
import icon from "../../assets/jokopi.svg";
import { resetPass, verifyResetPass } from "../../utils/dataProvider/auth";

function ResetPass() {
  const [error, setError] = useState("");
  const [pass, setPass] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    return setPass(e.target.value);
  }

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    verifyResetPass(
      searchParams.get("verify"),
      searchParams.get("code"),
      controller
    )
      .then((res) => {
        setIsLoading(false);
      })
      .catch((res) => {
        setIsLoading(false);
        setIsNotFound(true);
      });
  }, []);

  const Loading = (props) => {
    return (
      <main className="min-h-[60vh] flex items-center justify-center flex-col backdrop-blur-sm bg-gradient-to-b from-white/20 to-amber-50/10">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/30 to-amber-100/20 rounded-full blur-xl animate-pulse"></div>
          <img 
            src={loadingImage} 
            alt="Verifying..." 
            className="relative w-20 h-20 md:w-24 md:h-24 animate-spin-slow"
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-amber-700/80 font-medium text-lg mb-2">
            Verifying your reset link...
          </p>
          <p className="text-amber-600/60 text-sm">
            Please wait while we prepare your password reset
          </p>
        </div>
      </main>
    );
  };

  const NotFound = (props) => {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center backdrop-blur-sm bg-gradient-to-b from-white/20 to-amber-50/10 p-6">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/20 to-amber-100/10 rounded-full blur-xl"></div>
          <img src={notfoundImage} alt="Link Expired" className="relative w-64 md:w-72" />
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3">
            Reset Link Expired
          </h2>
          <p className="text-amber-700/80 mb-6">
            This password reset link has expired or is no longer valid.
          </p>
          <p className="text-amber-600/60 text-sm mb-8">
            For security reasons, password reset links are only valid for a limited time.
          </p>
          <Link 
            to="/auth/forgotpass" 
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Request New Reset Link
          </Link>
        </div>
      </main>
    );
  };

  function resetPassHandler(e) {
    e.preventDefault();
    toast.dismiss();

    let err = "";
    if (pass.length < 8) {
      err = "Password must be at least 8 characters";
    }
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(pass)) {
      err = "Password must contain both letters and numbers";
    }
    setError(err);
    
    if (!isLoading && err.length < 1) {
      setIsLoading(true);
      e.target.disabled = true;
      const controller = new AbortController();
      toast.promise(
        resetPass(
          searchParams.get("verify"),
          searchParams.get("code"),
          pass,
          controller
        ).then((res) => {
          e.target.disabled = false;
          setIsLoading(false);
          navigate("/auth/login", { replace: true });
          return res.data;
        }),
        {
          loading: "Updating your password securely...",
          success: () => {
            toast.success("Password updated successfully! ☕", {
              duration: 4000,
            });
            return "Your password has been reset successfully";
          },
          error: (err) => {
            e.target.disabled = false;
            setIsLoading(false);
            if (err.response) return err.response?.data?.msg || "Failed to reset password";
            return err.message || "An error occurred";
          },
        }
      );
    }
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
      </header>
      
      {isNotFound ? (
        <NotFound />
      ) : isLoading ? (
        <Loading />
      ) : (
        <section className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 mb-4 border border-amber-200/50">
              <svg 
                className="w-8 h-8 text-amber-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
              Set New Password
            </h2>
            <p className="text-amber-700/80">
              Create a strong new password to secure your CoffeePK account
            </p>
          </div>

          <form className="space-y-6" onSubmit={resetPassHandler}>
            <div className="space-y-3">
              <label htmlFor="pass" className="text-amber-800 font-semibold text-sm uppercase tracking-wide block">
                New Password
              </label>
              <input
                type="password"
                name="pass"
                id="pass"
                className={
                  `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                  (error !== "" ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
                }
                placeholder="Enter your new password"
                value={pass}
                onChange={handleChange}
              />
              <div className="flex justify-between items-start">
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {error !== "" ? error : ""}
                </span>
                <div className="text-right">
                  <p className="text-xs text-amber-600/60">
                    Minimum 8 characters
                  </p>
                  <p className="text-xs text-amber-600/60">
                    Letters and numbers required
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/60 to-white/60 border border-amber-200/30">
              <p className="text-sm font-semibold text-amber-800 mb-2">Password Tips:</p>
              <ul className="space-y-1 text-sm text-amber-700/80">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
                  <span>Use a combination of uppercase and lowercase letters</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
                  <span>Include numbers and special characters</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
                  <span>Avoid common words or personal information</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold rounded-xl text-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group ${
                isLoading 
                  ? "bg-gradient-to-r from-amber-500/70 to-amber-600/70 cursor-not-allowed" 
                  : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
              } text-white border border-amber-500/30`}
              onClick={resetPassHandler}
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
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Set New Password</span>
                </>
              )}
            </button>

            <div className="text-center pt-4 border-t border-amber-200/30">
              <p className="text-sm text-amber-700/70">
                Remember your password?{" "}
                <Link 
                  to="/auth/login" 
                  className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default ResetPass;