import React from 'react';

import { Outlet } from 'react-router-dom';

import AuthFooter from '../../components/AuthFooter';

const Auth = () => {
  return (
    <>
      <main>
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Enhanced with premium effects */}
          <section className="w-0 min-h-screen lg:w-1/2 lg:block hidden bg-cover bg-center bg-main relative overflow-hidden">
            {/* Original background image layer */}
            <div className="fixed w-1/2 bg-cover bg-center bg-main z-10 h-screen"></div>
            
            {/* Premium gradient overlay - subtle enhancement */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-amber-800/20 z-20"></div>
            
            {/* Animated coffee elements - decorative only */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-amber-400/10 to-amber-300/5 rounded-full blur-2xl animate-pulse-slow z-30"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-amber-500/8 to-amber-400/4 rounded-full blur-2xl animate-pulse-slow z-30" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Premium text overlay - doesn't affect forms */}
            <div className="absolute bottom-12 left-0 right-0 z-40 px-8 text-center">
              <p className="text-white/90 text-sm font-light tracking-wide">
                Pakistan&apos;s Premium Coffee Experience
              </p>
              <p className="text-amber-200/80 text-xs mt-1 font-['Noto_Nastaliq_Urdu']">
                دل سے کفی، ہر سیپ میں کفی
              </p>
            </div>
          </section>
          
          {/* Right Section - EXACTLY AS IT WAS - NO CHANGES */}
          <section className="lg:w-1/2 bg-main bg-cover bg-center bg-black/70 lg:bg-white lg:bg-none lg:text-black">
            <div className="global-px py-7 lg:px-16 flex justify-start md:justify-center flex-col min-h-screen">
              <div className="bg-white px-5 py-6 lg:p-0 rounded-xl md:min-h-screen">
                <Outlet />
              </div>
            </div>
            <AuthFooter />
          </section>
        </div>
      </main>
    </>
  );
};

export default Auth;