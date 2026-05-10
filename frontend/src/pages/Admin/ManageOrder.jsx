import React, { useEffect, useMemo, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
// import _ from "lodash";
import { connect } from "react-redux";

import loadingImage from "../../assets/images/loading.svg";
import productPlaceholder from "../../assets/images/placeholder-image.webp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import {
  getTransactions,
  setTransactionDone,
} from "../../utils/dataProvider/transaction";
import useDocumentTitle from "../../utils/documentTitle";
import { getEmailUsername, n_f } from "../../utils/helpers";

const ManageOrder = (props) => {
  const carouselRef = useRef(null);
  const [focusedCard, setFocusedCard] = useState(0);
  const [order, setOrder] = useState([]);
  const [done, setDone] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  useDocumentTitle("Manage Order");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.offsetWidth;
      const focusedCardIndex = Math.round(scrollPosition / cardWidth);
      setFocusedCard(focusedCardIndex);
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  const scrollLeft = () => {
    const cardWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollLeft -= cardWidth;
  };

  const scrollRight = () => {
    const cardWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollLeft += cardWidth;
  };
  const controller = useMemo(() => new AbortController(), []);
  const fetch = () => {
    setLoading(true);
    getTransactions({ page: 1 }, props.userInfo.token, controller)
      .then((result) => {
        setOrder(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetch();
  }, []);
  const disabled = doneLoading;
  const doneHandler = () => {
    if (!done) return setDone(true);
    setDoneLoading(true);
    setDone(false);
    setTransactionDone(order[focusedCard].id, props.userInfo.token, controller)
      .then((result) => {
        toast.success("Success process transactions");
        setDoneLoading(false);
        fetch();
      })
      .catch((err) => {
        setDoneLoading(false);
        if (axios.isCancel(err)) return;
        toast.error("Error while processing");
      });
  };
  const closeDoneModal = () => setDone(false);
  return (
    <>
      <Modal isOpen={done} onClose={closeDoneModal}>
        <div className="backdrop-blur-xl bg-white/80 p-8 rounded-2xl shadow-lg shadow-black/10">
          <p className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Are you sure to mark this order as processed?
          </p>
          <p className="text-amber-700 font-['Noto_Nastaliq_Urdu'] text-center mb-6">
            کیا آپ واقعی اس آرڈر کو مکمل کرنا چاہتے ہیں؟
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={doneHandler} 
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-800 transition-all duration-300 shadow-md shadow-amber-500/30"
            >
              Yes / ہاں
            </button>
            <button 
              onClick={closeDoneModal} 
              className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-500 hover:to-gray-700 transition-all duration-300"
            >
              No / نہیں
            </button>
          </div>
        </div>
      </Modal>
      <Header />
      {loading ? (
        <>
          <main className="py-20 flex flex-col gap-6 items-center justify-center bg-gradient-to-br from-amber-50/90 to-amber-100/80 backdrop-blur-sm">
            <img src={loadingImage} alt="Loading..." className="w-24 h-24" />
            <p className="text-center text-amber-800 font-medium">
              Please wait, fetching data...
            </p>
            <p className="text-amber-700/70 font-['Noto_Nastaliq_Urdu']">
              براہ کرم انتظار کریں، ڈیٹا لیا جا رہا ہے...
            </p>
          </main>
        </>
      ) : (
        <main className="bg-cart bg-cover bg-center min-h-screen">
          <div className="global-px space-y-6 py-12 bg-gradient-to-b from-black/20 via-transparent to-transparent">
            <section className="bg-gradient-to-r from-amber-800/90 via-amber-700/90 to-amber-600/90 backdrop-blur-xl rounded-2xl p-6 max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-white text-center lg:text-left drop-shadow-lg">
                Finish your customer order now.
              </h1>
            </section>
            <section className="flex flex-col md:flex-row lg:gap-16 gap-8">
              <aside className="flex-1 flex">
                <section className="flex bg-white/90 backdrop-blur-xl rounded-2xl p-4 lg:p-6 flex-col w-full relative border border-amber-200/50 shadow-xl shadow-black/10">
                  <button
                    disabled={focusedCard === 0}
                    className="absolute bg-gradient-to-r from-amber-600 to-amber-800 text-white flex items-center justify-center rounded-full w-10 h-10 top-6 left-6 hover:from-amber-700 hover:to-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-600/30"
                    onClick={scrollLeft}
                  >
                    &lt;
                  </button>
                  <button
                    disabled={focusedCard === order.length - 1}
                    className="absolute bg-gradient-to-r from-amber-600 to-amber-800 text-white flex items-center justify-center rounded-full w-10 h-10 top-6 right-6 hover:from-amber-700 hover:to-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-600/30"
                    onClick={scrollRight}
                  >
                    &gt;
                  </button>
                  <div
                    className="carousel rounded-box max-w-md lg:max-w-lg"
                    ref={carouselRef}
                  >
                    {order.map((item, key) => (
                      <div className="carousel-item w-full" key={key}>
                        <section className="flex flex-col items-center w-full py-6 p-4">
                          <div className="w-full mb-4">
                            <p className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-center text-2xl md:text-3xl">
                              Delivery Order
                            </p>
                            <p className="text-center text-gray-600">
                              for{" "}
                              <span className="font-semibold text-amber-700">
                                {item.receiver_name ||
                                  getEmailUsername(item.receiver_email)}
                              </span>
                            </p>
                          </div>
                          <section className="flex flex-col h-96 overflow-y-auto w-full gap-5 my-4 p-2 bg-amber-50/50 rounded-xl border border-amber-100">
                            {item.products.map((product, key) => (
                              <div
                                className="flex flex-row gap-4 lg:gap-6 w-full lg:text-lg items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-100/50 hover:border-amber-200/80 transition-all duration-200"
                                key={key}
                              >
                                <aside className="flex-1">
                                  <div className="avatar">
                                    <div className="w-20 md:w-28 rounded-xl overflow-hidden border-2 border-amber-200/50 shadow-sm">
                                      <img
                                        src={
                                          product.product_img ||
                                          productPlaceholder
                                        }
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                  </div>
                                </aside>
                                <aside className="flex-[2_2_0%]">
                                  <p className="font-bold text-gray-800 text-lg">
                                    {product.product_name}
                                  </p>
                                  <div className="flex gap-3 mt-1">
                                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                                      x {product.qty}
                                    </span>
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                      {product.size}
                                    </span>
                                  </div>
                                </aside>
                                <aside className="flex-1">
                                  <p className="text-right font-bold text-xl text-amber-800">
                                    {n_f(product.subtotal)}
                                  </p>
                                </aside>
                              </div>
                            ))}
                          </section>
                          <div className="border-b w-full border-amber-200/50 my-4"></div>

                          <section className="flex flex-col w-full my-4 space-y-3">
                            <div className="flex flex-row text-gray-700 lg:text-lg">
                              <p className="flex-[2_2_0%] font-medium">Subtotal</p>
                              <p className="flex-1 lg:flex-none text-right font-semibold">
                                {n_f(item.grand_total - 30000)}
                              </p>
                            </div>
                            <div className="flex flex-row text-gray-700 lg:text-lg">
                              <p className="flex-[2_2_0%] font-medium">Tax & Fees</p>
                              <p className="flex-1 lg:flex-none text-right font-semibold">
                                20,000
                              </p>
                            </div>
                            <div className="flex flex-row text-gray-700 lg:text-lg">
                              <p className="flex-[2_2_0%] font-medium">Shipping</p>
                              <p className="flex-1 lg:flex-none text-right font-semibold">
                                10,000
                              </p>
                            </div>
                            <div className="border-t border-amber-300 pt-4 mt-2">
                              <div className="flex flex-row text-xl font-bold">
                                <p className="flex-[2_2_0%] text-gray-800">Total</p>
                                <p className="flex-initial lg:flex-none text-2xl bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
                                  {n_f(item.grand_total)}
                                </p>
                              </div>
                            </div>
                          </section>
                        </section>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
              <aside className="flex-1 flex flex-col gap-6">
                <section className="relative items-center">
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-white drop-shadow-lg text-center md:text-left">
                    Address details
                    <span className="block text-lg font-normal text-amber-100 font-['Noto_Nastaliq_Urdu'] mt-1">
                      پتے کی تفصیلات
                    </span>
                  </h2>
                </section>
                <section className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 space-y-4 border border-amber-200/50 shadow-lg shadow-black/10">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="font-semibold text-gray-800">
                          {order[focusedCard]?.delivery_address || "Jln. Garuda 536"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-amber-100/50 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-semibold text-gray-800">
                            {order[focusedCard]?.phone_number || "0896726232"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-amber-100/50 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Order Notes</p>
                          <p className={`font-medium ${order[focusedCard]?.notes ? 'text-gray-800' : 'text-gray-400 italic'}`}>
                            {order[focusedCard]?.notes || "No additional notes provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <button
                  disabled={disabled}
                  onClick={doneHandler}
                  className={`
                    ${doneLoading && "loading"} 
                    w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white py-4 px-6 font-bold text-xl rounded-2xl
                    hover:from-amber-700 hover:via-amber-800 hover:to-amber-900
                    disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600
                    transition-all duration-500 ease-out
                    shadow-xl shadow-amber-600/30 hover:shadow-amber-700/40
                    transform hover:-translate-y-1
                    border border-amber-500/30
                  `}
                >
                  {doneLoading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span className="block">Mark as Done</span>
                      <span className="block text-amber-100 text-sm font-normal font-['Noto_Nastaliq_Urdu'] mt-1">
                        آرڈر مکمل کریں
                      </span>
                    </>
                  )}
                </button>
              </aside>
            </section>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);