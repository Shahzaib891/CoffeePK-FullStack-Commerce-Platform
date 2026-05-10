import React, { useCallback, useEffect, useMemo, useState } from "react";

import _ from "lodash";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";

import closeIcon from "../../assets/icons/close.svg";
import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-promo.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import DeletePromo from "../../components/Promo/DeletePromo";
import PromoNotFound from "../../components/Promo/PromoNotFound";
import { getAllProducts } from "../../utils/dataProvider/products";
import { editPromoEntry, getPromoById } from "../../utils/dataProvider/promo";
import useDocumentTitle from "../../utils/documentTitle";
import { n_f } from "../../utils/helpers";

const EditPromo = (props) => {
  const { promoId } = useParams();
  useDocumentTitle("Edit Promo");
  const initialState = {
    name: "",
    price: "",
    category_id: "",
    desc: "",
    image: "",
  };
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    id: "",
    category_name: "",
  });
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState({ img: "" });
  const [form, setForm] = useState({
    search_product: "",
    product_id: "",
    name: "",
    discount: "1",
    desc: "",
    image: "",
    coupon_code: "",
    start_date: "", // real form
    end_date: "", // real form
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState({
    name: "",
    price: "",
    category_id: "",
    desc: "",
  });
  const [resultSearch, setResultSearch] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [cancel, setCancel] = useState(false);
  const [loadings, setLoadings] = useState({
    search: false,
    data: false,
  });

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

  const searchHandler = useCallback(
    _.debounce((search) => {
      setLoadings({ ...loadings, search: true });
      getAllProducts("", { searchByName: search }, controller)
        .then((result) => setResultSearch(result.data.data))
        .catch((err) => {
          console.log(err);
          setResultSearch([]);
        })
        .finally(() => setLoadings({ ...loadings, search: false }));
    }, 1500),
    []
  );

  useEffect(() => {
    if (form.product_id === "") {
      searchHandler(form.search_product);
    }
  }, [form.search_product, form.product_id]);

  useEffect(() => {
    setLoadings({ ...loadings, data: true });
    getPromoById(promoId, controller)
      .then((result) => {
        const {
          product_name,
          product_id,
          product_price,
          start_date,
          end_date,
        } = result.data.data[0];
        setForm({
          ...form,
          ...result.data.data[0],
          startDate: start_date,
          endDate: end_date,
        });
        setSelectedProduct({
          id: product_id,
          name: product_name,
          price: product_price,
        });
        setData({ ...data, img: result.data.data[0].img });
        setLoadings({ ...loadings, data: false });
      })
      .catch((err) => {
        setLoadings({ ...loadings, data: false });
        setNotFound(true);
        console.log(err);
      })
      .finally(() => {
        // setLoadings({ ...loadings, data: false });
      });
  }, []);

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
    if (form.product_id === "") return toast.error("Select product required");
    if (
      form.coupon_code === "" ||
      form.desc === "" ||
      form.name === "" ||
      form.discount === "" ||
      form.startDate === "" ||
      form.endDate === ""
    ) {
      return toast.error("Input required form");
    }
    if (form.name.length < 6) return toast.error("Promo title min 6 char");
    if (form.desc.length < 10)
      return toast.error("Promo description min 10 char");
    if (form.coupon_code.length < 6)
      return toast.error("Promo coupon code min 6 char");
    if (form.discount < 1 || form.discount > 100)
      return toast.error("Promo discount is invalid");

    setLoading(true);
    editPromoEntry(promoId, form, props.userInfo.token, controller)
      .then((result) => {
        navigate(`/products/`, {
          replace: true,
        });
        toast.success("Promo edited successfully");
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          toast.error(err.response?.data?.msg);
          return;
        }
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  const setPromoProducts = (index) => {
    setSelectedProduct({ ...selectedProduct, ...resultSearch[index] });
    setForm({ ...form, product_id: resultSearch[index].id });
    setResultSearch([]);
  };

  return (
    <>
      <Modal isOpen={cancel} onClose={() => setCancel(!cancel)}>
        <div className="text-center space-y-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800/40 dark:to-amber-900/30 mb-2">
            <svg className="w-8 h-8 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Reset Changes?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Are you sure you want to reset all changes made to this promotion?
          </p>
          <p className="font-['Noto_Nastaliq_Urdu'] text-amber-700/90 dark:text-amber-400/90 text-base">
            کیا آپ واقعی تمام تبدیلیاں ری سیٹ کرنا چاہتے ہیں؟
          </p>
        </div>
        <section className="flex justify-center gap-5 mt-8">
          <button
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => {
              setForm({ ...initialState });
              setCancel(false);
            }}
          >
            Yes, Reset
          </button>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-base-300 dark:to-base-400 hover:from-gray-200 hover:to-gray-400 dark:hover:from-base-400 dark:hover:to-base-500 text-gray-800 dark:text-gray-200 font-bold rounded-xl border border-gray-300/60 dark:border-base-400/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            onClick={() => setCancel(!cancel)}
          >
            Cancel
          </button>
        </section>
      </Modal>
      <DeletePromo
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        promoId={promoId}
      />
      <Header />
      
      <main className="min-h-screen relative">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 bg-cart bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-700/10 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <div className="relative z-10 global-px py-8 md:py-12">
          {loadings.data ? (
            <Loading />
          ) : notFound ? (
            <PromoNotFound />
          ) : (
            <>
              {/* Breadcrumb Navigation */}
              <nav className="flex flex-row list-none gap-2 mb-8">
                <li className="text-amber-700/80 dark:text-amber-300/80 hover:text-amber-800 dark:hover:text-amber-400 transition-colors duration-200">
                  <NavLink to="/products" className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Promotions
                  </NavLink>
                </li>
                <li className="flex items-center text-amber-600/60 dark:text-amber-400/60">
                  <svg className="w-4 h-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </li>
                <li className="font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
                  Edit Promotion #{promoId}
                </li>
              </nav>

              {/* Page Header with Status Badge */}
              <section className="mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent drop-shadow-lg mb-3">
                      Edit Promotion
                    </h1>
                    <p className="text-amber-700/90 dark:text-amber-300/90 text-lg md:text-xl">
                      Update and manage your existing coffee promotion
                    </p>
                    <p className="text-amber-600/70 dark:text-amber-400/70 text-sm font-['Noto_Nastaliq_Urdu'] mt-1">
                      اپنی موجودہ کافی پروموشن کو اپ ڈیٹ اور منظم کریں
                    </p>
                  </div>
                  
                  {/* Promo ID Badge */}
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-600/10 to-amber-800/10 border border-amber-400/50 dark:border-amber-600/50">
                      <span className="text-sm font-bold text-amber-800 dark:text-amber-200">
                        ID: <span className="font-mono">{promoId}</span>
                      </span>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-pulse"></div>
                      <span className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Warning Alert */}
                <div className="bg-gradient-to-r from-amber-100/50 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-800/10 border-l-4 border-amber-600 p-4 rounded-r-xl mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-600/20 to-amber-800/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-amber-800 dark:text-amber-200 font-medium">Editing Active Promotion</p>
                      <p className="text-amber-700/80 dark:text-amber-300/80 text-sm mt-1">
                        Changes will affect all users who have access to this promotion.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex flex-col lg:flex-row gap-8 md:gap-12 bg-white/90 dark:bg-base-200/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-xl/30">
                {/* Left Column - Image Upload & Actions */}
                <section className="flex-1 flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-700/10 rounded-3xl blur-lg"></div>
                    <div className="avatar relative z-10">
                      <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden border-4 border-white/80 dark:border-base-300/80 shadow-2xl">
                        <img 
                          src={preview || data.img || productPlaceholder} 
                          alt="Promo Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Edit Badge */}
                    <div className="absolute -top-2 -right-2 w-14 h-14 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center shadow-lg z-20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4 w-full max-w-xs">
                    <input
                      id="form_image"
                      type="file"
                      accept="image/png, image/webp, image/jpeg"
                      className="hidden"
                      onChange={onSelectFile}
                    />
                    
                    <label
                      htmlFor="form_image"
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Update Photo
                    </label>
                    
                    <label
                      htmlFor="form_image"
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-white to-amber-50/80 dark:from-base-300 dark:to-base-400 hover:from-amber-50 hover:to-amber-100 dark:hover:from-base-400 dark:hover:to-base-500 text-amber-800 dark:text-amber-200 font-bold rounded-xl border border-amber-300/60 dark:border-amber-700/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Choose from Gallery
                    </label>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteModal(true)}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Delete Promotion
                    </button>
                  </div>
                </section>

                {/* Right Column - Form */}
                <form
                  onSubmit={submitHandler}
                  className="flex-[2_2_0%] flex flex-col gap-6"
                >
                  {/* Product Search Section */}
                  <div className="space-y-2">
                    <label
                      className="block text-lg font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent"
                      htmlFor="product_name"
                    >
                      Select Product
                    </label>
                    
                    <div className="relative">
                      {form.product_id ? (
                        <div className="relative">
                          <div className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-100/50 to-emerald-50/30 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-300/50 dark:border-emerald-700/30 text-emerald-800 dark:text-emerald-300 font-medium">
                            {`ID: ${selectedProduct.id} - ${selectedProduct.name}`}
                          </div>
                          <button
                            onClick={() => {
                              setForm({ ...form, product_id: "" });
                              setSelectedProduct({});
                            }}
                            className="absolute right-3 top-3 p-1.5 rounded-full bg-gradient-to-r from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/20 hover:from-rose-200 hover:to-rose-100 dark:hover:from-rose-800/40 dark:hover:to-rose-700/30 transition-all duration-200"
                          >
                            <img src={closeIcon} width={16} className="opacity-70" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <input
                            placeholder="Search product by name..."
                            name="search_product"
                            id="search_product"
                            value={form.search_product}
                            onChange={formChangeHandler}
                            maxLength={50}
                            className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none transition-all duration-200"
                          />
                          <div className="absolute right-3 top-3">
                            {loadings.search ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-600 border-t-transparent"></div>
                            ) : (
                              <svg className="w-5 h-5 text-amber-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {resultSearch.length > 0 && form.product_id === "" && (
                      <div className="max-h-48 overflow-y-auto rounded-xl border border-amber-300/50 dark:border-amber-700/30 bg-white/80 dark:bg-base-300/80 backdrop-blur-sm mt-2 shadow-lg/30">
                        {resultSearch.map((item, key) => (
                          <div
                            onClick={() => setPromoProducts(key)}
                            className="cursor-pointer px-4 py-3 hover:bg-gradient-to-r from-amber-50/80 to-transparent dark:hover:from-amber-900/20 dark:hover:to-transparent border-b border-amber-100/50 dark:border-amber-800/30 last:border-b-0 transition-all duration-200 group"
                            key={key}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-amber-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-200">
                                  {item.name}
                                </p>
                                <p className="text-sm text-amber-700/70 dark:text-amber-300/70">
                                  ID: {item.id} • Category: {item.category_name}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-amber-800 dark:text-amber-200">
                                  {n_f(item.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Promo Title */}
                  <div className="space-y-2">
                    <label
                      className="block text-lg font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent"
                      htmlFor="product_name"
                    >
                      Promotion Title
                    </label>
                    <input
                      placeholder="Type promo title (max 50 characters)..."
                      name="name"
                      id="product_name"
                      value={form.name}
                      onChange={formChangeHandler}
                      maxLength={50}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Discount Section */}
                  <div className="space-y-4">
                    <label
                      className="block text-lg font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent"
                      htmlFor="product_price"
                    >
                      Discount Percentage
                    </label>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-5">
                        <input
                          type="range"
                          min={1}
                          max="100"
                          value={form.discount}
                          name="discount"
                          onChange={formChangeHandler}
                          className="range range-lg range-accent flex-1"
                        />
                        <div className="w-20 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600/10 to-amber-800/10 border border-amber-400/50 dark:border-amber-600/50 text-center">
                          <span className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
                            {form.discount}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Price Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-100/40 to-amber-50/20 dark:from-amber-900/15 dark:to-amber-800/10 border border-amber-200/30 dark:border-amber-700/20">
                        <div className="space-y-1">
                          <p className="text-sm text-amber-700/80 dark:text-amber-300/80">Original Price</p>
                          <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                            {n_f(selectedProduct.price) || "0"}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-right">
                          <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">Discounted Price</p>
                          <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                            {n_f(
                              Math.ceil(
                                selectedProduct.price -
                                  selectedProduct.price * (form.discount / 100)
                              )
                            ) || "0"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label
                      className="block text-lg font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent"
                      htmlFor="product_desc"
                    >
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your promotion (min 10 characters)..."
                      name="desc"
                      id="product_price"
                      value={form.desc}
                      onChange={formChangeHandler}
                      className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none transition-all duration-200 min-h-[100px] resize-none"
                      minLength={10}
                      maxLength={500}
                      required
                    />
                  </div>

                  {/* Coupon Code */}
                  <div className="space-y-2">
                    <label
                      className="block text-lg font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent"
                      htmlFor="coupon_code"
                    >
                      Coupon Code
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Type promo coupon code (6-12 characters)..."
                        name="coupon_code"
                        id="coupon_code"
                        value={form.coupon_code.toUpperCase()}
                        onChange={formChangeHandler}
                        maxLength={12}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none transition-all duration-200 font-mono tracking-wider"
                      />
                      <div className="absolute right-3 top-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-600/10 to-amber-800/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400">CODE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Promo Date */}
                  <div className="space-y-2">
                    <label
                      className="block text-lg font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent"
                      htmlFor="coupon_code"
                    >
                      Promotion Period
                    </label>
                    <div className="rounded-xl overflow-hidden border border-amber-400/60 dark:border-amber-600/60">
                      <Datepicker
                        inputClassName={
                          "bg-gradient-to-r from-white/90 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 border-0 py-3.5 px-4 focus:ring-4 focus:ring-amber-500/20 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 outline-none w-full"
                        }
                        minDate={new Date()}
                        value={form}
                        popoverDirection="up"
                        separator="until"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            startDate: e.startDate,
                            endDate: e.endDate,
                            start_date: e.startDate,
                            end_date: e.endDate,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      className={`flex-1 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg ${
                        isLoading ? "opacity-80 cursor-wait" : ""
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating Promotion...</span>
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
                      type="button"
                      onClick={() => setCancel(true)}
                      className="px-8 py-4 bg-gradient-to-r from-white to-amber-50/80 dark:from-base-300 dark:to-base-400 hover:from-amber-50 hover:to-amber-100 dark:hover:from-base-400 dark:hover:to-base-500 text-amber-800 dark:text-amber-200 font-bold rounded-xl border border-amber-300/60 dark:border-amber-700/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Reset Changes
                    </button>
                  </div>
                </form>
              </section>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPromo);