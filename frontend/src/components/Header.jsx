import React, { Component, useContext } from "react";

import _ from "lodash";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import {
  createSearchParams,
  Link,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";

import burgerIcon from "../assets/icons/burger-menu-left.svg";
import chatIcon from "../assets/icons/chat.svg";
import placeholderProfile from "../assets/images/placeholder-profile.jpg";
import logo from "../assets/jokopi.svg";
import { contextAct } from "../redux/slices/context.slice";
import { profileAction } from "../redux/slices/profile.slice";
import { uinfoAct } from "../redux/slices/userInfo.slice";
import { getUserData, isAuthenticated } from "../utils/authUtils";
import withSearchParams from "../utils/wrappers/withSearchParams.js";
import Logout from "./Logout";
import Sidebar from "./Sidebar";

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  assignToken: () => dispatch(uinfoAct.assignToken()),
  dismissToken: () => dispatch(uinfoAct.dismissToken()),
  getProfile: (token, controller) =>
    dispatch(profileAction.getProfileThunk({ token, controller })),
  openLogout: () => dispatch(contextAct.openLogout()),
});

// create a navigation component that wraps the burger menu
const Navigation = () => {
  const ctx = useContext(MyContext);

  return (
    <Sidebar
      customBurgerIcon={false}
      isOpen={ctx.isMenuOpen}
      onStateChange={(state) => ctx.stateChangeHandler(state)}
    />
  );
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isNavbarOpen: false,
      redirectLogout: false,
      isSearchOpen: false,
      inputSearch: "",
    };
    this.dropdownRef = React.createRef();
    this.searchRef = React.createRef();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickOutsideSearch = this.handleClickOutsideSearch.bind(this);
  }
  navigateTo(path) {
    const navigate = useNavigate();
    navigate(path);
  }

  componentDidMount() {
    const query = this.props.searchParams.get("q");
    this.setState((prevState) => ({
      ...prevState,
      inputSearch: query || "",
    }));
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("click", this.handleClickOutsideSearch);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("click", this.handleClickOutsideSearch);
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  }

  toggleNavbar = () => {
    this.setState((prevState) => ({
      isNavbarOpen: !prevState.isNavbarOpen,
    }));
  };

  limitCharacters(str) {
    if (str.length > 20) {
      return str.substring(0, 20) + "...";
    }
    return str;
  }

  logoutHandler = () => {
    toast.dismiss();
    this.props.openLogout();
  };

  handleClickOutside(event) {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.setState({
        isDropdownOpen: false,
      });
    }
  }

  handleClickOutsideSearch(event) {
    if (window.innerWidth < 768) return;

    if (
      this.searchRef.current &&
      !this.searchRef.current.contains(event.target)
    ) {
      this.setState({
        isSearchOpen: false,
      });
    }
  }

  toggleSearch = (e) => {
    e.stopPropagation();
    this.setState((prev) => ({
      ...prev,
      isSearchOpen: !prev.isSearchOpen,
    }));
  };

  render() {
    return (
      <>
        <Logout />
        <div
          className={`${
            this.state.isNavbarOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 left-0 w-full h-full bg-gradient-to-br from-amber-900/20 to-amber-950/30 backdrop-blur-sm z-[45] transition-all duration-300 ease-out`}
          onClick={this.toggleNavbar}
        ></div>
        <div
          className={`${
            this.state.isNavbarOpen ? "translate-x-0" : "translate-x-full"
          } transform h-full w-80 bg-gradient-to-b from-amber-50/95 to-amber-100/90 backdrop-blur-md fixed top-0 right-0 z-[60] shadow-2xl transition-all duration-300 ease-out border-l border-amber-200/30`}
        >
          <Sidebar onClose={this.toggleNavbar} />
        </div>
        <header className="sticky top-0 z-50 bg-gradient-to-b from-amber-50/95 to-amber-100/90 backdrop-blur-xl border-b border-amber-200/30 shadow-sm/30">
          <div className="flex global-px justify-between items-center">
            <div className="py-5 md:py-6 font-extrabold">
              <Link 
                to="/" 
                className="flex flex-row justify-center items-center gap-3 group"
              >
                <img 
                  src={logo} 
                  alt="CoffeePK Logo" 
                  width="36px" 
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="text-left">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent tracking-tight">
                    CoffeePK
                  </h1>
                  <p className="text-xs text-amber-700/80 -mt-1 font-normal font-['Noto_Nastaliq_Urdu']">
                    دل سے کافی، ہر سیپ میں کافی
                  </p>
                </div>
              </Link>
            </div>
            <div className="navbar-burger select-none cursor-pointer lg:hidden py-4 flex gap-7 flex-row items-center">
              <div
                ref={this.searchRef}
                className="search-section cursor-pointer relative group"
                onClick={this.toggleSearch}
              >
                <div className="p-2 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-amber-700/80"
                  >
                    <path
                      d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {this.state.isSearchOpen && (
                  <nav
                    onClick={(e) => e.stopPropagation()}
                    className="absolute list-none bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-amber-200/40 flex flex-col right-0 top-12 py-3 divide-y divide-amber-100/50 transition-all duration-200 transform origin-top-right min-w-[16rem] z-50"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.props.navigate({
                          pathname: "/products",
                          search: createSearchParams({
                            q: this.state.inputSearch,
                          }).toString(),
                        });
                      }}
                      className="group flex items-center gap-2 px-3"
                    >
                      <input
                        value={this.state.inputSearch}
                        onChange={(e) =>
                          this.setState((prevState) => ({
                            ...prevState,
                            inputSearch: e.target.value,
                          }))
                        }
                        placeholder="Search our premium coffee..."
                        className="border border-amber-200/40 outline-none focus:border-amber-600/80 focus:ring-1 focus:ring-amber-100/50 px-3 py-2.5 w-full rounded-lg text-sm bg-white/60 backdrop-blur-sm transition-all duration-200 text-amber-900 placeholder-amber-500/60"
                        required
                        autoFocus
                      />
                      <button 
                        type="submit" 
                        className="p-2 bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white"
                        >
                          <path
                            d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </form>
                  </nav>
                )}
              </div>
              {!_.isEmpty(this.props.userInfo.token) && (
                <a href="" className="relative group">
                  <div className="absolute -left-1.5 -top-1.5 h-5 w-5 bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-full text-white flex text-[0.70rem] items-center justify-center font-bold shadow-sm">
                    4+
                  </div>
                  <div className="p-2 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm">
                    <img src={chatIcon} alt="Messages" width="20px" />
                  </div>
                </a>
              )}
              <button 
                onClick={this.toggleNavbar}
                className="p-2 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm"
              >
                <img
                  src={burgerIcon}
                  width="28px"
                  className="aspect-square"
                  alt="Menu"
                />
              </button>
            </div>
            <nav className="py-6 hidden lg:flex flex-row gap-10 justify-center">
              <li className="list-none" key="Home Page">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative px-1 py-1.5 text-amber-800/90 hover:text-amber-700 transition-colors duration-200 font-medium ${
                      isActive 
                        ? "text-amber-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-500/80 after:to-amber-600/80" 
                        : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="list-none" key="Product">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `relative px-1 py-1.5 text-amber-800/90 hover:text-amber-700 transition-colors duration-200 font-medium ${
                      isActive 
                        ? "text-amber-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-500/80 after:to-amber-600/80" 
                        : ""
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="list-none" key="Cart">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative px-1 py-1.5 text-amber-800/90 hover:text-amber-700 transition-colors duration-200 font-medium ${
                      isActive 
                        ? "text-amber-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-500/80 after:to-amber-600/80" 
                        : ""
                    }`
                  }
                >
                  Your Cart
                </NavLink>
              </li>
              <li className="list-none" key="History">
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `relative px-1 py-1.5 text-amber-800/90 hover:text-amber-700 transition-colors duration-200 font-medium ${
                      isActive 
                        ? "text-amber-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-500/80 after:to-amber-600/80" 
                        : ""
                    }`
                  }
                >
                  History
                </NavLink>
              </li>
            </nav>
            {isAuthenticated() ? (
              <div className="flex-row gap-10 hidden lg:flex select-none py-4 items-center">
                <div
                  ref={this.searchRef}
                  className="search-section cursor-pointer relative group"
                  onClick={this.toggleSearch}
                >
                  <div className="p-2.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm group-hover:shadow">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-amber-700/80"
                    >
                      <path
                        d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {this.state.isSearchOpen && (
                    <nav
                      onClick={(e) => e.stopPropagation()}
                      className="absolute list-none bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-amber-200/40 flex flex-col right-0 top-14 py-4 divide-y divide-amber-100/50 transition-all duration-200 transform origin-top-right min-w-[18rem] z-50"
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          this.props.navigate({
                            pathname: "/products",
                            search: createSearchParams({
                              q: this.state.inputSearch,
                            }).toString(),
                          });
                        }}
                        className="group flex items-center gap-2 px-4"
                      >
                        <input
                          value={this.state.inputSearch}
                          onChange={(e) =>
                            this.setState((prevState) => ({
                              ...prevState,
                              inputSearch: e.target.value,
                            }))
                          }
                          placeholder="Discover premium coffee blends..."
                          className="border border-amber-200/40 outline-none focus:border-amber-600/80 focus:ring-2 focus:ring-amber-100/50 px-4 py-3 w-full rounded-xl text-sm bg-white/60 backdrop-blur-sm transition-all duration-200 text-amber-900 placeholder-amber-500/60"
                          required
                          autoFocus
                        />
                        <button 
                          type="submit" 
                          className="p-2.5 bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 rounded-xl transition-all duration-200 shadow-sm hover:shadow backdrop-blur-sm"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                          >
                            <path
                              d="M16 16L12.375 12.375M14.3333 7.66667C14.3333 11.3486 11.3486 14.3333 7.66667 14.3333C3.98477 14.3333 1 11.3486 1 7.66667C1 3.98477 3.98477 1 7.66667 1C11.3486 1 14.3333 3.98477 14.3333 7.66667Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </form>
                      <div className="pt-3 px-4">
                        <p className="text-xs text-amber-700/80 font-medium">
                          Search for coffee, beans, or accessories
                        </p>
                      </div>
                    </nav>
                  )}
                </div>
                <a href="" className="relative group">
                  <div className="absolute -left-1.5 -top-1.5 h-5 w-5 bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-full text-white flex text-[0.70rem] items-center justify-center font-bold shadow-sm z-10">
                    4+
                  </div>
                  <div className="p-2.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-amber-200/40 transition-all duration-200 shadow-sm group-hover:shadow">
                    <img src={chatIcon} alt="Messages" width="22px" />
                  </div>
                </a>
                <div
                  className="relative flex items-center my-auto"
                  ref={this.dropdownRef}
                  onClick={this.toggleDropdown}
                >
                  <div className="flex items-center cursor-pointer group">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring-2 ring-amber-200/40 group-hover:ring-amber-300/50 transition-all duration-200 overflow-hidden backdrop-blur-sm">
                        <img
                          src={
                            this.props?.profile?.data?.img
                              ? this.props.profile.data.img
                              : placeholderProfile
                          }
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 ml-2 text-amber-700/70 transition-transform duration-200 ${
                        this.state.isDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className={`dropdown ${
                      this.state.isDropdownOpen
                        ? "transition duration-200 ease-out opacity-100 transform translate-y-0"
                        : "transition duration-150 ease-in opacity-0 transform -translate-y-2 invisible"
                    }`}
                  >
                    {this.state.isDropdownOpen && (
                      <nav className="absolute list-none bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-amber-200/40 flex flex-col right-0 top-14 py-3 divide-y divide-amber-100/50 transition-all duration-200 transform origin-top-right min-w-[16rem] z-50">
                        <div className="px-4 py-3">
                          <p className="text-xs text-amber-700/80 font-medium">Signed in as</p>
                          <p className="font-semibold text-amber-900 mt-1">
                            {this.limitCharacters(getUserData().email)}
                          </p>
                        </div>
                        <div className="py-2">
                          <NavLink
                            className="block px-4 py-3 hover:bg-amber-50/70 text-amber-800 hover:text-amber-700 transition-colors duration-150 font-medium rounded-lg mx-2"
                            to="/profile/"
                          >
                            Profile
                          </NavLink>
                        </div>
                        {Number(this.props.userInfo.role) > 1 && (
                          <div className="py-2">
                            <p className="text-xs text-amber-700/80 font-medium px-4 py-2">Admin</p>
                            <NavLink
                              className="block px-4 py-3 hover:bg-amber-50/70 text-amber-800 hover:text-amber-700 transition-colors duration-150 font-medium rounded-lg mx-2"
                              to="/admin"
                            >
                              Admin Dashboard
                            </NavLink>
                            <NavLink
                              className="block px-4 py-3 hover:bg-amber-50/70 text-amber-800 hover:text-amber-700 transition-colors duration-150 font-medium rounded-lg mx-2"
                              to="/manage-order"
                            >
                              Manage Orders
                            </NavLink>
                            <NavLink
                              className="block px-4 py-3 hover:bg-amber-50/70 text-amber-800 hover:text-amber-700 transition-colors duration-150 font-medium rounded-lg mx-2"
                              to="/products/new"
                            >
                              Add Product
                            </NavLink>
                            <NavLink
                              className="block px-4 py-3 hover:bg-amber-50/70 text-amber-800 hover:text-amber-700 transition-colors duration-150 font-medium rounded-lg mx-2"
                              to="/promo/new"
                            >
                              Add Promo
                            </NavLink>
                          </div>
                        )}
                        <div className="py-2">
                          <a
                            className="block px-4 py-3 hover:bg-red-50/70 text-amber-800 hover:text-red-600 transition-colors duration-150 font-medium rounded-lg mx-2 cursor-pointer"
                            onClick={this.logoutHandler}
                          >
                            Sign out
                          </a>
                        </div>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex flex-row gap-6 items-center select-none py-6">
                <Link 
                  to="/auth/login" 
                  className="text-amber-800/90 hover:text-amber-700 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link to="/auth/register">
                  <button className="rounded-full bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-8 py-3 hover:shadow-md transition-all duration-200 shadow-sm backdrop-blur-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </header>
        {this.state.redirectLogout && (
          <Navigate to="/auth/login" replace={true} />
        )}
      </>
    );
  }
}

export default withSearchParams(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);