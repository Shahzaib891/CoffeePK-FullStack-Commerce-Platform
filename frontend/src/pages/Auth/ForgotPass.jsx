import React, { useEffect, useState } from "react";

import { now } from "lodash";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import icon from "../../assets/jokopi.svg";
import { forgotPass } from "../../utils/dataProvider/auth";
import useDocumentTitle from "../../utils/documentTitle";

const ForgotPass = () => {
  useDocumentTitle("Reset Password - CoffeePK");

  const controller = React.useMemo(() => new AbortController(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = useState("");
  const [resend, setResend] = useState(0);
  const [displaycd, setDisplaycd] = useState("");

  function forgotPassHandler(e) {
    e.preventDefault();
    toast.dismiss();

    setResend(now() + 2 * 60 * 1000); // now + 2 minutes
    let err = "";
    if (email.length < 1) {
      err = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err = "Please enter a valid email address";
    }
    setError(err);
    
    if (!isLoading && err.length < 1) {
      setIsLoading(true);
      e.target.disabled = true;
      toast.promise(
        forgotPass(email, controller).then((res) => {
          setResend(now() + 2 * 60 * 1000); // now + 2 minutes
          e.target.disabled = false;
          setIsLoading(false);
          return res.data;
        }),
        {
          loading: "Sending reset instructions to your email...",
          success: () => {
            toast.success("Check your email for reset instructions! 📧", {
              duration: 5000,
            });
            return "Password reset link sent successfully!";
          },
          error: (err) => {
            e.target.disabled = false;
            setIsLoading(false);
            return err.response?.data?.msg || "Failed to send reset email. Please try again.";
          },
        }
      );
    }
  }

  function countdownFormat(ms) {
    const time = new Date(ms).toISOString().substr(14, 5);
    const timeFormat = time.replace(":", ".");
    return timeFormat;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (resend > 0 && resend > now()) {
        const newSec = resend - 1000;
        setResend(newSec);
        setDisplaycd(countdownFormat(newSec - now()));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resend]);

  function handleChange(e) {
    return setEmail(e.target.value);
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
      
      <section className="max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 mb-4 border border-amber-200/50">
            <svg 
              className="w-8 h-8 text-amber-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3">
            Reset Your Password
          </h2>
          <p className="text-amber-700/80">
            Enter your email and we&apos;ll send you instructions to reset your password
          </p>
        </div>

        <form className="space-y-6" onSubmit={forgotPassHandler}>
          <div className="space-y-3">
            <label htmlFor="email" className="text-amber-800 font-semibold text-sm uppercase tracking-wide block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={
                `border-amber-200/60 bg-white/50 backdrop-blur-sm rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 placeholder-amber-500/50` +
                (error !== "" ? " border-red-400 focus:border-red-400 focus:ring-red-400/30" : "")
              }
              placeholder="you@example.com"
              value={email}
              onChange={handleChange}
            />
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {error !== "" ? error : ""}
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
            onClick={forgotPassHandler}
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
                <span>Sending Instructions...</span>
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send Reset Instructions</span>
              </>
            )}
          </button>

          {resend >= now() ? (
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-amber-50/60 to-white/60 border border-amber-200/30 animate-slide-up">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <p className="text-amber-700/80">
                    Didn&apos;t receive the email? Check your spam folder or request a new link.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200/50">
                      <span className="text-amber-700 font-bold text-lg">{displaycd}</span>
                    </div>
                    <span className="text-sm text-amber-600/60">Time remaining</span>
                  </div>
                </div>
                
                <button
                  type="button"
                  disabled={resend >= now()}
                  onClick={forgotPassHandler}
                  className={`w-full font-bold rounded-xl p-4 transition-all duration-300 flex items-center justify-center gap-3 ${
                    resend >= now() 
                      ? "bg-gradient-to-r from-amber-100/60 to-amber-50/60 text-amber-600/60 cursor-not-allowed" 
                      : "bg-gradient-to-r from-white/80 to-amber-50/80 hover:from-white hover:to-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200/50 hover:border-amber-300/70 shadow-sm hover:shadow transform hover:-translate-y-0.5"
                  }`}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Resend Link</span>
                </button>
              </div>
            </div>
          ) : null}

          <div className="text-center pt-6 border-t border-amber-200/30">
            <p className="text-sm text-amber-700/70">
              Remember your password?{" "}
              <Link 
                to="/auth/login" 
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
            <p className="text-xs text-amber-600/50 mt-2">
              Need help?{" "}
              <Link 
                to="/contact" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default ForgotPass;