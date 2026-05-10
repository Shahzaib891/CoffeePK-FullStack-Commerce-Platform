import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteProductEntry } from "../../utils/dataProvider/products";
import Modal from "../Modal";

function DeleteProduct({ isOpen, onClose, productId, userInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();
  const navigate = useNavigate();
  
  const yesHandler = () => {
    if (isLoading) return;
    setIsLoading(true);
    deleteProductEntry(productId, userInfo.token, controller)
      .then(() => {
        navigate("/products", { replace: true });
        toast.success("Product removed successfully", {
          icon: "🗑️",
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error("Couldn't delete product. Please try again.");
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
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-red-100/50 to-red-50/50 flex items-center justify-center border-2 border-red-200/30 backdrop-blur-sm">
              <svg 
                className="w-10 h-10 text-red-500/90" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border-2 border-red-300/40 animate-pulse-slow"></div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-amber-900 mb-3">
          Remove Product?
        </h3>
        
        {/* Message */}
        <p className="text-amber-700/80 mb-4 leading-relaxed">
          Are you sure you want to delete this product from your store?
        </p>
        
        {/* Warning Box */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-50/60 to-amber-50/60 border border-red-200/30 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500/90 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm text-red-700/80 font-medium">
              This action cannot be undone. The product will be permanently removed.
              <span className="block text-xs text-red-600/60 mt-1 font-['Noto_Nastaliq_Urdu']">
                یہ عمل واپس نہیں کیا جا سکتا
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
                ? "bg-gradient-to-r from-red-500/70 to-red-600/70 cursor-not-allowed" 
                : "bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-700 hover:to-red-800 hover:shadow-md"
            } text-white border border-red-500/30 shadow-sm backdrop-blur-sm`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span>Yes, Delete</span>
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
          Consider deactivating instead if you might need it later.
        </p>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);