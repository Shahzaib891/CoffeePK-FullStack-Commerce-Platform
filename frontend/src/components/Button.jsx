import React from "react";

const Button = ({ children, className, variant = "default", ...props }) => {
  // Define base classes that apply to all buttons
  const baseClasses = "px-5 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/50";
  
  // Define variant-specific classes
  const variantClasses = {
    default: "border border-amber-200/50 bg-white/80 hover:bg-white text-amber-800 hover:text-amber-700 focus:ring-amber-300/50 backdrop-blur-sm shadow-sm hover:shadow",
    primary: "bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 text-white border border-amber-500/30 focus:ring-amber-400/50 backdrop-blur-sm shadow-sm hover:shadow-md",
    secondary: "bg-gradient-to-r from-amber-100/80 to-amber-50/80 hover:from-amber-200 hover:to-amber-100 text-amber-700 border border-amber-200/40 focus:ring-amber-300/50 backdrop-blur-sm shadow-sm hover:shadow",
    outline: "border-2 border-amber-300/70 bg-transparent hover:bg-amber-50/50 text-amber-700 hover:text-amber-800 focus:ring-amber-300/50 backdrop-blur-sm",
    ghost: "bg-transparent hover:bg-amber-50/50 text-amber-700 hover:text-amber-800 border border-transparent hover:border-amber-200/30 focus:ring-amber-300/50"
  };

  // Get the appropriate variant classes
  const variantClass = variantClasses[variant] || variantClasses.default;

  return (
    <button
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;