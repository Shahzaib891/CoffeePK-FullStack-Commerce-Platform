/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';

import toast from 'react-hot-toast';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  NavLink,
  useNavigate,
  useParams,
} from 'react-router-dom';

import loadingImage from '../../assets/images/loading.svg';
import lostImage from '../../assets/images/not_found.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { cartActions } from '../../redux/slices/cart.slice';
import { getProductbyId } from '../../utils/dataProvider/products';
import useDocumentTitle from '../../utils/documentTitle';

function ProductDetail(props) {
  const [form, setForm] = useState({
    delivery: 0,
    count: 1,
    now: 0,
    time: "",
    size: 1,
  });
  const [cart, setCart] = useState([]);
  const [detail, setDetail] = useState({
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { productId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const cartRedux = useSelector((state) => state.cart);
  const filteredCart = cartRedux.list.filter(
    (obj) => String(obj.product_id) === String(productId)
  );

  const controller = React.useMemo(() => new AbortController(), []);

  useEffect(() => {
    setIsLoading(true);
    getProductbyId(productId, controller)
      .then((response) => {
        setDetail(response.data.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setNotFound(true);
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const NotFound = () => {
    return (
      <section className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-amber-800/5 to-amber-700/5 dark:from-base-100/95 dark:to-base-200/95"></div>

        <div className="global-px py-20 relative z-10 flex flex-col items-center justify-center text-center">
          <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30">
            <img src={lostImage} alt="404" className="w-80 h-auto mx-auto opacity-90" />
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-3xl lg:text-4xl">
              Product Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We couldn&apos;t find the coffee you&apos;re looking for. It might be brewing elsewhere!
            </p>
            <p className="text-amber-700/90 dark:text-amber-400/90 font-['Noto_Nastaliq_Urdu'] text-xl">
              معذرت، یہ پروڈکٹ دستیاب نہیں ہے
            </p>

            <NavLink to={"/products/"}>
              <button className="mt-8 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
                </svg>
                Back to Products
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    );
  };

  const Loading = () => {
    return (
      <section className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-br from-amber-50/80 to-white/90 dark:from-base-100/95 dark:to-base-200/95 backdrop-blur-xl">
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

  function onChangeForm(e) {
    return setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  }

  const countIncrement = () => {
    return setForm((form) => {
      return {
        ...form,
        count: form.count + 1,
      };
    });
  };
  const countDecrement = () => {
    if (form.count > 1) {
      return setForm((form) => {
        return {
          ...form,
          count: form.count - 1,
        };
      });
    }
  };
  const checkoutHandler = () => {
    if (cart.length < 1) {
      return toast.error("Add at least 1 size to cart");
    }
    navigate("/cart");
  };

  const handleAddToCart = () => {
    const newItem = {
      size: Number(form.size),
      count: Number(form.count),
    };
    if (newItem.size < 1 || newItem.size > 3) {
      toast.error("Please choose size");
      return;
    }
    if (newItem.count < 1) {
      toast.error("Invalid count");
      return;
    }

    dispatch(
      cartActions.addtoCart({
        product_id: detail.id,
        size_id: newItem.size,
        qty: form.count,
        name: detail.name,
        img: detail.img,
        price: detail.price,
      })
    );

    setCart((prevItems) => {
      const index = prevItems.findIndex((item) => item.size === newItem.size);
      if (index !== -1) {
        const newItems = [...prevItems];
        newItems[index].count += newItem.count;
        return newItems;
      } else {
        return [...prevItems, newItem];
      }
    });

    setForm({ size: "", count: 1 });
    toast.success("Added to cart!");
  };

  const Detail = (props) => {
    const p = props.data;
    const desc = !p.desc
      ? "This premium coffee is carefully crafted from the finest beans, offering a rich and aromatic experience. Perfect for any time of day."
      : p.desc;
    useDocumentTitle(p.name);
    return (
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
            <span className="font-semibold text-amber-800 dark:text-amber-300 truncate max-w-xs">
              {p.name}
            </span>
          </nav>

          <div className="bg-gradient-to-br from-white/95 to-amber-50/60 dark:from-base-200/95 dark:to-base-300/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-amber-200/40 dark:border-amber-800/30 shadow-2xl/30">
            <section className="flex flex-col lg:flex-row gap-10 lg:gap-16 my-8">
              {/* Left Column - Image & Delivery Options */}
              <aside className="lg:w-2/5">
                {/* Product Image */}
                <div className="mb-10">
                  <div className="w-80 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl/50 border-8 border-white/70 dark:border-base-400/60">
                    <img
                      src={p.img ? p.img : productPlaceholder}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent"></div>
                  </div>
                </div>

                {/* Delivery and Time Options */}
                <div className="bg-gradient-to-br from-amber-50/80 to-white/60 dark:from-base-300/70 dark:to-base-400/50 backdrop-blur-sm rounded-3xl p-8 border border-amber-200/50 dark:border-amber-800/40 shadow-xl/30">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      Delivery & Time
                    </h2>
                  </div>

                  {/* Delivery Options */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">Delivery Method</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "dinein", value: "1", label: "Dine In" },
                          { id: "doordelivery", value: "2", label: "Door Delivery" },
                          { id: "pickup", value: "3", label: "Pick Up" }
                        ].map((option) => (
                          <div key={option.id}>
                            <input
                              type="radio"
                              id={option.id}
                              name="delivery"
                              value={option.value}
                              className="hidden peer"
                              checked={form.delivery === option.value}
                              onChange={onChangeForm}
                            />
                            <label
                              htmlFor={option.id}
                              className="block p-3 rounded-xl text-center text-sm font-medium cursor-pointer transition-all duration-300 bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 border border-amber-300/50 dark:border-amber-600/50 peer-checked:bg-gradient-to-r peer-checked:from-amber-600 peer-checked:to-amber-800 peer-checked:text-white peer-checked:border-amber-600/80 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Now or Later */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">Order Now?</p>
                        <div className="flex gap-3">
                          {[
                            { id: "now-true", value: "1", label: "Yes" },
                            { id: "now-false", value: "0", label: "No" }
                          ].map((option) => (
                            <div key={option.id} className="flex-1">
                              <input
                                type="radio"
                                id={option.id}
                                name="now"
                                value={option.value}
                                className="hidden peer"
                                checked={form.now === option.value}
                                onChange={onChangeForm}
                              />
                              <label
                                htmlFor={option.id}
                                className="block p-3 rounded-xl text-center text-sm font-medium cursor-pointer transition-all duration-300 bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 border border-amber-300/50 dark:border-amber-600/50 peer-checked:bg-gradient-to-r peer-checked:from-amber-600 peer-checked:to-amber-800 peer-checked:text-white peer-checked:border-amber-600/80 hover:bg-gradient-to-r hover:from-amber-100 hover:to-amber-50 dark:hover:from-amber-900/30 dark:hover:to-amber-800/20"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div>
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">Set Time</p>
                        <div className="relative">
                          <input
                            type="time"
                            name="time"
                            id="reservationtime"
                            value={form.time}
                            onChange={onChangeForm}
                            className="w-full bg-gradient-to-r from-white/90 to-amber-50/70 dark:from-base-300/80 dark:to-base-400/60 text-gray-900 dark:text-gray-200 px-4 py-3 rounded-xl border border-amber-300/60 dark:border-amber-600/60 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                          />
                          <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600/70 dark:text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right Column - Product Details */}
              <aside className="lg:w-3/5">
                {/* Product Header */}
                <div className="mb-8">
                  <h1 className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent font-bold text-4xl lg:text-5xl mb-4 uppercase">
                    {p.name}
                  </h1>
                </div>

                {/* Product Description */}
                <div className="mb-8">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {desc}
                  </p>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/60 to-amber-100/40 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200/40 dark:border-amber-700/30">
                    <p className="text-amber-700/90 dark:text-amber-400/90 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Delivery only on <b>Monday to Friday</b> at <b>1 - 7 PM</b>
                    </p>
                  </div>
                </div>

                {/* Quantity and Price */}
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white/60 dark:from-base-300/70 dark:to-base-400/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/40 shadow-xl/30">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</label>
                        <div className="flex items-center bg-gradient-to-r from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 rounded-xl border border-amber-300/50 dark:border-amber-600/50 overflow-hidden">
                          <button
                            onClick={countDecrement}
                            className="px-4 py-3 text-gray-900 dark:text-gray-200 hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors duration-300"
                          >
                            <span className="text-xl font-bold">−</span>
                          </button>
                          <input
                            type="number"
                            className="w-16 text-center bg-transparent text-gray-900 dark:text-gray-200 text-lg font-semibold border-x border-amber-300/50 dark:border-amber-600/50 py-3"
                            value={form.count}
                            onChange={onChangeForm}
                            min="1"
                          />
                          <button
                            onClick={countIncrement}
                            className="px-4 py-3 text-gray-900 dark:text-gray-200 hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors duration-300"
                          >
                            <span className="text-xl font-bold">+</span>
                          </button>
                        </div>
                      </div>

                      {/* Price Display */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Price</p>
                        <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
                          {(p.price * form.count).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {p.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                  <button
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
                    onClick={handleAddToCart}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add to Cart
                    <span className="font-['Noto_Nastaliq_Urdu'] text-sm opacity-90">
                      (کارٹ میں شامل کریں)
                    </span>
                  </button>

                  <button
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-300 dark:from-base-300 dark:to-base-400 hover:from-gray-200 hover:to-gray-400 dark:hover:from-base-400 dark:hover:to-base-500 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 border border-gray-300/60 dark:border-base-400/50 flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    Ask a Staff
                  </button>
                </div>

                {/* Size Selection */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white/60 dark:from-base-300/70 dark:to-base-400/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/40 shadow-xl/30">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">Choose Your Size</h3>
                  <div className="flex justify-center gap-6">
                    {[
                      { id: "regular-size", value: "1", label: "R", name: "Regular" },
                      { id: "large-size", value: "2", label: "L", name: "Large" },
                      { id: "xlargeSize", value: "3", label: "XL", name: "Xtra Large" }
                    ].map((size) => (
                      <div key={size.id} className="text-center">
                        <input
                          type="radio"
                          id={size.id}
                          name="size"
                          value={size.value}
                          className="hidden peer"
                          checked={form.size === size.value}
                          onChange={onChangeForm}
                        />
                        <label
                          htmlFor={size.id}
                          className="block w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-300 bg-gradient-to-br from-white/80 to-amber-50/60 dark:from-base-300/70 dark:to-base-400/50 text-gray-900 dark:text-gray-200 border-2 border-amber-300/50 dark:border-amber-600/50 peer-checked:bg-gradient-to-br peer-checked:from-amber-600 peer-checked:to-amber-800 peer-checked:text-white peer-checked:border-amber-600/80 hover:scale-105"
                        >
                          {size.label}
                        </label>
                        <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {size.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </section>

            {/* Cart Summary Section */}
            <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white/60 dark:from-base-300/70 dark:to-base-400/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/40 shadow-xl/30">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Cart Items */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Cart Items</h3>
                  {filteredCart.length > 0 ? (
                    <div className="space-y-3">
                      {filteredCart.map((item, idx) => {
                        let sizeName;
                        switch (item.size_id) {
                          case 1:
                            sizeName = "Regular";
                            break;
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
                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/80 dark:bg-base-400/30 border border-amber-200/40 dark:border-amber-700/30">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden">
                                <img
                                  src={productPlaceholder}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  x{item.qty} ({sizeName})
                                </p>
                              </div>
                            </div>
                            <p className="font-bold text-amber-700 dark:text-amber-400">
                              {(item.price * item.qty).toLocaleString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
                      <p className="text-sm text-amber-700/80 dark:text-amber-400/80 font-['Noto_Nastaliq_Urdu']">
                        کارٹ خالی ہے
                      </p>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <div className="lg:w-1/4 flex flex-col items-center">
                  <button
                    onClick={checkoutHandler}
                    disabled={filteredCart.length === 0}
                    className={`w-full ${filteredCart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      } bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 ease-out shadow-lg/50 hover:shadow-xl/60 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Checkout
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                    {filteredCart.length} item{filteredCart.length !== 1 ? 's' : ''} in cart
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : notFound ? (
        <NotFound />
      ) : (
        <Detail data={detail} />
      )}
      <Footer />
    </>
  );
}
export default ProductDetail;