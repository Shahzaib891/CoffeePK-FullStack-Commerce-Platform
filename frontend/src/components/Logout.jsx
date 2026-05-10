import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { contextAct } from "../redux/slices/context.slice";
import { profileAction } from "../redux/slices/profile.slice";
import { uinfoAct } from "../redux/slices/userInfo.slice";
import { logoutUser } from "../utils/dataProvider/auth";
import Modal from "./Modal";

function Logout() {
  const context = useSelector((state) => state.context);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (isLoading) return;
    setLoading(true);
    logoutUser(userInfo.token)
      .then((result) => {
        dispatch(uinfoAct.dismissToken());
        dispatch(contextAct.closeLogout());
        profileAction.reset();
        toast.success("See you soon, coffee lover! ☕", {
          icon: "👋",
          duration: 3000,
        });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Couldn't log out. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onClose = () => {
    if (isLoading) return;
    dispatch(contextAct.closeLogout());
  };
  
  return (
    userInfo.token && (
      <Modal isOpen={context.logout} onClose={onClose} size="sm">
        <div className="text-center p-2">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-100/50 to-amber-50/50 flex items-center justify-center border border-amber-200/30 backdrop-blur-sm">
                <svg 
                  className="w-8 h-8 text-amber-700/80" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-300/30 animate-ping"></div>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-amber-900 mb-2">
            Ready to take a break?
          </h3>
          
          {/* Message */}
          <p className="text-amber-700/80 mb-6 leading-relaxed">
            Are you sure you want to logout? 
            <span className="block text-sm text-amber-600/60 mt-1 font-['Noto_Nastaliq_Urdu']">
              کافی کا وقفہ چاہتے ہیں؟
            </span>
          </p>
          
          {/* Buttons */}
          <section className="flex flex-row gap-4 justify-center">
            <button
              onClick={logoutHandler}
              disabled={isLoading}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                isLoading 
                  ? "bg-gradient-to-r from-amber-500/70 to-amber-600/70 cursor-not-allowed" 
                  : "bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 hover:shadow-md"
              } text-white border border-amber-500/30 shadow-sm backdrop-blur-sm`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span>Yes, Logout</span>
                </>
              )}
            </button>
            
            <button
              className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-white/80 to-amber-50/80 hover:from-white hover:to-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-200 shadow-sm hover:shadow backdrop-blur-sm"
              onClick={onClose}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>No, Stay</span>
              </div>
            </button>
          </section>
          
          {/* Helper text */}
          <p className="text-xs text-amber-600/50 mt-6 italic">
            You can always come back for more coffee! ☕
          </p>
        </div>
      </Modal>
    )
  );
}

export default Logout;