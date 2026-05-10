import React from "react";

import { NavLink } from "react-router-dom";

import lostImage from "../../assets/images/not_found.svg";

function ProductNotFound() {
  return (
    <section className="w-full min-h-[80vh] flex justify-center items-center flex-col gap-12 text-center py-8 px-4 backdrop-blur-sm bg-gradient-to-b from-white/20 to-amber-50/10">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-amber-200/20 to-amber-100/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-amber-300/15 to-amber-200/10 rounded-full blur-xl"></div>
        
        {/* Main image with container */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/60 to-amber-50/40 backdrop-blur-sm border border-amber-200/30 shadow-xl">
          <img 
            src={lostImage} 
            alt="Product not found" 
            className="h-64 md:h-72 w-auto mx-auto"
          />
          
          {/* Floating coffee bean elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-amber-600/80 to-amber-700/80 rounded-full shadow-md animate-bounce-slow"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-r from-amber-500/80 to-amber-600/80 rounded-full shadow-md animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-6 max-w-lg">
        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Coffee Blend Not Found
          </h2>
          <p className="text-amber-700/80 text-lg">
            This premium coffee selection seems to be unavailable at the moment.
          </p>
          <p className="text-amber-600/60 text-sm font-['Noto_Nastaliq_Urdu']">
            یہ کفی کا انتخاب فی الحال دستیاب نہیں ہے
          </p>
        </div>
        
        {/* Action button */}
        <div className="mt-4">
          <NavLink to={"/products/"}>
            <button className="group relative px-12 py-4 rounded-2xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
              <div className="flex items-center justify-center gap-3">
                <svg 
                  className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                <span>Explore Our Coffee Collection</span>
                <svg 
                  className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </div>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </NavLink>
          
          {/* Alternative suggestion */}
          <div className="mt-6">
            <p className="text-amber-700/70 text-sm mb-3">
              While you&apos;re here, why not try one of these?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-100/60 to-amber-50/60 text-amber-700/80 text-sm border border-amber-200/40">Premium Arabica</span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-100/60 to-amber-50/60 text-amber-700/80 text-sm border border-amber-200/40">Specialty Blends</span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-100/60 to-amber-50/60 text-amber-700/80 text-sm border border-amber-200/40">Seasonal Coffee</span>
            </div>
          </div>
        </div>
        
        {/* Decorative separator */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
          <span className="text-amber-600/40 text-xs">☕</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
        </div>
        
        {/* Help text */}
        <p className="text-amber-600/50 text-sm italic">
          Can&apos;t find what you&apos;re looking for? 
          <a href="/contact" className="text-amber-700/80 hover:text-amber-600 font-medium ml-1 transition-colors duration-200">
            Contact our coffee experts →
          </a>
        </p>
      </div>
    </section>
  );
}

export default ProductNotFound;