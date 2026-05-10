import 'react-loading-skeleton/dist/skeleton.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getSellingReport } from '../../utils/dataProvider/admin';
import useDocumentTitle from '../../utils/documentTitle';
import {
  n_f,
  short_n_f,
} from '../../utils/helpers';

const AdminDashboard = (props) => {
  useDocumentTitle("Admin Dashboard");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") || "monthly";
  
  // Calculate metrics
  const maxValue = data.length > 0 ? Math.max(...data.map((item) => item.total_sum)) : 0;
  const totalRevenue = data.reduce((sum, item) => sum + item.total_sum, 0);
  const averageRevenue = data.length > 0 ? totalRevenue / data.length : 0;
  const recentGrowth = data.length > 1 ? 
    ((data[0]?.total_sum - data[1]?.total_sum) / data[1]?.total_sum * 100) : 0;

  // Get view configuration
  const getViewConfig = () => {
    switch(view) {
      case "daily":
        return {
          title: "Daily Revenue Report",
          subtitle: "Last 7 days performance overview",
          periodLabel: "Day",
          icon: "📊"
        };
      case "weekly":
        return {
          title: "Weekly Revenue Report",
          subtitle: "Last 7 weeks performance overview",
          periodLabel: "Week",
          icon: "📈"
        };
      default:
        return {
          title: "Monthly Revenue Report",
          subtitle: "Last 6 months performance overview",
          periodLabel: "Month",
          icon: "💰"
        };
    }
  };

  const viewConfig = getViewConfig();

  const fetch = async (controller) => {
    setLoading(true);
    getSellingReport(view, props.userInfo.token, controller)
      .then((result) => {
        const { data } = result.data;
        setData(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    fetch(controller);
    return () => controller.abort();
  }, [view]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-amber-100/20 dark:from-base-100 dark:via-base-200 dark:to-base-300">
        {/* Top Navigation */}
        <div className="bg-white/80 dark:bg-base-200/80 backdrop-blur-lg border-b border-amber-200/50 dark:border-base-300">
          <div className="global-px py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-amber-700/80 dark:text-amber-300/80 mt-2">
                  Monitor your business performance and growth metrics
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm text-amber-600/70 dark:text-amber-400/70 font-['Noto_Nastaliq_Urdu']">
                  کاروباری کارکردگی کا جائزہ
                </div>
                <div className="flex gap-2 bg-white/60 dark:bg-base-300/60 backdrop-blur-sm rounded-xl p-1 border border-amber-200/40 dark:border-amber-800/30">
                  {["daily", "weekly", "monthly"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSearchParams({ view: period })}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        view === period
                          ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-md'
                          : 'text-amber-700/80 dark:text-amber-300/80 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-amber-50/50 dark:hover:bg-base-300'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="global-px py-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue Card */}
            <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-700/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                  +{recentGrowth.toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{short_n_f(totalRevenue)}</p>
              <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-2">
                Last {data.length} {viewConfig.periodLabel.toLowerCase()}{data.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Average Revenue Card */}
            <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-700/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mb-1">Average per {viewConfig.periodLabel}</p>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{short_n_f(averageRevenue)}</p>
              <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-2">
                Consistent performance indicator
              </p>
            </div>

            {/* Peak Revenue Card */}
            <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-700/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mb-1">Peak Revenue</p>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{short_n_f(maxValue)}</p>
              <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-2">
                Highest recorded {viewConfig.periodLabel.toLowerCase()}
              </p>
            </div>

            {/* Periods Analyzed Card */}
            <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-700/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mb-1">Periods Analyzed</p>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{data.length}</p>
              <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-2">
                {viewConfig.periodLabel}s of data analyzed
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Chart - Takes 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-base-200 rounded-2xl p-6 md:p-8 border border-amber-200/50 dark:border-amber-800/30 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 flex items-center gap-3">
                      <span className="text-3xl">{viewConfig.icon}</span>
                      {viewConfig.title}
                    </h2>
                    <p className="text-amber-700/80 dark:text-amber-300/80 mt-2">
                      {viewConfig.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-800"></div>
                      <span className="text-amber-700/80 dark:text-amber-300/80">Revenue</span>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
                      <p className="mt-4 text-amber-700/80 dark:text-amber-300/80">Loading revenue data...</p>
                    </div>
                  </div>
                ) : data.length === 0 ? (
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <p className="text-amber-700/80 dark:text-amber-300/80">No data available for the selected period</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Chart Y-axis and Bars */}
                    <div className="flex gap-4 md:gap-6">
                      <div className="hidden md:flex flex-col justify-between h-64 py-2">
                        {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map((value, idx) => (
                          <div key={idx} className="text-right">
                            <span className="text-xs font-medium text-amber-700/60 dark:text-amber-300/60">
                              {short_n_f(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex-1">
                        <div className="relative h-64">
                          {/* Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between">
                            {[...Array(5)].map((_, idx) => (
                              <div 
                                key={idx} 
                                className="h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent dark:via-amber-800/20"
                              ></div>
                            ))}
                          </div>
                          
                          {/* Chart Bars */}
                          <div className="absolute inset-0 flex items-end justify-between gap-1 md:gap-2">
                            {data.map((item, idx) => {
                              const heightPercent = maxValue > 0 ? (item.total_sum / maxValue) * 100 : 0;
                              return (
                                <div 
                                  key={idx} 
                                  className="flex flex-col items-center flex-1 group"
                                >
                                  {/* Bar */}
                                  <div 
                                    className="w-full max-w-16 rounded-t-lg relative cursor-pointer transition-all duration-300 group-hover:shadow-lg"
                                    style={{ height: `${heightPercent}%` }}
                                  >
                                    {/* Gradient Fill */}
                                    <div className="absolute inset-0 rounded-t-lg bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 group-hover:from-amber-600 group-hover:via-amber-500 group-hover:to-amber-400"></div>
                                    
                                    {/* Top Shine */}
                                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg"></div>
                                    
                                    {/* Hover Tooltip */}
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-800 to-amber-700 text-white px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 min-w-[120px] text-center">
                                      <div className="text-sm font-bold">{n_f(item.total_sum)}</div>
                                      <div className="text-xs text-amber-200/90 mt-1">{item.label}</div>
                                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-amber-800"></div>
                                    </div>
                                  </div>
                                  
                                  {/* X-axis Label */}
                                  <div className="mt-3 text-center min-h-[40px] flex items-end">
                                    <span className="text-xs font-medium text-amber-800/80 dark:text-amber-300/80">
                                      {item.label}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart Footer */}
                    <div className="mt-8 pt-6 border-t border-amber-200/50 dark:border-amber-800/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-800"></div>
                            <span className="text-sm text-amber-700/80 dark:text-amber-300/80">Revenue Trend</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700"></div>
                            <span className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
                              {recentGrowth >= 0 ? 'Growth' : 'Decline'} {Math.abs(recentGrowth).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-amber-600/60 dark:text-amber-400/60">
                          {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Performance Summary */}
              <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-6">Performance Summary</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-amber-700/80 dark:text-amber-300/80">Revenue Growth</span>
                      <span className={`text-sm font-medium ${recentGrowth >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                        {recentGrowth >= 0 ? '+' : ''}{recentGrowth.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-amber-100 dark:bg-amber-900/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${recentGrowth >= 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-700' : 'bg-gradient-to-r from-rose-500 to-rose-700'}`}
                        style={{ width: `${Math.min(Math.abs(recentGrowth), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-amber-700/80 dark:text-amber-300/80">Period Consistency</span>
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        {data.length > 1 ? ((1 - (maxValue - averageRevenue) / maxValue) * 100).toFixed(0) : 100}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-amber-100 dark:bg-amber-900/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                        style={{ width: `${data.length > 1 ? ((1 - (maxValue - averageRevenue) / maxValue) * 100) : 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-amber-700/80 dark:text-amber-300/80">Data Coverage</span>
                      <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        {data.length}/7 {viewConfig.periodLabel.toLowerCase()}{data.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-amber-100 dark:bg-amber-900/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700"
                        style={{ width: `${(data.length / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-amber-200/50 dark:border-amber-800/30">
                  <div className="text-center">
                    <p className="text-sm text-amber-700/80 dark:text-amber-300/80">
                      Last updated: Just now
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-base-200 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/30 shadow-lg">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-6">Quick Actions</h3>
                
                <div className="space-y-4">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group">
                    <svg className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Download Report
                  </button>
                  
                  <button className="w-full px-4 py-3 bg-white dark:bg-base-300 border border-amber-300/60 dark:border-amber-700/40 text-amber-800 dark:text-amber-200 font-medium rounded-xl hover:bg-amber-50/50 dark:hover:bg-base-400 transition-all duration-200 flex items-center justify-center gap-3 group">
                    <svg className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                    Share Dashboard
                  </button>
                  
                  <button className="w-full px-4 py-3 bg-white dark:bg-base-300 border border-amber-300/60 dark:border-amber-700/40 text-amber-800 dark:text-amber-200 font-medium rounded-xl hover:bg-amber-50/50 dark:hover:bg-base-400 transition-all duration-200 flex items-center justify-center gap-3 group">
                    <svg className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Customize View
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-amber-200/50 dark:border-amber-800/30">
                  <p className="text-sm text-amber-700/80 dark:text-amber-300/80 text-center">
                    Need help? <a href="#" className="text-amber-800 dark:text-amber-200 hover:underline">Contact support</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-amber-600/10 to-amber-800/10 dark:from-amber-900/20 dark:to-amber-800/10 rounded-2xl p-6 border border-amber-300/40 dark:border-amber-700/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Analytics Tips</h4>
                  <p className="text-sm text-amber-700/80 dark:text-amber-300/80">
                    Compare different time periods to identify growth patterns and optimize your business strategy.
                    Regular monitoring helps in early trend detection.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-600/10 to-emerald-800/10 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-2xl p-6 border border-emerald-300/40 dark:border-emerald-700/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">Next Steps</h4>
                  <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
                    Consider setting monthly revenue targets based on current trends.
                    Explore detailed customer analytics for deeper insights.
                  </p>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);