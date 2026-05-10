import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import fbLogo from '../assets/icons/facebook.svg';
import igLogo from '../assets/icons/instagram.svg';
import twLogo from '../assets/icons/twitter.svg';
import logo from '../assets/jokopi.svg';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-gradient-to-b from-amber-50/95 to-amber-100/90 backdrop-blur-sm border-t border-amber-200/30 text-amber-800/90">
        <div className="global-px">
          <div className="py-5 md:py-12"></div>
          <div className="flex flex-col-reverse gap-10 md:flex-row">
            <div className="flex flex-col gap-5 md:flex-[2_2_0%]">
              <Link to="/">
                <div className="font-extrabold flex flex-row items-center gap-3 group">
                  <img 
                    src={logo} 
                    alt="CoffeePK Logo" 
                    width="34px" 
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="text-left">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent tracking-tight">
                      CoffeePK
                    </h1>
                    <p className="text-xs text-amber-700/80 -mt-1 font-normal font-['Noto_Nastaliq_Urdu']">
                      دل سے کافی، ہر سیپ میں کافی
                    </p>
                  </div>
                </div>
              </Link>
              <div className="md:w-80 text-amber-700/80 text-sm leading-relaxed">
                CoffeePK is Pakistan&apos;s premium coffee experience, offering high quality beans 
                and authentic coffee blends that celebrate our rich coffee culture.
              </div>
              <div className="flex flex-row gap-4">
                <a
                  href="#"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-600 hover:to-amber-700 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm hover:shadow group"
                >
                  <img src={fbLogo} alt="Facebook" className="group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-600 hover:to-amber-700 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm hover:shadow group"
                >
                  <img src={igLogo} alt="Instagram" className="group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 hover:from-amber-600 hover:to-amber-700 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm hover:shadow group"
                >
                  <img src={twLogo} alt="Twitter" width="18px" className="group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
              <div className="copyright text-amber-700/70 text-sm">
                © 2025 CoffeePK • Pakistan ki premium coffee
              </div>
            </div>
            <nav className="flex flex-row gap-10 md:flex-1">
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <h4 className="font-bold text-amber-800">Product</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Download
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Pricing
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Locations
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Countries
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Blog
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <h4 className="font-bold text-amber-800">Engage</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Coffee Shop
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      FAQ
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      About Us
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Privacy Policy
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700/80 hover:text-amber-600 transition-colors duration-200 text-sm"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="py-6 md:py-10"></div>
          <div className="border-t border-amber-200/30 py-4 text-center text-amber-700/60 text-xs">
            <p>Welcome to CoffeePK • Your premium coffee journey begins here</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;