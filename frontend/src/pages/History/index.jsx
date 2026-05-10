import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import loadingImage from '../../assets/images/loading.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import {
  getTransactionDetail,
  getTransactionHistory,
} from '../../utils/dataProvider/transaction';
import useDocumentTitle from '../../utils/documentTitle';
import {
  formatDateTime,
  n_f,
} from '../../utils/helpers';

function History() {
  const authInfo = useSelector((state) => state.userInfo);
  const controller = useMemo(() => new AbortController(), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [isLoading, setIsLoading] = useState(true);
  const [listMeta, setListMeta] = useState({
    totalData: "0",
    perPage: 6,
    currentPage: 1,
    totalPage: 1,
    prev: null,
    next: null,
  });
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState("");
  const initialValue = {
    isLoading: true,
    isError: false,
    id: 0,
    receiver_email: "",
    receiver_name: "",
    delivery_address: "",
    notes: "",
    status_id: 0,
    status_name: "",
    transaction_time: "",
    payment_id: 0,
    payment_name: "",
    payment_fee: 0,
    delivery_name: "",
    delivery_fee: 0,
    grand_total: 0,
    products: [],
  };
  const [dataDetail, setDataDetail] = useState({
    ...initialValue,
  });
  useDocumentTitle("History");
  const detailController = useMemo(() => new AbortController(), [detail]);

  const fetchDetail = async () => {
    if (detail === "") return;
    
    // Handle local orders (when no auth token or for local storage orders)
    if (!authInfo.token) {
      const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const found = localOrders.find((o) => String(o.id) === String(detail));
      if (found) {
        setDataDetail({
          ...found,
          products: found.products.map((p) => ({
            product_name: p.name,
            qty: p.qty,
            size: p.size_id === 2 ? "Large" : p.size_id === 3 ? "Xtra Large" : "Regular",
            subtotal: p.price * p.qty,
            product_img: p.img,
          })),
          delivery_name: "Door Delivery", // Default for local orders
          status_name: found.status_name || "Success",
          payment_name: found.payment_name,
          isLoading: false,
        });
      }
      return;
    }
    
    try {
      const result = await getTransactionDetail(
        detail,
        authInfo.token,
        detailController
      );
      setDataDetail({ isLoading: false, ...result.data.data[0] });
    } catch (error) {
      if (axios.isCancel(error)) return;
      
      // If API fails, try to find in local storage
      const localOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const found = localOrders.find((o) => String(o.id) === String(detail));
      if (found) {
        setDataDetail({
          ...found,
          products: found.products.map((p) => ({
            product_name: p.name,
            qty: p.qty,
            size: p.size_id === 2 ? "Large" : p.size_id === 3 ? "Xtra Large" : "Regular",
            subtotal: p.price * p.qty,
            product_img: p.img,
          })),
          delivery_name: "Door Delivery", // Default for local orders
          status_name: found.status_name || "Success",
          payment_name: found.payment_name,
          isLoading: false,
        });
      } else {
        setDataDetail({ ...detail, isLoading: false, isError: true });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (detail === "") return;
    fetchDetail();
    return () => {
      detailController.abort();
      setDataDetail({ ...initialValue });
    };
  }, [detail]);

  useEffect(() => {
    if (page && (page < 1 || isNaN(page))) {
      setSearchParams({ page: 1 });
      return;
    }
    window.scrollTo(0, 0);

    setIsLoading(true);
    getTransactionHistory({ page: page || 1 }, authInfo.token, controller)
      .then((result) => {
        if (result.data.data.length > 0) {
          setList(result.data.data);
          setListMeta(result.data.meta);
        } else {
          const localOrders =
            JSON.parse(localStorage.getItem("orders")) || [];
          setList(localOrders);
        }
        setIsLoading(false);
      })
      .catch(() => {
        const localOrders =
          JSON.parse(localStorage.getItem("orders")) || [];
        setList(localOrders);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      <Header />
      <Modal
        isOpen={detail !== ""}
        onClose={() => setDetail("")}
        className={"w-max max-w-md md:max-w-none"}
      >
        {dataDetail.isLoading ? (
          <img src={loadingImage} alt="loading..." className="m-2 w-8 h-8" />
        ) : (
          <section className="flex flex-col-reverse md:flex-row gap-5 md:w-[80vw] duration-300 ease-out">
            <aside className="flex-[2_2_0%] space-y-3">
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
                  Products
                </p>
                <span className="text-xs font-['Noto_Nastaliq_Urdu'] text-amber-700/80">
                  (مصنوعات)
                </span>
              </div>
              <div className="flex flex-col h-72 overflow-y-auto pr-2">
                {dataDetail.products.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex justify-between text-sm md:text-base gap-3 p-3 rounded-xl hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200 group"
                  >
                    <div>
                      <div className="avatar">
                        <div className="w-16 rounded-xl overflow-hidden border border-amber-200/30 shadow-sm/50 group-hover:shadow-amber-300/30 group-hover:border-amber-300/50 duration-200">
                          <img
                            src={
                              item.product_img
                                ? item.product_img
                                : productPlaceholder
                            }
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-amber-900 dark:text-amber-100">
                        {item.product_name} x{item.qty}
                      </p>
                      <p className="text-amber-700/80 dark:text-amber-300/80 text-sm">{item.size}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-amber-800 dark:text-amber-200">{n_f(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <aside className="flex-1 flex flex-col gap-3 p-4 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-base-200/90 border border-amber-200/30 shadow-lg/30">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold text-lg bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
                  Order Details
                </p>
                <span className="text-xs font-['Noto_Nastaliq_Urdu'] text-amber-700/80">
                  (آرڈر کی تفصیل)
                </span>
              </div>
              
              <div className="flex justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200">
                <p className="font-semibold text-amber-900 dark:text-amber-100">Grand Total</p>
                <p className="font-bold text-amber-800 dark:text-amber-200">{n_f(dataDetail.grand_total)}</p>
              </div>
              
              <div className="flex justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200">
                <p className="font-semibold text-amber-900 dark:text-amber-100">Payment Method</p>
                <p className="text-amber-700 dark:text-amber-300">{dataDetail.payment_name}</p>
              </div>
              
              <div className="flex justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200">
                <p className="font-semibold text-amber-900 dark:text-amber-100">Status</p>
                <p className={`font-medium px-2 py-1 rounded-full text-xs ${
                  dataDetail.status_name === "Success" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                  dataDetail.status_name === "Pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                  "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                }`}>
                  {dataDetail.status_name}
                </p>
              </div>
              
              <div className="flex justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200">
                <p className="font-semibold text-amber-900 dark:text-amber-100">Delivery Type</p>
                <p className="text-amber-700 dark:text-amber-300">{dataDetail.delivery_name || "Door Delivery"}</p>
              </div>
              
              <div className="flex justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200">
                <p className="font-semibold text-amber-900 dark:text-amber-100">Transaction at</p>
                <p className="text-amber-700 dark:text-amber-300">{formatDateTime(dataDetail.transaction_time)}</p>
              </div>
              
              <div className="flex flex-col p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200 mt-1">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Delivery address</p>
                <p className="break-words text-sm text-amber-700/90 dark:text-amber-300/90">
                  {dataDetail.delivery_address || "No address provided"}
                </p>
              </div>
              
              <div className="flex flex-col p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-base-300/50 duration-200 mt-1">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Notes</p>
                <p className="break-words text-sm text-amber-700/90 dark:text-amber-300/90">
                  {dataDetail.notes || "No additional notes"}
                </p>
              </div>
            </aside>
          </section>
        )}
      </Modal>
      
      <main className="min-h-screen relative">
        {/* BACKGROUND IMAGE - Same pattern as Cart page */}
        <div className="absolute inset-0 bg-cart bg-cover bg-center bg-fixed opacity-20 dark:opacity-10"></div>
        {/* GRADIENT OVERLAY - Enhanced with amber tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-amber-700/10 dark:from-base-100/95 dark:to-base-200/95"></div>
        
        <section className="global-px relative z-10 py-6 md:py-12 lg:py-20">
          <div className="flex flex-col items-center p-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-center bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent drop-shadow-[0px_4px_8px_rgba(120,53,15,0.3)]">
              Your Coffee Journey
            </h2>
            <p className="text-amber-800/90 dark:text-amber-200/90 text-lg mb-1">
              Let&#8242;s see what you have bought!
            </p>
            <p className="text-amber-700/80 dark:text-amber-300/80 text-sm font-['Noto_Nastaliq_Urdu']">
              آپ نے کیا خریدا ہے دیکھیں
            </p>
          </div>
          
          {!isLoading ? (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-7">
                {list.map((item, key) => (
                  <div
                    className="flex flex-row px-5 py-6 backdrop-blur-xl bg-white/90 dark:bg-base-200/90 hover:bg-amber-50/80 dark:hover:bg-base-300/80 cursor-pointer duration-300 ease-out rounded-2xl gap-5 relative group border border-amber-200/30 shadow-lg/30 hover:shadow-xl/40 hover:border-amber-300/50 hover:scale-[1.02]"
                    onClick={() => setDetail(item.id)}
                    key={key}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-sm group-hover:blur-md duration-300"></div>
                      <img
                        src={
                          item.products && item.products[0] && item.products[0].product_img
                            ? item.products[0].product_img
                            : (item.products && item.products[0] && item.products[0].img)
                            ? item.products[0].img
                            : productPlaceholder
                        }
                        alt=""
                        width="100px"
                        className="rounded-full aspect-square object-cover border-2 border-amber-200/50 group-hover:border-amber-300/70 duration-200 relative z-10"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center w-auto">
                      <div className="font-bold text-xl relative w-full text-amber-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-50 duration-200">
                        {item.products && item.products[0] 
                          ? (item.products[0].product_name || item.products[0].name) 
                          : "Local Order"}
                        {item.products && item.products.length > 1 && (
                          <p className="absolute text-sm font-medium top-0 right-0 backdrop-blur-md bg-white/80 dark:bg-base-300/80 px-2 py-1 rounded-full duration-300 group-hover:bg-amber-100/80 dark:group-hover:bg-base-400/80 text-amber-800 dark:text-amber-200 border border-amber-200/50">
                            + {item.products.length - 1} more
                          </p>
                        )}
                      </div>
                      <p className="text-amber-800 dark:text-amber-200 font-bold text-lg mt-1">
                        {n_f(item.grand_total)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-sm font-medium px-2 py-1 rounded-full ${
                          (item.status_name || "Success") === "Success" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                          (item.status_name || "Success") === "Pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                          "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
                        }`}>
                          {item.status_name || "Success"}
                        </p>
                        <span className="text-xs text-amber-600/80 dark:text-amber-400/80 opacity-0 group-hover:opacity-100 duration-300">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
              
              {list.length > 0 && (
                <section className="flex justify-center mt-10">
                  <div className="join backdrop-blur-xl bg-white/80 dark:bg-base-200/80 rounded-xl p-1 border border-amber-200/30 shadow-lg/30">
                    {listMeta.prev && (
                      <button
                        onClick={() => {
                          setSearchParams({
                            page: Number(listMeta.currentPage) - 1,
                          });
                        }}
                        className="join-item btn bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 border-0 text-white px-4 py-2 duration-200"
                      >
                        «
                      </button>
                    )}
                    <button className="join-item btn bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border-0 text-white px-6 py-2 duration-200 font-medium">
                      Page {listMeta.currentPage}
                    </button>
                    {listMeta.next && (
                      <button
                        onClick={() => {
                          setSearchParams({
                            page: Number(listMeta.currentPage) + 1,
                          });
                        }}
                        className="join-item btn bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 border-0 text-white px-4 py-2 duration-200"
                      >
                        »
                      </button>
                    )}
                  </div>
                </section>
              )}
              
              {list.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 backdrop-blur-xl bg-white/80 dark:bg-base-200/80 rounded-3xl border border-amber-200/30 shadow-xl/30">
                  <div className="text-6xl mb-4">☕</div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-amber-700/90 dark:text-amber-300/90 text-center max-w-md">
                    Your coffee journey begins here! Start exploring our premium selection.
                  </p>
                  <p className="text-sm font-['Noto_Nastaliq_Urdu'] text-amber-600/80 dark:text-amber-400/80 mt-2">
                    آپ کا کافی کا سفر یہاں سے شروع ہوتا ہے
                  </p>
                </div>
              )}
            </>
          ) : (
            <section className="flex justify-center items-center py-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-800/10 rounded-full blur-xl animate-pulse"></div>
                <img src={loadingImage} className="w-24 h-24 relative z-10 invert dark:invert-0 opacity-90" alt="Loading..." />
              </div>
            </section>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default History;