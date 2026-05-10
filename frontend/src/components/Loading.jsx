import React from "react";

import loadingImage from "../assets/images/loading.svg";

function Loading() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center flex-col backdrop-blur-sm bg-gradient-to-b from-white/20 to-amber-50/10">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/30 to-amber-100/20 rounded-full blur-xl animate-pulse"></div>
        
        {/* Main loading image */}
        <img 
          src={loadingImage} 
          alt="Loading..." 
          className="relative w-24 h-24 md:w-32 md:h-32 animate-spin-slow"
        />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full shadow-sm"></div>
      </div>
      
      {/* Loading text with animation */}
      <div className="mt-8 text-center">
        <p className="text-amber-700/80 font-medium text-lg mb-2">
          Preparing your coffee experience...
        </p>
        <p className="text-amber-600/60 text-sm font-['Noto_Nastaliq_Urdu']">
          براہ کرم انتظار کریں
        </p>
        <p className="text-amber-500/50 text-xs mt-1 italic">
          Please wait while we brew something special
        </p>
      </div>
      
      {/* Progress dots animation */}
      <div className="mt-6 flex space-x-2">
        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </section>
  );
}

export default Loading;