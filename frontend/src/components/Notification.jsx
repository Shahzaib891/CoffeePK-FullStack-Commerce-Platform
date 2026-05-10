import React from "react";

import { toast, ToastBar, Toaster } from "react-hot-toast";

export const Notification = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          padding: "16px 20px",
          background: "linear-gradient(135deg, rgba(212, 165, 116, 0.95), rgba(180, 140, 96, 0.95))",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212, 165, 116, 0.3)",
          boxShadow: "0 10px 25px -5px rgba(106, 64, 41, 0.2), 0 8px 10px -6px rgba(106, 64, 41, 0.1)",
          fontWeight: 500,
          fontSize: "15px",
          color: "white",
          borderRadius: "14px",
          maxWidth: "420px",
          minWidth: "320px",
        },
        success: {
          style: {
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(22, 163, 74, 0.95))",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.2)",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#22c55e",
          },
        },
        error: {
          style: {
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.2)",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ef4444",
          },
        },
        loading: {
          style: {
            background: "linear-gradient(135deg, rgba(107, 114, 128, 0.95), rgba(75, 85, 99, 0.95))",
            border: "1px solid rgba(107, 114, 128, 0.3)",
            boxShadow: "0 10px 25px -5px rgba(75, 85, 99, 0.2)",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  {icon}
                </div>
                <div className="flex-1">
                  {message}
                </div>
              </div>
              
              {t.type !== "loading" && (
                <button 
                  onClick={() => toast.dismiss(t.id)}
                  className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Dismiss notification"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200 group-hover:scale-110"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-80"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-80"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};