import React, { useEffect, useMemo, useState } from "react";

import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import { createProductEntry } from "../../utils/dataProvider/products";
import useDocumentTitle from "../../utils/documentTitle";

export const NewProduct = (props) => {
  useDocumentTitle("New Product");
  const initialState = {
    name: "",
    price: "",
    category_id: "",
    desc: "",
    image: "",
  };
  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
  });
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [cancel, setCancel] = useState(false);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!form.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setForm({ ...form, image: "" });
      return;
    }

    if (e.target.files[0].size > 2097152) {
      return toast.error("Files must not exceed 2 MB");
    }

    // I've kept this example simple by using the first image instead of multiple
    setForm({ ...form, image: e.target.files[0] });
  };

  const [isLoading, setLoading] = useState("");
  const controller = useMemo(() => new AbortController(), []);
  const formChangeHandler = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      form.category_id === "" ||
      form.desc === "" ||
      form.name === "" ||
      form.price === ""
    ) {
      return toast.error("Input required form");
    }

    setLoading(true);
    createProductEntry(form, props.userInfo.token, controller)
      .then((result) => {
        console.log(result.data);
        navigate(`/products/detail/${result.data.data[0].id}`, {
          replace: true,
        });
        toast.success("Product added successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal 
        isOpen={cancel} 
        onClose={() => setCancel(!cancel)}
        className="flex flex-col gap-y-6 p-8 backdrop-blur-2xl bg-gradient-to-br from-white/98 to-amber-50/60 dark:from-base-200/98 dark:to-amber-900/20 rounded-2xl border border-amber-200/60 dark:border-amber-700/40 shadow-2xl/40"
      >
        <div className="text-center space-y-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800/40 dark:to-amber-900/30 mb-2">
            <svg className="w-8 h-8 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Reset Form?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Are you sure you want to reset all form fields?
          </p>
          <p className="font-['Noto_Nastaliq_Urdu'] text-amber-700/90 dark:text-amber-400/90 text-base leading-relaxed">
            کیا آپ تمام فیلڈز دوبارہ سیٹ کرنا چاہتے ہیں؟
          </p>
        </div>
        <section className="flex justify-center gap-x-4">
          <button
            className="btn px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => {
              setForm({ ...initialState });
              setCancel(false);
            }}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Yes, Reset
            </span>
          </button>
          <button 
            className="btn px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-base-300 dark:to-base-400 hover:from-gray-200 hover:to-gray-400 dark:hover:from-base-400 dark:hover:to-base-500 text-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-300/60 dark:border-base-400/50"
            onClick={() => setCancel(!cancel)}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel
            </span>
          </button>
        </section>
      </Modal>
      <Header />
      
      <main className="min-h-screen relative">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-amber-800/5 to-amber-700/5 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <div className="global-px py-8 lg:py-12 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-sm mb-8">
            <NavLink 
              to="/products" 
              className="text-amber-700/90 dark:text-amber-400/90 hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-300"
            >
              Favorite & Promo
            </NavLink>
            <svg className="w-4 h-4 mx-2 text-amber-600/70 dark:text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              Add New Product
            </span>
          </nav>

          <div className="bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-3xl lg:text-4xl mb-3">
                Add New Product
              </h1>
              <p className="text-amber-700/90 dark:text-amber-400/90 font-['Noto_Nastaliq_Urdu'] text-lg mb-2">
                نیا پروڈکٹ شامل کریں
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
                Create a new product for the CoffeePK menu. Fill in all required details and upload an attractive image.
              </p>
            </div>

            <section className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Image Upload Section */}
              <section className="lg:w-2/5">
                <div className="bg-gradient-to-br from-amber-50/80 to-white/60 dark:from-base-300/70 dark:to-base-400/50 backdrop-blur-sm rounded-3xl p-8 border border-amber-200/50 dark:border-amber-800/40 shadow-xl/30">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Product Image</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Upload an attractive image for your product
                    </p>
                  </div>

                  {/* Image Preview */}
                  <div className="relative mb-8">
                    <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl/40 border-4 border-white/60 dark:border-base-400/50">
                      <img 
                        src={preview || productPlaceholder} 
                        alt="Product preview" 
                        className="w-full h-full object-cover"
                      />
                      {!preview && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100/40 to-transparent">
                          <p className="text-amber-700/70 dark:text-amber-400/70 text-sm">No image selected</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Buttons */}
                  <div className="space-y-4">
                    <input
                      id="form_image"
                      type="file"
                      accept="image/png, image/webp, image/jpeg"
                      className="hidden"
                      required
                      onChange={onSelectFile}
                    />
                    <label
                      htmlFor="form_image"
                      className="block w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Take a Picture
                    </label>
                    <label
                      htmlFor="form_image"
                      className="block w-full bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl border border-amber-300/50 dark:border-amber-600/50 transition-all duration-300 ease-out shadow-lg/40 hover:shadow-xl/50 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20"
                    >
                      <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Choose from Gallery
                    </label>
                    
                    {/* File Size Note */}
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50/60 to-amber-100/40 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200/40 dark:border-amber-700/30">
                      <p className="text-sm text-amber-700/90 dark:text-amber-400/90 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Maximum file size: 2MB. Supported formats: PNG, JPEG, WebP
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Form Section */}
              <form
                onSubmit={submitHandler}
                className="lg:w-3/5 flex flex-col gap-6"
              >
                <div className="space-y-6">
                  {/* Product Name */}
                  <div className="space-y-3">
                    <label
                      className="block text-amber-700 dark:text-amber-400 font-semibold text-lg flex items-center gap-2"
                      htmlFor="product_name"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      Product Name
                    </label>
                    <input
                      placeholder="Type product name (max. 50 characters)"
                      name="name"
                      id="product_name"
                      value={form.name}
                      onChange={formChangeHandler}
                      maxLength={50}
                      required
                      className="w-full bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-5 py-4 rounded-xl border-2 border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all duration-300 outline-none text-lg"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {form.name.length}/50 characters
                      </p>
                      {form.name.length >= 45 && (
                        <p className="text-xs text-amber-600 dark:text-amber-500 font-medium">
                          Approaching limit
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Product Price */}
                  <div className="space-y-3">
                    <label
                      className="block text-amber-700 dark:text-amber-400 font-semibold text-lg flex items-center gap-2"
                      htmlFor="product_price"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      Price (PKR)
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Enter product price"
                        name="price"
                        type="number"
                        id="product_price"
                        value={form.price}
                        onChange={formChangeHandler}
                        required
                        min="0"
                        className="w-full bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-5 py-4 rounded-xl border-2 border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all duration-300 outline-none text-lg pr-12"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-amber-700 dark:text-amber-400 font-semibold">PKR</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="space-y-3">
                    <label
                      className="block text-amber-700 dark:text-amber-400 font-semibold text-lg flex items-center gap-2"
                      htmlFor="product_desc"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                      </div>
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your product (min. 50 characters, max. 250 characters)"
                      name="desc"
                      id="product_desc"
                      value={form.desc}
                      onChange={formChangeHandler}
                      minLength={50}
                      maxLength={250}
                      required
                      rows="4"
                      className="w-full bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-5 py-4 rounded-xl border-2 border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all duration-300 outline-none text-lg resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {form.desc.length}/250 characters
                      </p>
                      {form.desc.length > 0 && form.desc.length < 50 && (
                        <p className="text-xs text-red-600 dark:text-red-500 font-medium">
                          Minimum 50 characters required
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label
                      className="block text-amber-700 dark:text-amber-400 font-semibold text-lg flex items-center gap-2"
                      htmlFor="form_category"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                      </div>
                      Category
                    </label>
                    <div className="relative">
                      <select
                        name="category_id"
                        id="form_category"
                        value={form.category_id}
                        onChange={formChangeHandler}
                        required
                        className="w-full appearance-none bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 px-5 py-4 rounded-xl border-2 border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm transition-all duration-300 outline-none text-lg cursor-pointer"
                      >
                        <option disabled value="">
                          Select related category
                        </option>
                        <option value="1">Coffee</option>
                        <option value="2">Non-Coffee</option>
                        <option value="3">Food</option>
                        <option value="4">Add-ons</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-4">
                  <button
                    type="submit"
                    className={`${
                      isLoading && "loading"
                    } w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3`}
                  >
                    {!isLoading && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                    {isLoading ? "Saving Product..." : "Save Product"}
                    <span className="font-['Noto_Nastaliq_Urdu'] text-sm opacity-90">
                      (محفوظ کریں)
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setCancel(true)}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-300 dark:from-base-300 dark:to-base-400 hover:from-gray-200 hover:to-gray-400 dark:hover:from-base-400 dark:hover:to-base-500 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-300/60 dark:border-base-400/50 flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Reset Form
                    <span className="font-['Noto_Nastaliq_Urdu'] text-sm opacity-90">
                      (دوبارہ سیٹ کریں)
                    </span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);