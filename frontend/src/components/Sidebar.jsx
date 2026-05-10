import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import placeholderProfile from "../assets/images/placeholder-profile.jpg";
import { contextAct } from "../redux/slices/context.slice";

function Sidebar({ onClose }) {
  const profile = useSelector((state) => state.profile);
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="h-full bg-gradient-to-b from-white/95 via-amber-50/90 to-amber-100/85 backdrop-blur-xl">
        <div className="p-6 flex flex-col h-full">
          {/* Header with Profile */}
          <div className="flex flex-row items-center mb-10 relative">
            <button
              className="absolute -right-2 -top-2 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-10 group focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close sidebar"
            >
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            
            <div
              className={`flex flex-row gap-x-5 items-center w-full ${
                userInfo.token && "cursor-pointer group"
              }`}
              onClick={() => userInfo.token && navigate("/profile")}
            >
              <div className="avatar relative">
                <div className="w-20 h-20 rounded-2xl ring-3 ring-gradient-to-r from-amber-300/50 to-amber-200/30 shadow-lg overflow-hidden backdrop-blur-sm">
                  <img
                    src={
                      userInfo.token && profile.isFulfilled && profile.data?.img
                        ? profile.data?.img
                        : placeholderProfile
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                {userInfo.token && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full border-3 border-white shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <div className="flex-col flex-1">
                {userInfo.token ? (
                  <>
                    <p className="font-bold text-xl text-amber-900 group-hover:text-amber-800 transition-colors duration-200">
                      {profile.data?.display_name || "Coffee Lover"}
                    </p>
                    <p className="text-sm text-amber-700/80 truncate mt-1">
                      {profile.data?.email || "user@example.com"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        Number(userInfo.role) > 1 
                          ? "bg-gradient-to-r from-purple-500/90 to-purple-600/90 text-white" 
                          : "bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-white"
                      }`}>
                        {Number(userInfo.role) > 1 ? "Admin" : "Premium Member"}
                      </span>
                      <span className="text-xs text-amber-600/60 font-['Noto_Nastaliq_Urdu']">
                        کافی پریمی
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-xl text-amber-900">
                      Welcome to CoffeePK
                    </p>
                    <p className="text-sm text-amber-700/80 mt-1">
                      Your premium coffee journey begins here
                    </p>
                    <p className="text-xs text-amber-600/60 mt-2 font-['Noto_Nastaliq_Urdu']">
                      آپ کی کافی کا سفر یہاں سے شروع ہوتا ہے
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
              <span className="text-xs font-semibold text-amber-700/70 uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100/50 backdrop-blur-sm">
                Navigation
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              {[
                { to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Home" },
                { to: "/products", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", label: "Products" },
                { to: "/cart", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", label: "Your Cart" },
                { to: "/history", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Order History" },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    className={({ isActive }) => 
                      `flex items-center p-4 text-sm font-semibold rounded-xl transition-all duration-200 group ${
                        isActive 
                          ? "bg-gradient-to-r from-amber-600/90 to-amber-700/90 text-white shadow-lg" 
                          : "text-amber-800/90 hover:text-amber-700 hover:bg-gradient-to-r hover:from-amber-50/70 hover:to-amber-100/50 border border-transparent hover:border-amber-200/40 shadow-sm hover:shadow"
                      }`
                    }
                    to={item.to}
                    onClick={onClose}
                  >
                    <svg className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                    </svg>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              
              {/* Admin Section */}
              {Number(userInfo.role) > 1 && (
                <>
                  <div className="flex items-center gap-2 mt-8 mb-4 px-1">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"></div>
                    <span className="text-xs font-semibold text-purple-700/70 uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100/50 backdrop-blur-sm">
                      Admin Panel
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"></div>
                  </div>
                  {[
                    { to: "/admin", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Dashboard" },
                    { to: "/manage-order", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Manage Orders" },
                    { to: "/products/new", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6", label: "Add Product" },
                    { to: "/promo/new", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Add Promo" },
                  ].map((item) => (
                    <li key={item.to}>
                      <NavLink
                        className={({ isActive }) => 
                          `flex items-center p-4 text-sm font-semibold rounded-xl transition-all duration-200 group ${
                            isActive 
                              ? "bg-gradient-to-r from-purple-600/90 to-purple-700/90 text-white shadow-lg" 
                              : "text-purple-800/90 hover:text-purple-700 hover:bg-gradient-to-r hover:from-purple-50/70 hover:to-purple-100/50 border border-transparent hover:border-purple-200/40 shadow-sm hover:shadow"
                          }`
                        }
                        to={item.to}
                        onClick={onClose}
                      >
                        <svg className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                        </svg>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          {/* Footer Section */}
          <div className="mt-auto pt-8 border-t border-amber-200/40">
            {userInfo.token ? (
              <button
                onClick={() => {
                  onClose();
                  dispatch(contextAct.openLogout());
                }}
                className="flex items-center justify-center w-full p-4 text-sm font-semibold rounded-xl transition-all duration-200 group bg-gradient-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            ) : (
              <div className="space-y-3">
                <NavLink
                  className="flex items-center justify-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 text-white shadow-md hover:shadow-lg"
                  to="/auth/login"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Login to Your Account
                </NavLink>
                <NavLink
                  className="flex items-center justify-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group bg-gradient-to-r from-white/80 to-amber-50/80 hover:from-white hover:to-amber-100 text-amber-800 hover:text-amber-900 border border-amber-200/50 hover:border-amber-300/70 shadow-sm hover:shadow"
                  to="/auth/register"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                  Join CoffeePK Family
                </NavLink>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
                <span className="px-4 text-xs text-amber-700/60 font-medium">دل سے کافی، ہر سیپ میں کافی</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
              </div>
              <p className="text-xs text-amber-700/60">
                <span>© 2025 CoffeePK • Pakistan&apos;s Premium Coffee Experience</span>
              </p>
              <p className="text-xs text-amber-600/40 mt-1">
                Every sip tells a story ☕
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;