import "react-loading-skeleton/dist/skeleton.css";

/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import { connect, useSelector } from "react-redux";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import penIcon from "../../assets/icons/icon-pen.svg";
import illustrationsPromo from "../../assets/illustrations/mobile-search-undraw.png";
import images from "../../assets/images/person-with-a-coffee.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getPromos } from "../../utils/dataProvider/promo";
import useDocumentTitle from "../../utils/documentTitle";
import GetAllProducts from "./GetAllProducts";

function Products(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [ddMenu, setDdmenu] = useState(false);
  const [sort, setSort] = useState(undefined);
  const [promo, setPromo] = useState([]);
  const [promoLoad, setPromoLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const controller = useMemo(() => new AbortController(), []);
  const [search, setSearch] = useState(
    searchParams.has("q") ? searchParams.get("q") : undefined
  );
  const { userInfo } = useSelector((state) => ({
    userInfo: state.userInfo,
  }));

  const toggleDdmenu = () => {
    setDdmenu(!ddMenu);
  };
  const navigate = useNavigate();

  const navigateWithParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) =>
      searchParams.set(key, value)
    );
    navigate(`${location.pathname}?${searchParams}`);
  };

  const navigateDeleteParams = (deleteParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(deleteParams).forEach(([key, value]) =>
      searchParams.delete(key)
    );
    navigate(`${location.pathname}?${searchParams}`);
  };

  const delayedSort = _.debounce((orderBy, sort) => {
    navigateWithParams({ orderBy, sort });
  }, 200);

  const delayedSearch = useCallback(
    _.debounce((q) => {
      navigateWithParams({ q });
    }, 1500),
    []
  );

  useEffect(() => {
    if (sort) {
      const currSort = sort.split("_", 2);
      delayedSort(currSort[0], currSort[1]);
    }
    return () => {};
  }, [sort]);

  useEffect(() => {
    if (search) {
      delayedSearch(search);
    } else {
      navigateDeleteParams({ q: null });
    }
  }, [search]);

  const fetchPromo = async () => {
    try {
      setPromoLoad(true);
      const result = await getPromos({ page: 1 }, controller);
      setPromo(result.data.data);
      setPromoLoad(false);
    } catch (error) {
      setPromoLoad(false);
      setPromo([]);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  useDocumentTitle(props.title);
  return (
    <>
      <Header />

      <main className="min-h-screen relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-amber-800/5 to-amber-700/5 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <div className="global-px py-8 lg:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Promo Sidebar - Made same height as main content */}
            <aside className="lg:w-1/3 xl:w-1/4">
              <section className="bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30 h-full flex flex-col">
                <div className="text-center mb-8">
                  <h2 className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-2xl lg:text-3xl mb-3">
                    Promo Today
                  </h2>
                  <p className="text-amber-700/90 dark:text-amber-400/90 font-['Noto_Nastaliq_Urdu'] text-lg mb-2">
                    آج کے خصوصی آفرز
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-base">
                    Coupons are updated every week.
                    <br />
                    Don&apos;t miss out on great deals!
                  </p>
                </div>

                {/* Promo items container - flex-1 to take available space */}
                <div className="flex-1 space-y-4 mb-8 overflow-y-auto max-h-[calc(100vh-400px)]">
                  {promoLoad ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl overflow-hidden"
                        >
                          <Skeleton
                            height={120}
                            baseColor="#fef3c7"
                            highlightColor="#fde68a"
                          />
                        </div>
                      ))}
                    </div>
                  ) : promo.length < 1 ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 h-full">
                      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-100/50 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-800/10">
                        <img 
                          src={illustrationsPromo} 
                          alt="No promo" 
                          className="w-48 h-auto opacity-90"
                        />
                      </div>
                      <p className="text-amber-700 dark:text-amber-400 font-semibold text-xl mb-2">
                        No Promo Today
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-base">
                        Don&apos;t worry, check back tomorrow for new offers!
                      </p>
                      <p className="text-amber-600/80 dark:text-amber-500/80 font-['Noto_Nastaliq_Urdu'] text-sm mt-2">
                        کل دوبارہ چیک کریں
                      </p>
                    </div>
                  ) : (
                    promo.map((promo, idx) => (
                      <div
                        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/80 via-amber-50/60 to-white/50 dark:from-base-300/60 dark:via-base-300/40 dark:to-base-300/30 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/40 hover:border-amber-400/60 dark:hover:border-amber-600/50 transition-all duration-300 ease-out group relative"
                        key={idx}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl/40 transition-shadow duration-300">
                            <img
                              src={promo.img || images}
                              alt={promo.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300">
                            {promo.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {promo.desc}
                          </p>
                          <div className="mt-2">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-500/20 to-amber-700/20 text-amber-700 dark:text-amber-400 border border-amber-300/30 dark:border-amber-700/30">
                              Limited Offer
                            </span>
                          </div>
                        </div>

                        {Number(userInfo.role) > 1 && (
                          <NavLink
                            to={`/promo/edit/${promo.id}`}
                            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 flex items-center justify-center transition-all duration-300 ease-out shadow-md/60 hover:shadow-lg/70 transform hover:scale-110"
                          >
                            <img src={penIcon} className="w-4 h-4 filter invert" alt="Edit" />
                          </NavLink>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Add New Promo Button - Fixed at bottom */}
                {Number(props.userInfo.role) > 1 && (
                  <div className="mt-auto pt-6 border-t border-amber-200/40 dark:border-amber-800/30">
                    <button
                      onClick={() => navigate("/promo/new")}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      Add New Promo
                    </button>
                  </div>
                )}
              </section>
            </aside>

            {/* Main Products Section - Made same height as promo sidebar */}
            <section className="flex-1">
              <div className="bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30 h-full flex flex-col">
                {/* Navigation and Filters */}
                <div className="mb-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                    <div>
                      <h1 className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-3xl lg:text-4xl mb-2">
                        Our Products
                      </h1>
                      <p className="text-amber-700/90 dark:text-amber-400/90 font-['Noto_Nastaliq_Urdu'] text-lg">
                        ہمارے مزیدار مشروبات
                      </p>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                      <button
                        onClick={toggleDdmenu}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border border-amber-300/50 dark:border-amber-600/50 text-gray-900 dark:text-gray-200 font-medium transition-all duration-300 ease-out hover:shadow-lg/40 ${ddMenu ? 'shadow-lg/40' : ''}`}
                      >
                        <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        Filters & Sort
                        <svg className={`w-4 h-4 transition-transform duration-300 ${ddMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute right-0 top-full mt-3 w-80 bg-gradient-to-br from-white/98 to-amber-50/80 dark:from-base-200/98 dark:to-base-300/60 backdrop-blur-xl rounded-2xl border border-amber-200/50 dark:border-amber-800/40 shadow-2xl/50 transition-all duration-300 ease-out z-20 ${ddMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                      >
                        <div className="p-6 space-y-6">
                          <div>
                            <label htmlFor="searchProduct" className="block mb-3 text-sm font-semibold text-amber-700 dark:text-amber-400">
                              Search Keywords
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="searchProduct"
                                id="searchProduct"
                                className="w-full bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-4 py-3 rounded-xl border border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all duration-300 outline-none"
                                value={search || ''}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for coffee, tea, or snacks..."
                              />
                              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600/70 dark:text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                              </svg>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="orderBy" className="block mb-3 text-sm font-semibold text-amber-700 dark:text-amber-400">
                              Sort By
                            </label>
                            <div className="relative">
                              <select
                                id="orderBy"
                                className="w-full appearance-none bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 px-4 py-3 rounded-xl border border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all duration-300 outline-none cursor-pointer"
                                value={sort || ''}
                                onChange={(e) => setSort(e.target.value)}
                              >
                                <option value="">Default Order</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="id_desc">Newest First</option>
                                <option value="id_asc">Oldest First</option>
                                <option value="category_asc">Category: A-Z</option>
                                <option value="category_desc">Category: Z-A</option>
                              </select>
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-amber-200/40 dark:border-amber-800/30">
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              <svg className="w-4 h-4 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              Press Enter or wait for auto-search
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Navigation */}
                  <nav className="flex flex-wrap gap-4 lg:gap-6 mb-2">
                    <NavLink
                      className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out ${isActive
                          ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg/50'
                          : 'bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 border border-amber-200/50 dark:border-amber-800/40'
                        }`
                      }
                      to="/products"
                      end
                    >
                      Favorite & Promo
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out ${isActive
                          ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg/50'
                          : 'bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 border border-amber-200/50 dark:border-amber-800/40'
                        }`
                      }
                      to="category/1"
                    >
                      Coffee
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out ${isActive
                          ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg/50'
                          : 'bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 border border-amber-200/50 dark:border-amber-800/40'
                        }`
                      }
                      to="category/2"
                    >
                      Non Coffee
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out ${isActive
                          ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg/50'
                          : 'bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 border border-amber-200/50 dark:border-amber-800/40'
                        }`
                      }
                      to="category/3"
                    >
                      Foods
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ease-out ${isActive
                          ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg/50'
                          : 'bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 border border-amber-200/50 dark:border-amber-800/40'
                        }`
                      }
                      to="category/4"
                    >
                      Add-on
                    </NavLink>
                  </nav>
                </div>

                {/* Products Content - flex-1 to take available space */}
                <div className="flex-1 mb-8 overflow-y-auto max-h-[calc(100vh-500px)]">
                  <Routes path="/products/*">
                    <Route
                      index
                      element={
                        <GetAllProducts
                          searchParams={searchParams}
                          setSearchParams={setSearchParams}
                          sort={sort}
                          setSort={setSort}
                        />
                      }
                    />
                    <Route
                      path="category/:catId"
                      element={
                        <GetAllProducts
                          searchParams={searchParams}
                          setSearchParams={setSearchParams}
                          sort={sort}
                          setSort={setSort}
                        />
                      }
                    />
                  </Routes>
                </div>

                {/* Footer Note and Add Product Button Container */}
                <div className="mt-auto space-y-6">
                  {/* Footer Note */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/60 to-amber-100/40 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200/40 dark:border-amber-700/30">
                    <p className="text-amber-700/90 dark:text-amber-400/90 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      *Prices shown include applicable discounts
                    </p>
                  </div>

                  {/* Add Product Button (Admin) */}
                  {Number(props.userInfo.role) > 1 && (
                    <div>
                      <button
                        onClick={() => navigate("/products/new")}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add New Product
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Products);