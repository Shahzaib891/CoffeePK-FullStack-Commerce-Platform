import React, {
  Component,
  Fragment,
} from 'react';

import { Link } from 'react-router-dom';

// assets icons
import checkCircle from '../assets/icons/check-circle.svg';
import checkIcon from '../assets/icons/check.svg';
import loveIcon from '../assets/icons/love.svg';
import placeIcon from '../assets/icons/place.svg';
import starIcon from '../assets/icons/star.svg';
import staffIcon from '../assets/icons/user.svg';
import mapImage from '../assets/images/global.svg';
import amazonLogo from '../assets/images/partners/amazon.svg';
import discordLogo from '../assets/images/partners/discord.svg';
import netflixLogo from '../assets/images/partners/netflix.svg';
import redditLogo from '../assets/images/partners/reddit.svg';
import spotifyLogo from '../assets/images/partners/spotify.svg';
import phProfile from '../assets/images/placeholder-profile.jpg';
import productImage1 from '../assets/images/product-1.webp';
// assets images
import provideImage from '../assets/images/team-work.webp';
// components
import Footer from '../components/Footer';
import Header from '../components/Header';

class Mainpage extends Component {
  state = {
    provide: [
      "Premium quality Arabica beans sourced from Pakistani highlands",
      "Healthy, customizable meals with farm-fresh ingredients",
      "Expert baristas to guide your perfect coffee experience",
      "Exclusive member card with every purchase over PKR 5,000",
    ],
    reviews: [
      {
        name: "Ahmed Raza",
        location: "Lahore, Pakistan",
        text: "CoffeePK has completely transformed my mornings! The Hazelnut Latte is absolutely divine. The ambiance and service make it worth every rupee.",
        rating: 4.8,
      },
      {
        name: "Sana Khan",
        location: "Karachi, Pakistan",
        text: "As someone who travels frequently, finding consistent quality coffee is hard. CoffeePK delivers excellence in every city. Their seasonal blends are exceptional!",
        rating: 4.9,
      },
      {
        name: "Bilal Ahmed",
        location: "Islamabad, Pakistan",
        text: "Never been a coffee enthusiast until I tried CoffeePK. Their baristas educated me about coffee notes and brewing methods. Now I&apos;m a regular!",
        rating: 5.0,
      },
    ],
  };
  
