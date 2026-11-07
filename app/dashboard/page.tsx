'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { img } from '@/lib/images';
import { mockData } from '@/lib/mockData';
import {
  LayoutDashboard,
  ShoppingBag,
  TrendingUp,
  Users,
  Calendar,
  MessageCircle,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Package,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders' | 'dates' | 'audience'>('overview');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');

  // Animated count-up state
  const [counts, setCounts] = useState({
    visits: 0,
    views: 0,
    orders: 0,
    signups: 0,
    revenue: 0,
    clicks: 0
  });

  const { dashboard } = mockData;

  useEffect(() => {
    // Count up animation over 1.2 seconds
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(1, currentStep / steps);
      
      setCounts({
        visits: Math.floor(dashboard.visitsFromIG * progress),
        views: Math.floor(dashboard.menuViews * progress),
        orders: Math.floor(dashboard.ordersThisWindow * progress),
        signups: Math.floor(dashboard.emailSignups * progress),
        revenue: Math.floor(dashboard.windowRevenue * progress),
        clicks: Math.floor(dashboard.commentToLinkClicks * progress),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [dashboard]);

  const filteredOrders = dashboard.recentOrders.filter(order => {
    if (!searchOrderQuery) return true;
    const q = searchOrderQuery.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(q) ||
      order.id.toLowerCase().includes(q) ||
      order.fulfillment.toLowerCase().includes(q) ||
      order.itemsSummary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="dash min-h-screen pb-20">
      
      <div className="mx-auto max-w-7xl space-y-8 px-4 pt-2 sm:px-6 lg:px-8">

        {/* Greeting header — the one place the display face stays */}
        <div className="bento doodles-dark grid items-end gap-6 bg-cocoa p-6 text-white sm:p-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 font-type text-xs text-white/65">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-mustard">
                <span className="h-1.5 w-1.5 rounded-full bg-mustard" /> Demo data
              </span>
              <span>Drop #42 is open, closes Friday 12 PM CST</span>
            </div>
            <h1 className="keep-display mt-3 font-display text-4xl leading-[0.95] sm:text-6xl">
              Morning, Tatti. <span className="text-mustard">7 boxes left.</span>
            </h1>
            <Link href="/" className="mt-4 inline-block text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
              Back to the storefront
            </Link>
          </div>
          <div className="relative z-10 flex items-center gap-4 rounded-[1.5rem] bg-white/10 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-peach">
              <Image src={img.cookieStack} alt="" fill sizes="64px" className="object-contain p-1" />
            </div>
            <div className="min-w-[10rem]">
              <p className="text-xs text-white/65">Capacity filled</p>
              <p className="text-2xl font-bold">
                {dashboard.ordersThisWindow}/{dashboard.orderCapacity} boxes
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-mustard" style={{ width: `${Math.round((dashboard.ordersThisWindow / dashboard.orderCapacity) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Sidebar alternative on desktop) */}
        <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto border-b border-cream-300 px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
            { id: 'dates', label: 'Pickup Dates & Capacity', icon: Calendar },
            { id: 'menu', label: 'Top Cookies & Batches', icon: TrendingUp },
            { id: 'audience', label: 'IG Comment-to-Link', icon: MessageCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-burgundy-700 text-butter-100 shadow-sm'
                    : 'bg-white hover:bg-butter-100 text-burgundy-900 border border-burgundy-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. STAT CARDS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          
          {/* Card 1: IG Visits */}
          <div className="bg-white p-5 rounded-[1.75rem] shadow-card space-y-2">
            <div className="flex items-center justify-between text-xs text-cream-800">
              <span className="font-semibold text-xs">Visits from IG</span>
              <Users className="w-4 h-4 text-burgundy-700" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy-900">
              {counts.visits.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18% from last drop</span>
            </div>
          </div>

          {/* Card 2: Menu Views */}
          <div className="bg-white p-5 rounded-[1.75rem] shadow-card space-y-2">
            <div className="flex items-center justify-between text-xs text-cream-800">
              <span className="font-semibold text-xs">Menu Views</span>
              <Eye className="w-4 h-4 text-burgundy-700" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy-900">
              {counts.views.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>62% view-to-box rate</span>
            </div>
          </div>

          {/* Card 3: Orders This Window */}
          <div className="bg-white p-5 rounded-[1.75rem] shadow-card space-y-2">
            <div className="flex items-center justify-between text-xs text-cream-800">
              <span className="font-semibold text-xs">Orders This Drop</span>
              <ShoppingBag className="w-4 h-4 text-burgundy-700" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy-900">
              {counts.orders} <small className="text-xs text-cream-800 font-normal">/ 45</small>
            </div>
            <div className="text-[11px] text-amber-700 font-semibold">
              <span>7 boxes remaining</span>
            </div>
          </div>

          {/* Card 4: Email Signups */}
          <div className="bg-white p-5 rounded-[1.75rem] shadow-card space-y-2">
            <div className="flex items-center justify-between text-xs text-cream-800">
              <span className="font-semibold text-xs">Drop Subscribers</span>
              <Sparkles className="w-4 h-4 text-burgundy-700" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy-900">
              {counts.signups}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14 this week</span>
            </div>
          </div>

          {/* Card 5: Window Revenue */}
          <div className="bg-white p-5 rounded-[1.75rem] shadow-card space-y-2 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-xs text-cream-800">
              <span className="font-semibold text-xs">Drop Revenue</span>
              <span className="text-[10px] uppercase font-bold text-burgundy-700 bg-butter-200 px-1.5 py-0.5 rounded">Demo</span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-burgundy-900">
              ${counts.revenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-cream-800/80">
              Avg Order: ${(dashboard.windowRevenue / dashboard.ordersThisWindow).toFixed(2)}
            </div>
          </div>

        </div>

        {/* 2. MAIN DASHBOARD CONTENT GRIDS */}
        
        {/* OVERVIEW / ORDERS TAB */}
        {(activeTab === 'overview' || activeTab === 'orders') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Recent Orders Table (7 cols) */}
            <div className="lg:col-span-8 bg-white rounded-[1.75rem] p-6 sm:p-7 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-burgundy-900">
                    Recent Drop Orders (Drop #42)
                  </h3>
                  <p className="text-xs text-cream-800/80">
                    Live orders queued for Saturday Nov 8 baking
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-cream-800/60 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchOrderQuery}
                    onChange={e => setSearchOrderQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-full border border-burgundy-200 text-xs text-burgundy-900 bg-cream-50 focus:outline-none focus:ring-1 focus:ring-burgundy-700"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-100 text-burgundy-900 font-semibold text-xs">
                    <tr>
                      <th className="py-3 px-3 rounded-l-xl">Order</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Fulfillment</th>
                      <th className="py-3 px-3">Box</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right rounded-r-xl">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-cream-50/70 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-burgundy-900">
                          {order.id}
                        </td>
                        <td className="py-3 px-3 font-medium text-burgundy-950">
                          {order.customerName}
                          <span className="block text-[10px] text-cream-800/60">{order.timeAgo}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.fulfillment === 'Austin Pickup'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.fulfillment === 'Austin Delivery'
                              ? 'bg-butter-200 text-burgundy-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {order.fulfillment}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-burgundy-900">Box of {order.boxSize}</span>
                          <span className="block text-[10px] text-cream-800/80 truncate max-w-[140px]">
                            {order.itemsSummary}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-cream-100 text-burgundy-900 font-medium text-[10px]">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-serif font-bold text-burgundy-900">
                          ${order.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fulfillment Breakdown & Weekly Spikes (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Fulfillment Distribution */}
              <div className="bg-white rounded-[1.75rem] p-6 shadow-card space-y-4">
                <h3 className="font-serif text-lg font-bold text-burgundy-900">
                  Fulfillment Breakdown
                </h3>
                
                <div className="space-y-3">
                  {dashboard.fulfillmentBreakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-burgundy-900">{item.type}</span>
                        <span className="text-burgundy-700 font-mono">{item.orders} orders ({item.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-cream-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-cream-100 text-[11px] text-cream-800/70">
                  Pickup accounts for 61% of weekly revenue, eliminating packaging and shipping fees.
                </div>
              </div>

              {/* Weekly Drop Traffic Spike Chart */}
              <div className="bg-white rounded-[1.75rem] p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-burgundy-900">
                    Weekly Traffic Spike
                  </h3>
                  <BarChart3 className="w-4 h-4 text-burgundy-700" />
                </div>
                <p className="text-xs text-cream-800/80">
                  Visits surge on Monday 12PM when the drop link is announced in Instagram bio/stories.
                </p>

                {/* Visual Bar Chart */}
                <div className="flex items-end justify-between gap-1.5 pt-4 h-36">
                  {dashboard.weeklyTraffic.map((d, i) => {
                    const maxV = 540;
                    const heightPct = Math.round((d.visits / maxV) * 100);
                    const isMonday = d.day.includes('Mon');

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[9px] font-mono font-bold text-burgundy-900">
                          {d.orders > 0 && `${d.orders}o`}
                        </span>
                        <div className="w-full bg-cream-100 rounded-t-lg relative flex items-end justify-center h-24 overflow-hidden">
                          <div
                            className={`w-full transition-all duration-700 rounded-t-lg ${
                              isMonday ? 'bg-burgundy-700' : 'bg-butter-300'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-cream-800/80">
                          {d.day.slice(0, 3)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TOP COOKIES & PICKUP DATES TABS */}
        {(activeTab === 'overview' || activeTab === 'menu' || activeTab === 'dates') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Top Cookies Ranking */}
            <div className="lg:col-span-6 bg-white rounded-[1.75rem] p-6 sm:p-7 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-burgundy-900">
                    Top Cookie Flavor Popularity
                  </h3>
                  <p className="text-xs text-cream-800/80">
                    Total cookie count requested in boxes this drop cycle
                  </p>
                </div>
                <span className="text-xs font-bold text-burgundy-700 bg-butter-200 px-2.5 py-0.5 rounded-full">
                  Batch Demand
                </span>
              </div>

              <div className="space-y-3.5 pt-1">
                {dashboard.topCookies.map((cookie, idx) => {
                  const maxCount = 48;
                  const pct = Math.round((cookie.count / maxCount) * 100);

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center gap-2 font-bold text-burgundy-900">
                          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-peach">
                            <Image src={mockData.menuItems.find((m) => m.name === cookie.name)?.image || img.cookieTop} alt="" fill sizes="28px" className="object-cover" />
                          </span>
                          #{idx + 1} {cookie.name}
                        </span>
                        <span className="font-mono text-burgundy-700 font-bold">
                          {cookie.count} cookies ({cookie.rating} ★)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-cream-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-coral"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Pickup Dates & Capacity Tracker */}
            <div className="lg:col-span-6 bg-white rounded-[1.75rem] p-6 sm:p-7 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-burgundy-900">
                    Drop Windows & Kitchen Capacity
                  </h3>
                  <p className="text-xs text-cream-800/80">
                    Max 45 boxes per Saturday bake
                  </p>
                </div>
                <Calendar className="w-5 h-5 text-burgundy-700" />
              </div>

              <div className="space-y-3 pt-1">
                {mockData.dropDates.map(drop => {
                  const pct = Math.min(100, Math.round((drop.orders / drop.capacity) * 100));

                  return (
                    <div
                      key={drop.id}
                      className="p-3.5 rounded-2xl border border-cream-200 bg-cream-50/50 space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <span className="font-serif font-bold text-burgundy-900 text-sm">
                            {drop.dateLabel}
                          </span>
                          <span className="block text-[11px] text-cream-800/80">
                            {drop.pickupWindow}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-burgundy-900 text-xs">
                            {drop.orders} / {drop.capacity} Boxes
                          </span>
                          <span className={`block text-[10px] font-bold uppercase ${
                            drop.status === 'sold-out' ? 'text-gray-500' : drop.status === 'filling' ? 'text-amber-800' : 'text-emerald-700'
                          }`}>
                            {drop.status} ({pct}%)
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-2 rounded-full bg-cream-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            drop.status === 'sold-out' ? 'bg-gray-400' : drop.status === 'filling' ? 'bg-amber-600' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* AUDIENCE & COMMENT-TO-LINK TAB */}
        {(activeTab === 'overview' || activeTab === 'audience') && (
          <div className="bg-white rounded-[1.75rem] p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-butter-200 text-burgundy-900 text-xs font-bold uppercase tracking-wider">
                  <MessageCircle className="w-3.5 h-3.5 text-burgundy-700" />
                  <span>Instagram Automation Integration</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-burgundy-900 mt-1">
                  Comment-to-Link Conversion Funnel
                </h3>
                <p className="text-xs text-cream-800/80">
                  When followers comment “DROP”, “MENU”, or “ORDER” on Instagram posts & reels, automated DMs send them directly to the remodeled pre-order box builder.
                </p>
              </div>

              <div className="bg-butter-100 p-3 rounded-2xl border border-butter-200 text-center shrink-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-burgundy-900">
                  Total Comment Clicks
                </span>
                <span className="font-serif text-2xl font-bold text-burgundy-900">
                  {counts.clicks}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboard.commentKeywords.map((kw, i) => (
                <div key={i} className="p-4 rounded-2xl bg-cream-50 border border-burgundy-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-burgundy-900 bg-white px-2 py-0.5 rounded border border-cream-200">
                      “{kw.keyword}”
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {Math.round((kw.converted / kw.comments) * 100)}% Conv
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-cream-800 pt-1">
                    <span>Comments: <strong>{kw.comments}</strong></span>
                    <span>Converted: <strong className="text-burgundy-700">{kw.converted}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-butter-100 to-cream-50 p-4 rounded-2xl border border-butter-300 text-xs text-burgundy-900 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-burgundy-700 shrink-0 mt-0.5" />
              <div>
                <strong>Why this solves the owner’s #1 headache:</strong> Instead of manually typing 50 DM replies every drop with flavor lists and pickup times, automated keyword triggers route followers into a frictionless, mobile-optimized box builder that answers all logistics upfront.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
