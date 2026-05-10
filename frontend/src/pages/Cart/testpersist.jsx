import React, { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { uinfoAct } from '../../redux/slices/userInfo.slice';

function TokenTester() {
  const token = useSelector((state) => state.userInfo);
  const [input, setInput] = useState(token.token);
  const dispatch = useDispatch();
  
  const handlerAct = (e) => {
    if (e.key === "Enter") {
      dispatch(uinfoAct.assignToken(e.target.value));
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-amber-800/15 to-amber-700/10 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <div className="global-px py-16 relative z-10">
          <section className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-4xl lg:text-5xl mb-4">
                Developer Tools
              </h1>
              <p className="text-amber-700/90 dark:text-amber-400/90 font-['Noto_Nastaliq_Urdu'] text-xl mb-2">
                ٹوکن مینجمنٹ
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your authentication token for testing purposes
              </p>
            </div>

            {/* Current Token Display */}
            <section className="bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                    </svg>
                  </div>
                  Current Token
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your current authentication token is displayed below. Update it by entering a new token in the input field.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50/80 to-amber-100/60 dark:from-base-300/70 dark:to-base-400/50 p-5 rounded-2xl border border-amber-200/50 dark:border-amber-700/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Token Value</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-700/20 text-amber-700 dark:text-amber-400 font-medium">
                    {token.token ? 'Active' : 'Not Set'}
                  </span>
                </div>
                <div className="p-4 bg-white/90 dark:bg-base-400/30 rounded-xl border border-gray-300/50 dark:border-base-500/50">
                  <code className="text-sm text-gray-800 dark:text-gray-200 break-all font-mono">
                    {token.token || 'No token set'}
                  </code>
                </div>
                {token.token && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Token length: {token.token.length} characters
                  </p>
                )}
              </div>
            </section>

            {/* Token Input Section */}
            <section className="bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  Update Token
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Enter a new JWT token below and press Enter to update. This will change your authentication state.
                </p>
                <p className="text-amber-700/80 dark:text-amber-400/80 text-sm font-['Noto_Nastaliq_Urdu']">
                  نیا ٹوکن درج کریں
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    className="w-full bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-6 py-4 rounded-2xl border-2 border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-lg/40 transition-all duration-300 outline-none text-lg"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handlerAct}
                    placeholder="Paste your JWT token here and press Enter..."
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-700/20">
                      <kbd className="text-xs font-mono text-amber-700 dark:text-amber-400">Enter</kbd>
                      <svg className="w-4 h-4 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Press <kbd className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs font-mono mx-1">Enter</kbd> to save changes
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (input.trim()) {
                        dispatch(uinfoAct.assignToken(input));
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                    </svg>
                    Save Token
                  </button>
                </div>
              </div>

              {/* Information Card */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-blue-100/60 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Token Information</h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        This is a developer tool for testing authentication
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        Tokens should be valid JWT format
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        Changes affect your current session
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setInput('')}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-base-300 dark:to-base-400 hover:from-gray-200 hover:to-gray-400 dark:hover:from-base-400 dark:hover:to-base-500 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-300/60 dark:border-base-400/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Clear Input
              </button>
              
              <button
                onClick={() => dispatch(uinfoAct.assignToken(''))}
                className="px-6 py-3 bg-gradient-to-r from-red-500/10 to-red-700/10 hover:from-red-500/20 hover:to-red-700/20 text-red-700 dark:text-red-400 font-medium rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 border border-red-300/50 dark:border-red-700/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Clear Token
              </button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

export default TokenTester;