  render() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-amber-50/30">
        <Fragment>
          <Header />
          <main className="overflow-hidden">
            {/* Hero Section with Background Image */}
            <section className="relative bg-cover bg-center py-24 md:py-32 text-white overflow-hidden bg-main">
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/85 via-amber-800/80 to-amber-700/75"></div>
              
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/10 to-amber-300/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-amber-500/10 to-amber-400/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-amber-300/5 to-amber-200/3 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="global-px relative z-10">
                <div className="flex flex-col gap-6 w-full lg:w-[55%] text-sm animate-fade-in">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Start Your Day with 
                    <span className="block text-amber-200 mt-2">Premium Coffee & Delightful Meals</span>
                  </h1>
                  <p className="text-lg text-amber-100/90 leading-relaxed max-w-2xl">
                    Experience Pakistan&apos;s finest coffee beans, artisanal brewing, and healthy meals crafted with passion. Every cup tells a story of quality and tradition.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                      to={"/products/"}
                    >
                      <span>Explore Our Collection</span>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all duration-300"
                      to={"/about/"}
                    >
                      Our Story
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section - Fixed: Moved outside hero section */}
            <section className="relative global-px -mt-20 mb-20">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/30 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-amber-100/50">
                  <aside className="p-6 md:p-8 flex flex-col md:flex-row justify-center gap-4 md:gap-6 items-center group">
                    <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="p-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg">
                        <img src={staffIcon} alt="Expert Staff" className="w-6 h-6 filter brightness-0 invert" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-3xl md:text-4xl font-bold text-amber-900">90+</p>
                      <p className="font-medium text-amber-700/80 mt-1">Certified Baristas</p>
                      <p className="text-xs text-amber-600/60 mt-2">Pakistan&apos;s finest coffee experts</p>
                    </div>
                  </aside>
                  
                  <aside className="p-6 md:p-8 flex flex-col md:flex-row justify-center gap-4 md:gap-6 items-center group">
                    <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="p-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg">
                        <img src={loveIcon} alt="Happy Customers" className="w-6 h-6 filter brightness-0 invert" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-3xl md:text-4xl font-bold text-amber-900">15K+</p>
                      <p className="font-medium text-amber-700/80 mt-1">Happy Customers</p>
                      <p className="text-xs text-amber-600/60 mt-2">Serving smiles across Pakistan</p>
                    </div>
                  </aside>
                  
                  <aside className="p-6 md:p-8 flex flex-col md:flex-row justify-center gap-4 md:gap-6 items-center group">
                    <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <div className="p-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg">
                        <img src={placeIcon} alt="Store Locations" className="w-6 h-6 filter brightness-0 invert" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-3xl md:text-4xl font-bold text-amber-900">50+</p>
                      <p className="font-medium text-amber-700/80 mt-1">Premium Outlets</p>
                      <p className="text-xs text-amber-600/60 mt-2">Across major Pakistani cities</p>
                    </div>
                  </aside>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="global-px py-16 md:py-24">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                <div className="flex-1 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                      src={provideImage} 
                      alt="Our Coffee Experts" 
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent"></div>
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-transparent to-amber-700/0 group-hover:from-amber-600/10 group-hover:via-amber-500/5 group-hover:to-amber-700/10 transition-all duration-700"></div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-amber-600/20 to-amber-500/10 rounded-full blur-xl"></div>
                </div>
                
                <div className="flex-1 space-y-6 animate-fade-in-up">
                  <div className="space-y-3">
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm font-semibold border border-amber-200/50">
                      Our Commitment
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                      Crafting Premium Coffee Experiences
                    </h2>
                    <p className="text-amber-700/80 text-lg leading-relaxed">
                      We source the finest beans from Pakistani highlands and blend them with traditional expertise to create unforgettable coffee moments.
                    </p>
                  </div>
                  
                  <ul className="space-y-4 max-w-xl">
                    {this.state.provide.map((text, idx) => (
                      <li className="flex items-start gap-4 group" key={idx}>
                        <div className="flex-shrink-0 p-2 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <img src={checkCircle} alt="" className="w-5 h-5" />
                        </div>
                        <span className="text-amber-800/90 pt-1 group-hover:text-amber-700 transition-colors duration-200">{text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4">
                    <p className="text-sm text-amber-600/60 font-['Noto_Nastaliq_Urdu']">
                      ہر کپ میں محبت، ہر ذائقے میں پاکستان
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Products */}
            <section className="bg-gradient-to-b from-amber-50/30 to-white py-16 md:py-24">
              <div className="global-px">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm font-semibold border border-amber-200/50 mb-4">
                    Customer Favorites
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                    Discover Pakistan&apos;s Most Loved Coffees
                  </h2>
                  <p className="text-amber-700/80 text-lg">
                    Taste the blends that have won hearts across the nation. Each sip tells our story.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {Array(3).fill().map((_, idx) => (
                    <div 
                      className="group bg-white rounded-2xl border border-amber-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                      key={idx}
                    >
                      {/* Product image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={productImage1}
                          alt="Hazelnut Latte"
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-bold shadow-lg">
                          Bestseller
                        </div>
                      </div>
                      
                      {/* Product details */}
                      <div className="p-6 md:p-8">
                        <h3 className="text-xl font-bold text-amber-900 mb-3">Hazelnut Delight Latte</h3>
                        
                        <ul className="space-y-3 mb-6">
                          {[
                            "Premium Pakistani Hazelnut Syrup",
                            "Vanilla Whipped Cream Topping",
                            "Choice of Hot or Iced",
                            "Garnished with Caramel Drizzle"
                          ].map((item, i) => (
                            <li className="flex items-center gap-3 text-amber-700/80" key={i}>
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center">
                                <img src={checkIcon} alt="" className="w-3 h-3" />
                              </div>
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="flex items-center justify-between mt-8">
                          <div>
                            <p className="text-2xl font-bold text-amber-900">PKR 550</p>
                            <p className="text-xs text-amber-600/60 line-through">PKR 650</p>
                          </div>
                          <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group">
                            <div className="flex items-center gap-2">
                              <span>Order Now</span>
                              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-12">
                  <Link 
                    to="/products" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-amber-100 text-amber-800 font-semibold border border-amber-200/50 shadow-sm hover:shadow transition-all duration-200"
                  >
                    View All Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>

            {/* Map Section - Fixed: Removed all dots */}
            <section className="global-px py-16 md:py-24">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm font-semibold border border-amber-200/50 mb-4">
                  Find Us Near You
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                  Experience CoffeePK Across Pakistan
                </h2>
                <p className="text-amber-700/80 text-lg">
                  Visit our premium outlets in major cities and immerse yourself in authentic Pakistani coffee culture.
                </p>
              </div>
              
              <div className="relative mt-12 rounded-2xl overflow-hidden shadow-2xl border border-amber-200/30 group">
                <img 
                  src={mapImage} 
                  alt="CoffeePK Locations Across Pakistan" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-amber-900/10 group-hover:from-amber-900/5 group-hover:via-transparent group-hover:to-amber-900/5 transition-all duration-700"></div>
                {/* Dots have been completely removed */}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-amber-700/70 text-sm">
                  <span className="font-semibold">Major Cities:</span> Karachi • Lahore • Islamabad • Rawalpindi • Faisalabad • Peshawar
                </p>
              </div>
            </section>

            {/* Partners Section */}
            <section className="bg-gradient-to-b from-white to-amber-50/30 py-16 md:py-24">
              <div className="global-px">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                    Trusted by Premium Brands
                  </h2>
                  <p className="text-amber-700/80 text-lg">
                    We&apos;re proud to serve exceptional coffee experiences to Pakistan&apos;s leading companies.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
                  {[netflixLogo, redditLogo, amazonLogo, discordLogo, spotifyLogo].map((logo, idx) => (
                    <div 
                      key={idx}
                      className="group p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200/30 shadow-sm hover:shadow-xl hover:border-amber-300/50 transition-all duration-300 flex items-center justify-center"
                    >
                      <img
                        src={logo}
                        alt="Partner"
                        className="w-32 h-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="global-px py-16 md:py-24">
              <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm font-semibold border border-amber-200/50 mb-4">
                  Customer Stories
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
                  Loved by Thousands of Happy Customers
                </h2>
                <p className="text-amber-700/80 text-lg">
                  Read what our community says about their CoffeePK experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {this.state.reviews.map((review, idx) => (
                  <div
                    className="bg-white rounded-2xl border border-amber-200/50 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    key={idx}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <img
                          src={phProfile}
                          alt={review.name}
                          className="w-14 h-14 object-cover rounded-xl border-2 border-amber-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-amber-900 text-lg">{review.name}</h4>
                        <p className="text-amber-700/70 text-sm">{review.location}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <img 
                              key={i} 
                              src={starIcon} 
                              alt="star" 
                              className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'opacity-100' : 'opacity-30'}`}
                            />
                          ))}
                          <span className="text-amber-700 font-semibold ml-2">{review.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -top-4 -left-4 text-3xl text-amber-200/50">&ldquo;</div>
                      <p className="text-amber-700/80 leading-relaxed pl-4">&ldquo;{review.text}&rdquo;</p>
                      <div className="absolute -bottom-4 -right-4 text-3xl text-amber-200/50">&rdquo;</div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-amber-100/50">
                      <p className="text-xs text-amber-600/60 italic">
                        Verified Purchase • {review.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/reviews" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-amber-100 text-amber-800 font-semibold border border-amber-200/50 shadow-sm hover:shadow transition-all duration-200"
                >
                  Read More Reviews
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <section className="global-px py-16 md:py-24 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-amber-500/10 to-amber-600/5 rounded-3xl"></div>
              <div className="relative bg-gradient-to-r from-amber-600/90 to-amber-700/90 rounded-2xl shadow-2xl border border-amber-500/30 p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Exclusive Offers Await!
                    </h3>
                    <p className="text-amber-100/90 text-lg">
                      Discover limited-time promotions and seasonal specials crafted just for you.
                    </p>
                    <p className="text-amber-200/70 text-sm mt-2 font-['Noto_Nastaliq_Urdu']">
                      آج ہی خصوصی پیشکشوں سے لطف اٹھائیں
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/promo"
                      className="px-8 py-4 bg-white text-amber-700 hover:bg-amber-50 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                    >
                      View All Promotions
                    </Link>
                    <Link
                      to="/auth/register"
                      className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-bold rounded-xl backdrop-blur-sm transition-all duration-300 text-center"
                    >
                      Join Membership
                    </Link>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-amber-400/30 to-amber-300/20 rounded-full blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-amber-400/20 to-amber-300/10 rounded-full blur-sm"></div>
              </div>
            </section>
          </main>
          <Footer />
        </Fragment>
      </div>
    );
  }
}

export default Mainpage;