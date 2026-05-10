import React from 'react';

const Modal = ({ isOpen, onClose, children, className, size = 'md' }) => {
  // Define size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-5xl'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-950/40 backdrop-blur-lg flex justify-center items-center z-[999] animate-fade-in"
          onClick={onClose}
        >
          <div className="global-px w-full flex justify-center items-center">
            <div
              className={`bg-gradient-to-b from-white/95 via-white/90 to-white/95 backdrop-blur-xl border border-amber-200/30 rounded-2xl shadow-2xl p-8 relative ${selectedSize} w-full animate-slide-up ${className}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Close button */}
              <button
                className="absolute -top-4 -right-4 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-white/50 z-10"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              {/* Modal content */}
              <div className="overflow-auto max-h-[calc(100vh-8rem)]">
                {children}
              </div>
              
              {/* Subtle bottom border for visual separation */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;