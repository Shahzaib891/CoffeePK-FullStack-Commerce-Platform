import React, { useEffect, useMemo, useState } from "react";

import jwtDecode from "jwt-decode";
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import iconPen from "../../assets/icons/icon-pen.svg";
import loadingImage from "../../assets/images/loading.svg";
import placeholderImage from "../../assets/images/placeholder-profile.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { profileAction } from "../../redux/slices/profile.slice";
import { editProfile } from "../../utils/dataProvider/profile";
import useDocumentTitle from "../../utils/documentTitle";
import EditPassword from "./EditPassword";

function Profile() {
  const userInfo = useSelector((state) => state.userInfo);
  const profile = useSelector((state) => state.profile);

  const uinfo = userInfo.token ? jwtDecode(userInfo.token) : {};
  const [data, setData] = useState({
    address: "",
    birthdate: "",
    created_at: "",
    display_name: "",
    email: "",
    first_name: "",
    gender: 1,
    img: "",
    last_name: "",
    phone_number: "",
    user_id: "",
  });
  const [form, setForm] = useState({
    address: "",
    birthdate: "",
    created_at: "",
    display_name: "",
    email: "",
    first_name: "",
    gender: 1,
    img: "",
    last_name: "",
    phone_number: "",
    user_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editPassModal, setEditPassModal] = useState(false);
  const [isProcess, setProcess] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const controller = useMemo(() => new AbortController(), []);

  const dispatch = useDispatch();

  const handleChoosePhoto = () => {
    setIsUploaderOpen(true);
  };

  const closeEpassModal = () => {
    setEditPassModal(false);
  };
  const switchEpassModal = () => {
    setEditPassModal(!editPassModal);
  };

  useDocumentTitle("Profile");
  useEffect(() => {
    const updatedObject = { ...profile.data };

    for (const [key, value] of Object.entries(updatedObject)) {
      if (value === null || value === "null") {
        updatedObject[key] = "";
      }
    }
    setData(updatedObject);
    setForm(updatedObject);
  }, [profile]);

  const formHandler = (e) => {
    if (editMode) {
      return setForm((form) => {
        return {
          ...form,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const Loading = (props) => {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/80 to-white/90 dark:from-base-100/95 dark:to-base-200/95 backdrop-blur-xl">
        <div className="animate-pulse">
          <img src={loadingImage} alt="Loading..." className="w-24 h-24" />
        </div>
        <p className="mt-6 font-['Noto_Nastaliq_Urdu'] text-amber-700/90 dark:text-amber-400/90 text-xl">
          پروفائل لوڈ ہو رہی ہے...
        </p>
        <p className="text-amber-600/70 dark:text-amber-500/70 text-sm mt-2 animate-pulse">
          Loading your profile information
        </p>
      </main>
    );
  };

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleClearClick = () => {
    setSelectedFile(null);
  };

  const saveHandler = () => {
    let changes = {};

    for (let key in form) {
      if (form[key] !== data[key]) {
        changes[key] = form[key];
      }
    }
    setProcess(true);
    if (selectedFile) {
      form.image = selectedFile;
    }
    toast.promise(
      editProfile(form, userInfo.token, controller)
        .then((res) => {
          res.data;
          dispatch(
            profileAction.getProfileThunk({ token: userInfo.token, controller })
          );
        })
        .finally(() => setProcess(false)),
      {
        loading: "Saving changes",
        success: "Changes saved",
        error: "Something went wrong",
      }
    );
  };

  const ActionList = () => (
    <div className="flex flex-col items-center w-full h-full">
      <div className="space-y-4 w-full">
        <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 pb-4 border-b border-amber-200/40 dark:border-amber-800/30">
          Profile Actions
        </h3>
        
        <button
          className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-600 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-3"
          id="saveChange"
          onClick={saveHandler}
          disabled={(isEqual(form, data) && !selectedFile) || isProcess}
        >
          {isProcess ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Save Changes</span>
            </>
          )}
        </button>
        
        <button
          className="w-full px-6 py-4 bg-gradient-to-r from-white to-amber-50/80 dark:from-base-300 dark:to-base-400 hover:from-amber-50 hover:to-amber-100 dark:hover:from-base-400 dark:hover:to-base-500 text-amber-800 dark:text-amber-200 font-bold rounded-xl border border-amber-300/60 dark:border-amber-700/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-500 disabled:hover:translate-y-0 flex items-center justify-center gap-3"
          onClick={() => setForm({ ...data })}
          disabled={isEqual(form, data) || isProcess}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>Discard Changes</span>
        </button>
        
        <button 
          className="w-full px-6 py-4 bg-gradient-to-r from-white to-amber-50/80 dark:from-base-300 dark:to-base-400 hover:from-amber-50 hover:to-amber-100 dark:hover:from-base-400 dark:hover:to-base-500 text-amber-800 dark:text-amber-200 font-bold rounded-xl border border-amber-300/60 dark:border-amber-700/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
          onClick={switchEpassModal}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
          </svg>
          <span>Edit Password</span>
        </button>
        
        <button className="w-full px-6 py-4 bg-gradient-to-r from-white to-amber-50/80 dark:from-base-300 dark:to-base-400 hover:from-rose-50 hover:to-rose-100 dark:hover:from-rose-900/30 dark:hover:to-rose-800/40 text-rose-700 dark:text-rose-300 font-bold rounded-xl border border-amber-300/60 dark:border-amber-700/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span>Log out</span>
        </button>
      </div>
      
      {/* Urdu microcopy */}
      <div className="mt-auto pt-6 border-t border-amber-200/40 dark:border-amber-800/30 w-full">
        <p className="text-xs text-center text-amber-600/60 dark:text-amber-400/60 font-['Noto_Nastaliq_Urdu']">
          اپنی معلومات محفوظ رکھیں
        </p>
        <p className="text-xs text-center text-amber-600/40 dark:text-amber-400/40 mt-1">
          Keep your information safe
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <EditPassword isOpen={editPassModal} onClose={closeEpassModal} />
      
      <main className="min-h-screen relative">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 bg-cart bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-700/10 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <div className="relative z-10 global-px py-8 md:py-12 lg:py-16">
          {/* Page Header */}
          <section className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent drop-shadow-lg mb-3">
              Your Profile
            </h1>
            <p className="text-amber-700/90 dark:text-amber-300/90 text-lg md:text-xl">
              Manage your personal information and preferences
            </p>
            <p className="text-amber-600/70 dark:text-amber-400/70 text-sm font-['Noto_Nastaliq_Urdu'] mt-1">
              اپنی ذاتی معلومات کو منظم کریں
            </p>
          </section>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
              {/* Both cards wrapped for equal height */}
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 w-full">
                {/* Left Card - Profile Picture & Actions */}
                <div className="flex-1 h-full">
                  <div className="bg-white/90 dark:bg-base-200/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-xl/30 h-full flex flex-col">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative mb-6">
                        {/* Elegant Profile Icon Container */}
                        <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto">
                          {/* Subtle outer glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-amber-700/5 rounded-full blur-lg"></div>
                          
                          {/* Main profile image container - Elegant design */}
                          <div className="absolute inset-4 bg-gradient-to-br from-amber-100/90 via-amber-50/70 to-white/60 dark:from-amber-900/30 dark:via-amber-800/25 dark:to-base-300/35 rounded-full border-4 border-white/90 dark:border-base-300/90 shadow-2xl overflow-hidden">
                            {selectedFile || data.img ? (
                              <img
                                src={selectedFile ? preview : data.img}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                {/* Elegant Coffee Icon with User Silhouette */}
                                <div className="relative">
                                  <div className="text-7xl md:text-8xl text-amber-600/70 dark:text-amber-500/60">
                                    <div className="relative">
                                      {/* Coffee cup base */}
                                      <div className="text-current">☕</div>
                                      {/* Elegant user overlay */}
                                      <div className="absolute -top-2 -right-2">
                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-700/90 to-amber-900/80 flex items-center justify-center shadow-lg">
                                          <svg className="w-8 h-8 md:w-9 md:h-9 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Subtle decorative accents */}
                          <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-sm"></div>
                          <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tl from-amber-700/15 to-transparent rounded-full blur-sm"></div>
                        </div>
                      </div>
                      
                      <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                          {data.display_name || "Coffee Enthusiast"}
                        </h2>
                        <p className="text-amber-700/80 dark:text-amber-300/80 mb-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100/40 to-amber-50/20 dark:from-amber-900/15 dark:to-amber-800/10 border border-amber-200/20 dark:border-amber-700/15 inline-block">
                          {data.email || "Welcome to CoffeePK!"}
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                          <span className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                            Active Member
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Photo Upload Actions - Organized in grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="sm:col-span-2">
                        <input
                          className="hidden"
                          type="file"
                          onChange={onSelectFile}
                          accept="image/png, image/jpeg, image/webp"
                          id="imageUp"
                        />
                        <label
                          htmlFor="imageUp"
                          className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600/10 to-amber-800/10 hover:from-amber-600/20 hover:to-amber-800/20 text-amber-800 dark:text-amber-200 font-bold rounded-xl border-2 border-dashed border-amber-400/50 dark:border-amber-600/50 cursor-pointer transition-all duration-300 hover:border-amber-500/70 dark:hover:border-amber-500/70 w-full h-full"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span className="text-center">Upload Profile Photo</span>
                        </label>
                      </div>
                      
                      <button
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-600/10 to-rose-800/10 hover:from-rose-600/20 hover:to-rose-800/20 text-rose-700 dark:text-rose-300 font-bold rounded-xl border border-rose-400/50 dark:border-rose-600/50 transition-all duration-300 hover:border-rose-500/70 dark:hover:border-rose-500/70 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleClearClick}
                        disabled={!selectedFile}
                      >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span>Remove Photo</span>
                      </button>
                      
                      <button 
                        className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600/10 to-emerald-800/10 hover:from-emerald-600/20 hover:to-emerald-800/20 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl border border-emerald-400/50 dark:border-emerald-600/50 transition-all duration-300 hover:border-emerald-500/70 dark:hover:border-emerald-500/70"
                        onClick={switchEpassModal}
                      >
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                        </svg>
                        <span>Password</span>
                      </button>
                    </div>

                    {/* Action List - Takes remaining space */}
                    <div className="mt-auto pt-8 border-t border-amber-200/40 dark:border-amber-800/30">
                      <ActionList />
                    </div>
                  </div>
                </div>

                {/* Right Card - Profile Form */}
                <div className="flex-[2_2_0%] h-full">
                  <div className="bg-white/90 dark:bg-base-200/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-xl/30 h-full flex flex-col">
                    {/* Form Header with Edit Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-100">
                          Personal Information
                        </h2>
                        <p className="text-amber-700/80 dark:text-amber-300/80 mt-1">
                          Update your contact and personal details
                        </p>
                      </div>
                      
                      <button
                        className={`group flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 min-w-[140px] ${
                          editMode 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white shadow-lg'
                            : 'bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white shadow-lg'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (editMode) {
                            setForm(data);
                          }
                          setEditMode(!editMode);
                        }}
                      >
                        {editMode ? (
                          <>
                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span>Cancel</span>
                          </>
                        ) : (
                          <>
                            <img src={iconPen} alt="Edit" className="w-5 h-5 filter brightness-0 invert group-hover:rotate-12 transition-transform duration-300" />
                            <span>Edit Profile</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Form Content - Scrollable area */}
                    <div className="flex-1 overflow-y-auto pr-2">
                      <form className="space-y-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">Contact Information</h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="email" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                                placeholder="your@email.com"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="phone_number" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                Mobile Number
                              </label>
                              <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                value={form.phone_number}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                                placeholder="+92 300 1234567"
                              />
                            </div>
                            
                            <div className="md:col-span-2 space-y-2">
                              <label htmlFor="address" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                Delivery Address
                              </label>
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                                placeholder="Enter your complete delivery address"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Personal Details */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">Personal Details</h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label htmlFor="display_name" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                Display Name
                              </label>
                              <input
                                type="text"
                                id="display_name"
                                name="display_name"
                                value={form.display_name}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                                placeholder="Your display name"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="birthdate" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                Birthdate
                              </label>
                              <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                value={form.birthdate?.slice(0, 10)}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="first_name" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={form.first_name}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                                placeholder="First name"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="last_name" className="block text-amber-700 dark:text-amber-300 font-semibold">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={form.last_name}
                                onChange={formHandler}
                                disabled={!editMode}
                                className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                                  editMode 
                                    ? 'bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                                    : 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 border-gray-300/70 dark:border-base-500/50'
                                } text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none`}
                                placeholder="Last name"
                              />
                            </div>
                          </div>
                          
                          {/* Gender Selection */}
                          <div className="space-y-4 pt-4">
                            <label className="block text-amber-700 dark:text-amber-300 font-semibold">
                              Gender
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                              <label className="flex items-center gap-4 p-4 rounded-xl border border-amber-300/50 dark:border-amber-700/50 bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/60 dark:to-base-400/40 cursor-pointer transition-all duration-200 hover:border-amber-400/70 dark:hover:border-amber-600/70 flex-1 group">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  String(form.gender) === "1" 
                                    ? 'border-amber-600 bg-gradient-to-r from-amber-600 to-amber-800' 
                                    : 'border-amber-400/60 dark:border-amber-600/60'
                                }`}>
                                  {String(form.gender) === "1" && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="1"
                                  className="hidden"
                                  checked={String(form.gender) === "1"}
                                  disabled={!editMode}
                                  onChange={formHandler}
                                />
                                <div className="flex-1">
                                  <span className={`font-medium transition-colors duration-200 ${
                                    String(form.gender) === "1" 
                                      ? 'text-amber-800 dark:text-amber-200' 
                                      : 'text-amber-700/80 dark:text-amber-300/80'
                                  }`}>
                                    Male
                                  </span>
                                </div>
                              </label>
                              
                              <label className="flex items-center gap-4 p-4 rounded-xl border border-amber-300/50 dark:border-amber-700/50 bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/60 dark:to-base-400/40 cursor-pointer transition-all duration-200 hover:border-amber-400/70 dark:hover:border-amber-600/70 flex-1 group">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                  String(form.gender) === "2" 
                                    ? 'border-amber-600 bg-gradient-to-r from-amber-600 to-amber-800' 
                                    : 'border-amber-400/60 dark:border-amber-600/60'
                                }`}>
                                  {String(form.gender) === "2" && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="2"
                                  className="hidden"
                                  checked={String(form.gender) === "2"}
                                  disabled={!editMode}
                                  onChange={formHandler}
                                />
                                <div className="flex-1">
                                  <span className={`font-medium transition-colors duration-200 ${
                                    String(form.gender) === "2" 
                                      ? 'text-amber-800 dark:text-amber-200' 
                                      : 'text-amber-700/80 dark:text-amber-300/80'
                                  }`}>
                                    Female
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Profile;