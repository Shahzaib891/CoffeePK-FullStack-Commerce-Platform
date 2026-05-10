import React from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const PromoNotFound = (props) => {
  return (
    <section className="w-full min-h-[80vh] flex justify-center items-center flex-col gap-12 text-center py-8 px-4 backdrop-blur-sm bg-gradient-to-b from-white/20 to-orange-50/10">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-orange-200/20 to-amber-100/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-orange-300/15 to-amber-200/10 rounded-full blur-xl"></div>
        
        {/* Main icon container */}
        <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/60 to-orange-50/40 backdrop-blur-sm border border-orange-200/30 shadow-xl">
          {/* Megaphone icon */}
          <div className="relative">
            <svg 
              className="w-40 h-40 text-orange-500/90 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" 
              />
            </svg>
            
            {/* Discount tag */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500/90 to-orange-600/90 rounded-full flex items-center justify-center shadow-lg rotate-12 animate-pulse-slow">
                  <span className="text-white font-bold text-lg">%</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-red-600 text-xs font-bold">?</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-orange-500/80 to-amber-600/80 rounded-full shadow-md animate-bounce-slow"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500/80 to-orange-600/80 rounded-full shadow-md animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-6 max-w-lg">
        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            Promotion Not Available
          </h2>
          <p className="text-amber-700/80 text-lg">
            This special offer seems to have expired or is no longer active.
          </p>
          <p className="text-orange-600/60 text-sm font-['Noto_Nastaliq_Urdu']">
            یہ خصوصی آفر ختم ہو گئی ہے یا دستیاب نہیں ہے
          </p>
        </div>
        
        {/* Action button */}
        <div className="mt-4">
          <NavLink to={"/products/"}>
            <button className="group relative px-12 py-4 rounded-2xl bg-gradient-to-r from-orange-600/90 to-amber-600/90 hover:from-orange-700 hover:to-amber-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
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
                <span>Explore Current Offers</span>
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
              Don&apos;t worry! Check out these ongoing promotions:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-100/60 to-amber-50/60 text-orange-700/80 text-sm border border-orange-200/40 shadow-sm">Weekend Special</span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-100/60 to-amber-50/60 text-orange-700/80 text-sm border border-orange-200/40 shadow-sm">Buy 1 Get 1</span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-100/60 to-amber-50/60 text-orange-700/80 text-sm border border-orange-200/40 shadow-sm">Member Discount</span>
            </div>
          </div>
        </div>
        
        {/* Decorative separator */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent"></div>
          <span className="text-orange-600/40 text-xs">🎯</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent"></div>
        </div>
        
        {/* Help text */}
        <div className="space-y-2">
          <p className="text-amber-600/50 text-sm italic">
            Promotions update frequently. Check back soon for new offers!
          </p>
          {props.userInfo.token && Number(props.userInfo.role) > 1 && (
            <NavLink 
              to="/promo/new"
              className="inline-block px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500/90 to-purple-600/90 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-medium shadow-sm hover:shadow transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Create New Promotion</span>
              </div>
            </NavLink>
          )}
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-orange-300/20 to-transparent"></div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PromoNotFound);