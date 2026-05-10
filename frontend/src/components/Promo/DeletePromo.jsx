import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePromoEntry } from "../../utils/dataProvider/promo";
import Modal from "../Modal";

function DeletePromo({ isOpen, onClose, promoId, userInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const navigate = useNavigate();
  
  const yesHandler = () => {
    if (isLoading) return;
    setIsLoading(true);
    deletePromoEntry(promoId, userInfo.token, controller)
      .then(() => {
        navigate("/products", { replace: true });
        toast.success("Promotion removed successfully", {
          icon: "🎯",
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Couldn&apos;t delete promotion. Please try again.");
      })
      .finally(() => setIsLoading(false));
  };
  
  const closeHandler = () => {
    if (isLoading) return;
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={closeHandler} size="sm">
      <div className="text-center p-2">
        {/* Warning Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-orange-100/50 to-amber-50/50 flex items-center justify-center border-2 border-orange-200/30 backdrop-blur-sm">
              <svg 
                className="w-10 h-10 text-orange-500/90" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                />
              </svg>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border-2 border-orange-300/40 animate-pulse-slow"></div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-amber-900 mb-3">
          Remove Promotion?
        </h3>
        
        {/* Message */}
        <p className="text-amber-700/80 mb-4 leading-relaxed">
          Are you sure you want to delete this promotional offer from your store?
        </p>
        
        {/* Warning Box */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-50/60 to-amber-50/60 border border-orange-200/30 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-500/90 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-orange-700/80 font-medium">
              This action cannot be undone. Customers will no longer see this promotion.
              <span className="block text-xs text-orange-600/60 mt-1 font-['Noto_Nastaliq_Urdu']">
                یہ پروموشن صارفین کو نظر نہیں آئے گی
              </span>
            </p>
          </div>
        </div>
        
        {/* Buttons */}
        <section className="flex flex-row gap-4 justify-center">
          <button
            onClick={yesHandler}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center ${
              isLoading 
                ? "bg-gradient-to-r from-orange-500/70 to-orange-600/70 cursor-not-allowed" 
                : "bg-gradient-to-r from-orange-600/90 to-orange-700/90 hover:from-orange-700 hover:to-orange-800 hover:shadow-md"
            } text-white border border-orange-500/30 shadow-sm backdrop-blur-sm`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Removing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span>Yes, Remove</span>
              </>
            )}
          </button>
          
          <button
            className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-white/80 to-amber-50/80 hover:from-white hover:to-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-200 shadow-sm hover:shadow backdrop-blur-sm min-w-[120px] flex items-center gap-2 justify-center"
            onClick={closeHandler}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span>No, Keep</span>
          </button>
        </section>
        
        {/* Helper text */}
        <p className="text-xs text-amber-600/50 mt-6 italic">
          Consider updating the promo instead if it needs changes.
        </p>
        
        {/* Promo impact info */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-50/40 to-white/40 border border-amber-200/20">
          <p className="text-xs text-amber-700/70">
            <span className="font-medium">Impact:</span> This will affect all customers viewing this promotion.
          </p>
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePromo);