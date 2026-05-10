import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { isEmpty } from 'lodash';
import { toast } from 'react-hot-toast';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import loadingImage from '../../assets/images/loading.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { cartActions } from '../../redux/slices/cart.slice';
import { createTransaction } from '../../utils/dataProvider/transaction';
import useDocumentTitle from '../../utils/documentTitle';
import { n_f } from '../../utils/helpers';

// Helper function to save order locally
const saveOrderLocally = (order) => {
  const existing = JSON.parse(localStorage.getItem("orders")) || [];
  localStorage.setItem(
    "orders",
    JSON.stringify([order, ...existing])
  );
};

function Cart() {
  const userInfo = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const cartRedux = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.profile);
  const [remove, setRemove] = useState({
    product_id: "",
    size_id: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = cartRedux.list;
  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    payment: "",
    delivery_address: "",
    notes: "",
    phone_number: "",
  });
  useDocumentTitle("My Cart");

  function onChangeForm(e) {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    if (profile.isFulfilled) {
      setForm({
        ...form,
        phone_number: profile.data?.phone_number,
        delivery_address: profile.data?.address,
      });
    }
  }, [profile]);

  const Loading = (props) => {
    return (
      <section className="min-h-[80vh] flex items-center justify-center flex-col bg-gradient-to-br from-amber-50/80 to-white/90 dark:from-base-100/95 dark:to-base-200/95 backdrop-blur-xl">
        <div className="animate-pulse">
          <img src={loadingImage} alt="" className="w-24 h-24" />
        </div>
        <p className="mt-6 font-['Noto_Nastaliq_Urdu'] text-amber-700/90 dark:text-amber-400/90 text-xl">
          لوڈ ہو رہا ہے...
        </p>
        <p className="text-amber-600/70 dark:text-amber-500/70 text-sm mt-2 animate-pulse">
          Preparing your coffee experience
        </p>
      </section>
    );
  };

  const toggleEdit = () => setEditMode(!editMode);
  const saveEditInfo = () => {
    toggleEdit();
  };

  const disabled = form.payment === "" || form.delivery_address === "";
  const controller = useMemo(() => new AbortController());
  
  const payHandler = () => {
    if (disabled) return;

    if (cart.length < 1) {
      toast.error("Add at least 1 product to your cart");
      return;
    }

    const order = {
      id: Date.now(),
      products: cart,
      grand_total:
        cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0) + 30000,
      status_name: "Success",
      payment_name:
        form.payment === "1"
          ? "Card"
          : form.payment === "2"
          ? "Bank"
          : "Cash on Delivery",
      delivery_address: form.delivery_address,
      notes: form.notes,
      transaction_time: new Date().toISOString(),
    };

    saveOrderLocally(order);
    toast.success("Payment successful!");
    dispatch(cartActions.resetCart());
    navigate("/history");
  };

  const closeRemoveModal = () => {
    setRemove({ product_id: "", size_id: "" });
  };
  
  return (
    <>
      <Modal
        isOpen={remove.product_id !== "" && remove.size_id !== ""}
        onClose={() => setRemove({ product_id: "", size_id: "" })}
        className="flex flex-col gap-y-6 p-8 backdrop-blur-2xl bg-gradient-to-br from-white/98 to-amber-50/60 dark:from-base-200/98 dark:to-amber-900/20 rounded-2xl border border-amber-200/60 dark:border-amber-700/40 shadow-2xl/40 animate-fadeIn"
      >
        <div className="text-center space-y-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800/40 dark:to-amber-900/30 mb-2">
            <svg className="w-8 h-8 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
            Remove Item?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Are you sure you want to remove this item from your cart?
          </p>
          <p className="font-['Noto_Nastaliq_Urdu'] text-amber-700/90 dark:text-amber-400/90 text-base leading-relaxed">
            کیا آپ واقعی یہ آئٹم کارٹ سے ہٹانا چاہتے ہیں؟
          </p>
        </div>
        <div className="mx-auto space-x-4 flex">
          <button
            onClick={() => {
              dispatch(
                cartActions.removeFromCart({
                  product_id: remove.product_id,
                  size_id: remove.size_id,
                })
              );
              setRemove({ product_id: "", size_id: "" });
            }}
            className="btn px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Yes, Remove
            </span>
          </button>
          <div 
            onClick={closeRemoveModal} 
            className="btn px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-base-300 dark:to-base-400 hover:from-gray-200 hover:to-gray-400 dark:hover:from-base-400 dark:hover:to-base-500 text-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-300/60 dark:border-base-400/50"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Keep Item
            </span>
          </div>
        </div>
      </Modal>
      <Header />

      <main className="min-h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cart bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-700/10 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <div className="global-px space-y-8 py-12 relative z-10">
          <section className="text-center md:text-left relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-600/20 to-amber-800/10 rounded-full blur-2xl"></div>
            <h1 className="text-white lg:text-5xl text-4xl font-bold drop-shadow-2xl dark:text-white mb-3 relative">
              <span className="bg-gradient-to-r from-white via-amber-100 to-amber-50 bg-clip-text text-transparent">
                Checkout Your Order
              </span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-6">
              <div>
                <p className="text-amber-100/80 dark:text-amber-200/80 text-lg max-w-2xl">
                  Complete your journey with the perfect cup
                </p>
              </div>
              {cart.length > 0 && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-800/30 to-amber-900/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-amber-700/30">
                  <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <span className="text-white font-semibold">{cart.length} Items</span>
                </div>
              )}
            </div>
          </section>
          
          <section className="flex flex-col md:flex-row lg:gap-16 gap-12">
            {/* Order Summary Section */}
            <aside className="flex-1 flex">
              <section className="flex bg-gradient-to-br from-white/98 to-amber-50/60 dark:from-base-200/98 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-7 lg:p-9 flex-col w-full border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30 hover:shadow-3xl/40 transition-shadow duration-500">
                <div className="w-full mb-6 lg:mb-8 text-center relative">
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-amber-600/20 to-amber-800/10 rounded-full blur-xl"></div>
                  <p className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-3xl lg:text-4xl relative">
                    Order Summary
                  </p>
                  <div className="flex items-center justify-center mt-3 gap-3">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                    <p className="text-center text-amber-700/90 dark:text-amber-400/90 font-['Noto_Nastaliq_Urdu'] text-base">
                      آرڈر کا خلاصہ
                    </p>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Cart Items - FIXED LAYOUT */}
                <section className="flex w-full flex-col gap-6 my-6">
                  {cart.map((list, idx) => {
                    let sizeName;
                    switch (list.size_id) {
                      case 2:
                        sizeName = "Large";
                        break;
                      case 3:
                        sizeName = "Xtra Large";
                        break;
                      default:
                        sizeName = "Regular";
                        break;
                    }
                    return (
                      <div
                        className="flex items-start gap-5 lg:gap-6 w-full relative p-5 rounded-2xl bg-gradient-to-r from-white/70 via-white/50 to-white/30 dark:from-base-300/50 dark:via-base-300/40 dark:to-base-300/30 backdrop-blur-md border border-amber-200/50 dark:border-amber-800/40 hover:border-amber-400/70 dark:hover:border-amber-600/60 transition-all duration-400 ease-out group hover:shadow-lg/30"
                        key={idx}
                      >
                        {/* Product Image - Fixed size and position */}
                        <div className="flex-shrink-0 relative">
                          <img
                            src={isEmpty(list.img) ? productPlaceholder : list.img}
                            alt={list.name}
                            className="w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-2xl shadow-xl group-hover:shadow-2xl/40 transition-all duration-400"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-2xl"></div>
                        </div>
                        
                        {/* Product Details - Better organized */}
                        <div className="flex-1 min-w-0 space-y-3 dark:text-gray-200">
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-xl group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300 truncate">
                              {list.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Freshly brewed perfection</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-50 dark:from-base-400 dark:to-base-300 px-3 py-2 rounded-xl">
                              <button
                                onClick={() => {
                                  if (list.qty - 1 < 1)
                                    return setRemove({
                                      product_id: list.product_id,
                                      size_id: list.size_id,
                                    });
                                  dispatch(
                                    cartActions.decrementQty({
                                      product_id: list.product_id,
                                      size_id: list.size_id,
                                    })
                                  );
                                }}
                                className="rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold w-8 h-8 flex items-center justify-center transition-all duration-300 ease-out shadow-md/60 hover:shadow-lg/70 transform hover:scale-110 active:scale-95"
                              >
                                -
                              </button>
                              <p className="w-10 text-center font-bold text-lg">x {list.qty}</p>
                              <button
                                onClick={() =>
                                  dispatch(
                                    cartActions.incrementQty({
                                      product_id: list.product_id,
                                      size_id: list.size_id,
                                    })
                                  )
                                }
                                className="rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold w-8 h-8 flex items-center justify-center transition-all duration-300 ease-out shadow-md/60 hover:shadow-lg/70 transform hover:scale-110 active:scale-95"
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold bg-gradient-to-r from-amber-100/80 to-amber-50/80 dark:from-amber-900/30 dark:to-amber-800/20 px-4 py-2 rounded-full border border-amber-300/50 dark:border-amber-700/30">
                                {sizeName}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price and Remove Button - Better aligned */}
                        <div className="flex flex-col items-end justify-between min-h-[112px]">
                          <button
                            onClick={() =>
                              setRemove({
                                product_id: list.product_id,
                                size_id: list.size_id,
                              })
                            }
                            className="rounded-full h-8 w-8 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold text-sm flex items-center justify-center transition-all duration-300 ease-out shadow-md/60 hover:shadow-lg/70 transform hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-90"
                          >
                            ✕
                          </button>
                          
                          <div className="text-right">
                            <p className="text-gray-900 dark:text-white font-bold text-xl">
                              {n_f(Number(list.price) * Number(list.qty))}
                            </p>
                            <p className="text-sm text-amber-600 dark:text-amber-500 font-medium mt-1">
                              {n_f(Number(list.price))} each
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>
                
                <hr className="dark:border-base-300/60 border-amber-200/40 my-4" />
                
                {/* Order Totals - FIXED: Removed PKR prefix */}
                <section className="flex flex-col w-full my-6 dark:text-gray-200 space-y-4">
                  <div className="flex flex-row lg:text-lg items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r from-amber-50/50 to-transparent dark:hover:from-amber-900/20 transition-all duration-300">
                    <p className="flex-[2_2_0%] text-gray-700 dark:text-gray-300">Subtotal</p>
                    <p className="flex-1 lg:flex-none text-right font-medium text-gray-900 dark:text-white">
                      {n_f(cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0))}
                    </p>
                  </div>
                  <div className="flex flex-row lg:text-lg items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r from-amber-50/50 to-transparent dark:hover:from-amber-900/20 transition-all duration-300">
                    <p className="flex-[2_2_0%] text-gray-700 dark:text-gray-300">Tax & Fees</p>
                    <p className="flex-1 lg:flex-none text-right font-medium text-gray-900 dark:text-white">20,000</p>
                  </div>
                  <div className="flex flex-row lg:text-lg items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r from-amber-50/50 to-transparent dark:hover:from-amber-900/20 transition-all duration-300">
                    <p className="flex-[2_2_0%] text-gray-700 dark:text-gray-300">Shipping</p>
                    <p className="flex-1 lg:flex-none text-right font-medium text-gray-900 dark:text-white">10,000</p>
                  </div>
                  
                  <hr className="dark:border-base-300/60 border-amber-200/40 my-6" />
                  
                  <div className="flex flex-row lg:text-2xl font-bold py-5 px-6 rounded-2xl bg-gradient-to-r from-amber-100/80 via-amber-50/60 to-white/50 dark:from-amber-900/30 dark:via-amber-800/20 dark:to-base-300/20 border border-amber-300/60 dark:border-amber-700/40 shadow-lg/30 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl/40">
                    <div className="flex-[2_2_0%]">
                      <p className="text-gray-900 dark:text-white">Total Amount</p>
                      <p className="text-sm font-normal text-amber-700 dark:text-amber-400 mt-1">Including all charges</p>
                    </div>
                    <div className="flex-initial lg:flex-none text-right">
                      <p className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-extrabold text-3xl">
                        {n_f(cart.reduce((acc, cur) => acc + cur.price * cur.qty, 0) + 30000)}
                      </p>
                      <p className="text-xs font-normal text-gray-600 dark:text-gray-400 mt-1">VAT included</p>
                    </div>
                  </div>
                </section>
              </section>
            </aside>
            
            {/* Checkout Details Section */}
            <aside className="flex-1 flex flex-col gap-8">
              <section className="text-center md:text-left relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-white text-3xl lg:text-4xl font-bold drop-shadow-2xl dark:text-white">
                      Delivery Details
                    </h2>
                    <p className="text-amber-100/90 dark:text-amber-200/90 text-base mt-2">
                      Where should we deliver your coffee experience?
                    </p>
                  </div>
                  <button
                    onClick={editMode ? saveEditInfo : toggleEdit}
                    className={`relative overflow-hidden group px-6 py-3 rounded-xl font-semibold transition-all duration-500 ease-out transform hover:-translate-y-1 active:translate-y-0 ${
                      editMode 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 shadow-lg/60 hover:shadow-xl/70'
                        : 'bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 shadow-lg/60 hover:shadow-xl/70'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-white">
                      {editMode ? (
                        <>
                          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Save Details
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                          Edit Details
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                  </button>
                </div>
                <p className="text-amber-100/70 dark:text-amber-200/70 text-sm mt-2 font-['Noto_Nastaliq_Urdu']">
                  اپنا پتہ درج کریں
                </p>
              </section>
              
              <section className="bg-gradient-to-br from-white/98 to-amber-50/60 dark:from-base-200/98 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-7 lg:p-8 space-y-6 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30 transition-all duration-500 hover:shadow-3xl/40">
                <div className="space-y-5">
                  <div className="flex gap-3 dark:text-gray-200 items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label className="block text-amber-700 dark:text-amber-400 font-semibold mb-2">Delivery Address</label>
                      <input
                        value={form.delivery_address}
                        onChange={onChangeForm}
                        disabled={!editMode}
                        className={`outline-none w-full bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                          editMode 
                            ? 'border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm'
                            : 'border-gray-300/50 dark:border-base-400/50'
                        }`}
                        name="delivery_address"
                        placeholder="Enter your complete delivery address..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <label className="block text-amber-700 dark:text-amber-400 font-semibold">Special Instructions</label>
                    </div>
                    <input
                      value={form.notes}
                      onChange={onChangeForm}
                      disabled={!editMode}
                      className={`outline-none w-full bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                        editMode 
                          ? 'border-amber-400/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 shadow-sm'
                          : 'border-gray-300/50 dark:border-base-400/50'
                      }`}
                      name="notes"
                      placeholder="Any special delivery instructions or notes..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <label className="block text-amber-700 dark:text-amber-400 font-semibold">Contact Number</label>
                    </div>
                    <input
                      value={form.phone_number}
                      onChange={onChangeForm}
                      disabled
                      className="outline-none w-full bg-gradient-to-r from-gray-100/90 to-gray-200/80 dark:from-base-400/70 dark:to-base-500/60 text-gray-900 dark:text-gray-200 px-4 py-3.5 rounded-xl border border-gray-300/70 dark:border-base-500/50 cursor-not-allowed shadow-inner"
                      name="phone_number"
                      placeholder="Your registered phone number..."
                    />
                  </div>
                </div>
              </section>
              
              <section className="text-center md:text-left">
                <h2 className="text-white text-3xl lg:text-4xl font-bold drop-shadow-2xl dark:text-white mb-3">
                  Payment Method
                </h2>
                <p className="text-amber-100/90 dark:text-amber-200/90 text-base">
                  Choose how you&apos;d like to pay for your order
                </p>
                <p className="text-amber-100/70 dark:text-amber-200/70 text-sm mt-1 font-['Noto_Nastaliq_Urdu']">
                  ادائیگی کا طریقہ منتخب کریں
                </p>
              </section>
              
              <section className="bg-gradient-to-br from-white/98 to-amber-50/60 dark:from-base-200/98 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-7 lg:p-8 space-y-5 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30 transition-all duration-500 hover:shadow-3xl/40">
                <PaymentOption
                  id="paymentCard"
                  value="1"
                  label="Credit/Debit Card"
                  description="Pay securely with your card"
                  icon={
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="10" className="fill-amber-600" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M13 15C13 14.4696 13.2107 13.9609 13.5858 13.5858C13.9609 13.2107 14.4696 13 15 13H27C27.5304 13 28.0391 13.2107 28.4142 13.5858C28.7893 13.9609 29 14.4696 29 15V23C29 23.5304 28.7893 24.0391 28.4142 24.4142C28.0391 24.7893 27.5304 25 27 25H15C14.4696 25 13.9609 24.7893 13.5858 24.4142C13.2107 24.0391 13 23.5304 13 23V15ZM15.5 16C15.3674 16 15.2402 16.0527 15.1464 16.1464C15.0527 16.2402 15 16.3674 15 16.5V17.5C15 17.6326 15.0527 17.7598 15.1464 17.8536C15.2402 17.9473 15.3674 18 15.5 18H17.5C17.6326 18 17.7598 17.9473 17.8536 17.8536C17.9473 17.7598 18 17.6326 18 17.5V16.5C18 16.3674 17.9473 16.2402 17.8536 16.1464C17.7598 16.0527 17.6326 16 17.5 16H15.5ZM15.5 19C15.3674 19 15.2402 19.0527 15.1464 19.1464C15.0527 19.2402 15 19.3674 15 19.5C15 19.6326 15.0527 19.7598 15.1464 19.8536C15.2402 19.9473 15.3674 20 15.5 20H20.5C20.6326 20 20.7598 19.9473 20.8536 19.8536C20.9473 19.7598 21 19.6326 21 19.5C21 19.3674 20.9473 19.2402 20.8536 19.1464C20.7598 19.0527 20.6326 19 20.5 19H15.5ZM15.5 21C15.3674 21 15.2402 21.0527 15.1464 21.1464C15.0527 21.2402 15 21.3674 15 21.5C15 21.6326 15.0527 21.7598 15.1464 21.8536C15.2402 21.9473 15.3674 22 15.5 22H16.5C16.6326 22 16.7598 21.9473 16.8536 21.8536C16.9473 21.7598 17 21.6326 17 21.5C17 21.3674 16.9473 21.2402 16.8536 21.1464C16.7598 21.0527 16.6326 21 16.5 21H15.5ZM18.5 21C18.3674 21 18.2402 21.0527 18.1464 21.1464C18.0527 21.2402 18 21.3674 18 21.5C18 21.6326 18.0527 21.7598 18.1464 21.8536C18.2402 21.9473 18.3674 22 18.5 22H19.5C19.6326 22 19.7598 21.9473 19.8536 21.8536C19.9473 21.7598 20 21.6326 20 21.5C20 21.3674 19.9473 21.2402 19.8536 21.1464C19.7598 21.0527 19.6326 21 19.5 21H18.5ZM21.5 21C21.3674 21 21.2402 21.0527 21.1464 21.1464C21.0527 21.2402 21 21.3674 21 21.5C21 21.6326 21.0527 21.7598 21.1464 21.8536C21.2402 21.9473 21.3674 22 21.5 22H22.5C22.6326 22 22.7598 21.9473 22.8536 21.8536C22.9473 21.7598 23 21.6326 23 21.5C23 21.3674 22.9473 21.2402 22.8536 21.1464C22.7598 21.0527 22.6326 21 22.5 21H21.5ZM24.5 21C24.3674 21 24.2402 21.0527 24.1464 21.1464C24.0527 21.2402 24 21.3674 24 21.5C24 21.6326 24.0527 21.7598 24.1464 21.8536C24.2402 21.9473 24.3674 22 24.5 22H25.5C25.6326 22 25.7598 21.9473 25.8536 21.8536C25.9473 21.7598 26 21.6326 26 21.5C26 21.3674 25.9473 21.2402 25.8536 21.1464C25.7598 21.0527 25.6326 21 25.5 21H24.5Z" fill="white" />
                    </svg>
                  }
                  form={form}
                  onChange={onChangeForm}
                />
                
                <PaymentOption
                  id="paymentBank"
                  value="2"
                  label="Bank Transfer"
                  description="Direct bank transfer"
                  icon={
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="10" className="fill-amber-700" />
                      <path d="M20 11L13 15V16H27V15L20 11ZM15 17L14.8 24H17.3L17 17H15ZM19 17L18.8 24H21.3L21 17H19ZM23 17L22.8 24H25.3L25 17H23ZM13 27H27V25H13V27Z" fill="white" />
                    </svg>
                  }
                  form={form}
                  onChange={onChangeForm}
                />
                
                <PaymentOption
                  id="paymentCod"
                  value="3"
                  label="Cash on Delivery"
                  description="Pay when you receive your order"
                  icon={
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="10" className="fill-amber-500" />
                      <circle cx="20" cy="20" r="8" fill="#6A4029" />
                      <path d="M20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25C22.7614 25 25 22.7614 25 20C25 17.2386 22.7614 15 20 15ZM20 23C18.3431 23 17 21.6569 17 20C17 18.3431 18.3431 17 20 17C21.6569 17 23 18.3431 23 20C23 21.6569 21.6569 23 20 23Z" fill="white" />
                      <path d="M19 18H21V22H19V18Z" fill="white" />
                    </svg>
                  }
                  form={form}
                  onChange={onChangeForm}
                />
              </section>
              
              <button
                disabled={disabled}
                onClick={payHandler}
                className={`${isLoading && "loading"} w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 disabled:from-gray-400/80 disabled:to-gray-600/80 disabled:cursor-not-allowed text-white py-5 px-6 font-bold text-xl rounded-2xl transition-all duration-500 ease-out shadow-2xl/50 hover:shadow-3xl/60 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {!isLoading ? (
                  <>
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span className="relative">
                      Confirm and Pay
                      <span className="block text-amber-200/90 text-sm font-normal font-['Noto_Nastaliq_Urdu'] mt-0.5">
                        (ادائیگی کی تصدیق کریں)
                      </span>
                    </span>
                    <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </>
                ) : (
                  "Processing..."
                )}
              </button>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Payment Option Component
function PaymentOption({ id, value, label, description, icon, form, onChange }) {
  return (
    <div className="flex gap-4 items-center p-4 rounded-2xl hover:bg-gradient-to-r from-amber-50/70 to-amber-100/50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20 transition-all duration-400 ease-out cursor-pointer group border border-transparent hover:border-amber-300/50 dark:hover:border-amber-700/40">
      <input
        type="radio"
        className="accent-amber-600 dark:accent-amber-500 w-6 h-6 cursor-pointer transform group-hover:scale-110 transition-transform duration-300"
        name="payment"
        value={value}
        id={id}
        checked={form.payment === value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="flex items-center gap-4 dark:text-gray-200 cursor-pointer flex-1"
      >
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 group-hover:from-amber-500/30 group-hover:to-amber-700/30 transition-all duration-400 shadow-md/40">
          {icon}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300">{label}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        {form.payment === value && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center animate-fadeIn">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </label>
    </div>
  );
}

export default Cart;