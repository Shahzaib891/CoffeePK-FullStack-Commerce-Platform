import React from 'react';

import { NavLink } from 'react-router-dom';

import notfoundImage from '../../assets/images/empty-box.svg';

export default function NotFound() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay - Same pattern as other pages */}
      <div className="absolute inset-0 bg-cart bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-700/10 dark:from-base-100/95 dark:to-base-200/95"></div>
      
      <div className="relative z-10 w-full max-w-4xl px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Illustration Section */}
          <div className="flex-1 relative">
            <div className="relative">
              <img 
                src={notfoundImage} 
                alt="Page Not Found" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
              {/* Decorative gradient circles */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-amber-500/20 to-amber-700/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-amber-600/15 to-amber-800/10 rounded-full blur-2xl"></div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="space-y-3">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-100">
                Oops! Page Not Found
              </h2>
              <p className="text-amber-700/80 dark:text-amber-300/80 text-lg max-w-md">
                It seems like the page you&apos;re looking for doesn&apos;t exist or has been moved.
                Don&apos;t worry, let&apos;s get you back to your coffee journey!
              </p>
              <p className="text-sm text-amber-600/60 dark:text-amber-400/60 font-['Noto_Nastaliq_Urdu'] mt-2">
                معاف کیجئے گا، یہ صفحہ موجود نہیں ہے
              </p>
            </div>
            
            {/* Suggestions */}
            <div className="bg-white/80 dark:bg-base-200/80 backdrop-blur-xl rounded-2xl p-6 border border-amber-200/40 dark:border-amber-800/30 shadow-lg/30 max-w-md">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-3">You might be looking for:</h3>
              <ul className="space-y-3 text-left">
                {[
                  { path: "/", label: "Home Page", desc: "Discover premium coffee" },
                  { path: "/products", label: "Our Products", desc: "Browse coffee collection" },
                  { path: "/about", label: "About Us", desc: "Learn our story" },
                  { path: "/contact", label: "Contact", desc: "Get in touch" }
                ].map((item, idx) => (
                  <li key={idx} className="group">
                    <NavLink 
                      to={item.path}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r from-amber-50/80 to-transparent dark:hover:from-base-300/80 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-amber-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300">
                          {item.label}
                        </span>
                        <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
                          {item.desc}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <NavLink 
                to="/" 
                className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="relative">
                  Back to Home
                  <span className="block text-amber-200/90 text-sm font-normal font-['Noto_Nastaliq_Urdu'] mt-0.5">
                    (گھر واپس جائیں)
                  </span>
                </span>
              </NavLink>
              
              <NavLink 
                to="/products" 
                className="group px-8 py-4 bg-gradient-to-r from-white/90 to-amber-50/80 dark:from-base-300/90 dark:to-base-400/80 hover:from-amber-50 hover:to-amber-100 dark:hover:from-base-400 dark:hover:to-base-500 text-amber-800 dark:text-amber-200 font-bold rounded-2xl border border-amber-300/60 dark:border-amber-700/40 shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                Explore Products
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coffee Illustration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
        <div className="text-8xl mb-8">☕</div>
      </div>
    </main>
  );
}