import React, { useState } from 'react';
import { ASSETS, INVESTMENT_PLANS, PAYMENT_GATEWAYS } from '../data/constants';
import { InvestmentPlan, PaymentGateway, TabType } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onSelectPlan: (plan: InvestmentPlan) => void;
  onSelectGateway: (gateway: PaymentGateway) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onSelectPlan,
  onSelectGateway,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = 5;
  const [selectedFeature, setSelectedFeature] = useState<{
    title: string;
    desc: string;
    badge: string;
  } | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="flex flex-col pb-6 select-none">
      {/* SECTION: SectionHeader */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Platform features</h1>
          <p className="text-xs text-[#717684] mt-0.5">Explore active yields &amp; ecosystem modules</p>
        </div>
        <div className="flex items-center space-x-1.5 bg-[#16181f] border border-white/5 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#b4f02a] animate-pulse"></span>
          <span className="text-[11px] font-semibold text-[#b4f02a] uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* SECTION: MainSliderSection */}
      <section className="pl-5 relative overflow-hidden" data-purpose="features-slider">
        <div className="flex space-x-3.5 pr-5 overflow-x-auto snap-x snap-mandatory py-1 scroll-smooth">
          {/* Slide 1: Primary Yield Card */}
          <div
            className={`snap-start flex-shrink-0 w-[305px] sm:w-[325px] rounded-[32px] p-5 feature-card-gradient border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[360px] transition-all duration-300 ${
              currentSlide === 0 ? 'ring-1 ring-white/20 scale-[1.01]' : 'opacity-90'
            }`}
          >
            {/* Background Decorative Glow & Mesh */}
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#b4f02a]/15 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-purple-600/20 blur-2xl pointer-events-none"></div>

            {/* Top Text Area */}
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b4f02a]">
                  Daily Yield Boost
                </span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
                BEARS<span className="text-[#b4f02a]">4</span>PROFIT
              </h2>
              <p className="text-xs text-gray-300/90 font-normal leading-relaxed mt-2 pr-4">
                High-performance yield engine with automated daily profit claims, secure staking pools &amp; instant token payouts.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex items-center space-x-2.5 mt-4">
                <button
                  onClick={() => onNavigateTab('packages')}
                  className="bg-white hover:bg-[#b4f02a] hover:text-black active:scale-95 text-black font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-full shadow-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Explore Plans</span>
                  <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
                <button
                  onClick={() => onNavigateTab('profile')}
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs px-3.5 py-2.5 rounded-full border border-white/15 backdrop-blur-md transition cursor-pointer"
                >
                  Referrals
                </button>
              </div>
            </div>

            {/* Bottom Visual & 3D Element */}
            <div className="relative z-10 mt-3 pt-2 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium">Daily APY up to</span>
                <span className="text-2xl font-black text-[#b4f02a] tracking-tight">+4.85%</span>
              </div>
              <div className="relative -mr-2 -mb-2 w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#b4f02a]/20 blur-xl rounded-full"></div>
                <img
                  alt="Ecosystem Asset"
                  className="w-28 h-28 object-contain relative z-10 drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] hover:rotate-6 transition-transform duration-300"
                  src={ASSETS.ecosystemAsset}
                />
              </div>
            </div>
          </div>

          {/* Slide 2: Lucky Wheel Peek Card */}
          <div
            className={`snap-start flex-shrink-0 w-[280px] sm:w-[300px] rounded-[32px] p-5 peek-card-gradient border border-white/10 relative overflow-hidden flex flex-col justify-between transition-all duration-300 min-h-[360px] ${
              currentSlide === 1 ? 'ring-1 ring-white/20 opacity-100' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                  Weekly Jackpot
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white leading-tight">LUCKY WHEEL</h2>
              <p className="text-xs text-gray-400 font-normal leading-relaxed mt-2">
                Spin every 24h to unlock exclusive cash rewards, tier multipliers, and token bonuses.
              </p>
              <button
                onClick={() => onNavigateTab('spin')}
                className="mt-4 bg-white/10 hover:bg-[#b4f02a] hover:text-black text-white font-bold text-xs uppercase tracking-wide px-4 py-2 rounded-full border border-white/15 transition cursor-pointer flex items-center space-x-1.5"
              >
                <span>Spin Now</span>
                <span className="text-xs">⚡</span>
              </button>
            </div>
            <div className="relative z-10 flex items-end justify-between mt-4">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium">Jackpot Pool</span>
                <span className="text-xl font-black text-white tracking-tight">50,000 $B4P</span>
              </div>
              <img
                alt="Trophy"
                className="w-20 h-20 object-contain drop-shadow-lg"
                src={ASSETS.trophySecondary}
              />
            </div>
          </div>

          {/* Slide 3: Cold Storage Vault */}
          <div className="snap-start flex-shrink-0 w-[280px] rounded-[32px] p-5 bg-gradient-to-br from-[#1b233a] via-[#101320] to-[#0c0d12] border border-white/10 relative overflow-hidden flex flex-col justify-between opacity-80 hover:opacity-100 transition min-h-[360px]">
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#b4f02a]/10 border border-[#b4f02a]/30 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b4f02a]">
                  100% Asset Backed
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white leading-tight">COLD STORAGE</h2>
              <p className="text-xs text-gray-400 font-normal leading-relaxed mt-2">
                All algorithmic market-making liquidity pools are safeguarded by multi-sig multisig cold vaults.
              </p>
              <button
                onClick={() =>
                  setSelectedFeature({
                    title: 'Audited Financial Engine',
                    desc: 'Fully collateralized reserves audited in real time with zero custody leakage risk.',
                    badge: 'Multi-Sig Cold Storage',
                  })
                }
                className="mt-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wide px-4 py-2 rounded-full border border-white/15 transition cursor-pointer"
              >
                Audit Report
              </button>
            </div>
            <div className="relative z-10 flex items-end justify-between mt-4">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium">Collateral Ratio</span>
                <span className="text-xl font-black text-[#b4f02a] tracking-tight">142% Backed</span>
              </div>
              <img
                alt="Task Coin"
                className="w-16 h-16 object-contain drop-shadow-lg"
                src={ASSETS.taskCoin}
              />
            </div>
          </div>
        </div>

        {/* Pagination indicators & slider navigation arrows */}
        <div className="pr-5 mt-4 flex flex-col space-y-3.5">
          {/* Segmented progress bar (5 segments) */}
          <div className="grid grid-cols-5 gap-1.5 w-full px-1">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
                  currentSlide === idx
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Circular Pill Arrow Navigation */}
          <div className="flex items-center space-x-2.5 pt-1">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-14 h-9 rounded-full border border-white/25 hover:border-white/60 bg-transparent flex items-center justify-center text-white active:scale-95 transition cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current stroke-[2.2]" fill="none" viewBox="0 0 24 24">
                <path d="M19 12H5m0 0l6 6m-6-6l6-6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-14 h-9 rounded-full border border-white/25 hover:border-white/60 bg-transparent flex items-center justify-center text-white active:scale-95 transition cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current stroke-[2.2]" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <span className="text-xs text-[#717684] font-medium tracking-wider pl-2">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: BentoGridFeaturesSection */}
      <section className="px-5 mt-7 mb-4" data-purpose="bento-features">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b4f02a]">
              Core Advantages
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight leading-tight mt-0.5">
              Ecosystem Power
            </h3>
          </div>
          <span className="text-[11px] font-medium text-[#717684] bg-[#16181f] border border-white/5 px-2.5 py-1 rounded-full">
            3 Pillars
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Top Banner Card: Audited Financial Engine */}
          <div className="relative rounded-2xl p-5 bg-[#12141a] border border-white/10 hover:border-[#b4f02a]/30 transition-all overflow-hidden flex items-center justify-between shadow-xl min-h-[145px]">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#b4f02a]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex flex-col justify-between z-10 max-w-[210px]">
              <div>
                <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                  Audited Financial Engine
                </h4>
                <p className="text-xs text-gray-400 font-normal leading-relaxed mt-1">
                  Make a riskless start with 100% secure cold storage safeguards.
                </p>
              </div>
              <button
                onClick={() =>
                  setSelectedFeature({
                    title: 'Audited Financial Engine',
                    desc: 'Smart contracts and multi-signature vaults independently audited by CertiK and SlowMist to guarantee liquidity protection.',
                    badge: 'Certified Security',
                  })
                }
                className="inline-flex items-center text-xs font-semibold text-[#b4f02a] hover:text-white transition mt-3 space-x-1 cursor-pointer w-fit"
              >
                <span>Learn more</span>
                <svg className="w-3 h-3 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>

            {/* 3D Speedometer / Gauge Icon */}
            <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)]" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="42" fill="#181a20" stroke="#262933" strokeWidth="4"></circle>
                <circle cx="50" cy="50" r="34" fill="#0c0d10" stroke="#1f222d" strokeWidth="2"></circle>
                <path d="M50 50 L50 16 A34 34 0 0 1 84 50 Z" fill="url(#gauge-grad-home)" opacity="0.95"></path>
                <line x1="50" y1="20" x2="50" y2="24" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="74" y1="26" x2="71" y2="29" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="80" y1="50" x2="76" y2="50" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="74" y1="74" x2="71" y2="71" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="50" y1="80" x2="50" y2="76" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="26" y1="74" x2="29" y2="71" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="20" y1="50" x2="24" y2="50" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="26" y1="26" x2="29" y2="29" stroke="#4a4e5e" strokeWidth="1.5"></line>
                <line x1="50" y1="50" x2="76" y2="26" stroke="#b4f02a" strokeWidth="3" strokeLinecap="round"></line>
                <circle cx="50" cy="50" r="6" fill="#b4f02a" stroke="#0c0d10" strokeWidth="2"></circle>
                <rect x="45" y="3" width="10" height="6" rx="2" fill="#b4f02a" stroke="#262933" strokeWidth="1"></rect>
                <defs>
                  <linearGradient id="gauge-grad-home" x1="50" y1="16" x2="84" y2="50" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#b4f02a"></stop>
                    <stop offset="1" stopColor="#0e4b2d" stopOpacity="0.4"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Bottom 2-Card Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: 24H Fast Payout */}
            <div className="relative rounded-2xl p-3.5 bg-[#12141a] border border-white/10 hover:border-[#b4f02a]/30 transition-all overflow-hidden flex flex-col justify-between shadow-lg min-h-[165px]">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#b4f02a]/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="z-10">
                <h4 className="text-[13px] font-bold text-white tracking-tight leading-snug">24H Fast Payout</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  Instant cashout to local wallets &amp; banks
                </p>
              </div>
              <div className="flex items-end justify-between mt-3 z-10">
                <button
                  onClick={() =>
                    setSelectedFeature({
                      title: '24H Fast Payouts',
                      desc: 'Direct integration with Easypaisa, JazzCash, SadaPay, and Raast guarantees automated transfers in 1 to 10 minutes.',
                      badge: 'Zero Waiting Time',
                    })
                  }
                  className="inline-flex items-center text-[11px] font-semibold text-[#b4f02a] hover:text-white transition space-x-0.5 cursor-pointer"
                >
                  <span>Learn more</span>
                  <svg className="w-3 h-3 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
                {/* 3D Dark Headset with Neon Earcups */}
                <div className="w-14 h-14 relative flex items-center justify-center flex-shrink-0">
                  <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 60 60" fill="none">
                    <path d="M15 36 C15 18 45 18 45 36" stroke="#262933" strokeWidth="4" strokeLinecap="round"></path>
                    <circle cx="15" cy="38" r="9" fill="#181a20" stroke="#2a2e3b" strokeWidth="2"></circle>
                    <circle cx="15" cy="38" r="5" fill="#0c0d10"></circle>
                    <circle cx="45" cy="38" r="9" fill="#181a20" stroke="#2a2e3b" strokeWidth="2"></circle>
                    <circle cx="45" cy="38" r="6" fill="#0c0d10" stroke="#b4f02a" strokeWidth="2.5"></circle>
                    <path d="M42 42 Q36 50 24 50" stroke="#262933" strokeWidth="2" strokeLinecap="round" fill="none"></path>
                    <rect x="20" y="48" width="5" height="3.5" rx="1" fill="#b4f02a"></rect>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: Team Education */}
            <div className="relative rounded-2xl p-3.5 bg-[#12141a] border border-white/10 hover:border-[#b4f02a]/30 transition-all overflow-hidden flex flex-col justify-between shadow-lg min-h-[165px]">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#b4f02a]/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="z-10">
                <h4 className="text-[13px] font-bold text-white tracking-tight leading-snug">Team Education</h4>
                <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                  5% • 2% • 1% rewards &amp; guides at no charge
                </p>
              </div>
              <div className="flex items-end justify-between mt-3 z-10">
                <button
                  onClick={() =>
                    setSelectedFeature({
                      title: '3-Tier Affiliate System',
                      desc: 'Earn passive rewards on 3 generations of team earnings: Level 1 (5%), Level 2 (2%), Level 3 (1%) deposited daily.',
                      badge: 'Multi-Tier Yields',
                    })
                  }
                  className="inline-flex items-center text-[11px] font-semibold text-[#b4f02a] hover:text-white transition space-x-0.5 cursor-pointer"
                >
                  <span>Learn more</span>
                  <svg className="w-3 h-3 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
                {/* 3D Mortarboard Cap */}
                <div className="w-14 h-14 relative flex items-center justify-center flex-shrink-0">
                  <svg className="w-14 h-14 drop-shadow-md" viewBox="0 0 60 60" fill="none">
                    <path d="M22 36 Q30 42 38 36 L38 42 Q30 48 22 42 Z" fill="#14161e" stroke="#262933" strokeWidth="1.5"></path>
                    <path d="M30 20 L50 28 L30 36 L10 28 Z" fill="#1e212b" stroke="#2e3342" strokeWidth="1.5"></path>
                    <ellipse cx="30" cy="28" rx="3" ry="2" fill="#b4f02a"></ellipse>
                    <path d="M30 28 Q24 33 22 42" stroke="#262933" strokeWidth="1.5" fill="none"></path>
                    <circle cx="22" cy="43" r="1.8" fill="#b4f02a"></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Investment Plans */}
      <section className="px-5 mt-8 mb-6" data-purpose="investment-plans">
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9aff02] bg-[#9aff02]/10 border border-[#9aff02]/30 px-3 py-1 rounded-full">
            Transparent &amp; Sustainable
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-2.5 leading-tight">
            Transparent &amp; Affordable <span className="text-[#9aff02]">Pricing</span>
          </h3>
          <p className="text-xs text-[#717684] mt-1.5 max-w-[300px] mx-auto leading-relaxed">
            Pick a package best suited for your goals and grow automated daily yield from there.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Card 1: Starter Bear */}
          <div className="relative rounded-[24px] p-5 bg-[#12141a] border border-white/10 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white tracking-tight">Starter Bear</h4>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                  Level 1
                </span>
              </div>
              <div className="mt-3 mb-4 flex items-baseline space-x-1.5">
                <span className="text-3xl font-black text-white tracking-tight">Rs 500</span>
                <span className="text-[11px] text-gray-400 font-medium">/ 30 days</span>
              </div>
              <div className="flex flex-col space-y-2.5 pb-5 border-b border-white/5">
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Daily Profit: <strong className="text-white font-bold">Rs 10</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 fill-black" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Validity: <strong className="text-white font-bold">30 Days</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Total Profit: <strong className="text-[#9aff02] font-bold">Rs 800 (160%)</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => onSelectPlan(INVESTMENT_PLANS[0])}
                type="button"
                className="w-full py-3 rounded-full bg-white text-black hover:bg-[#9aff02] font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Invest Now</span>
                <svg className="w-3.5 h-3.5 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2: Bronze Bear */}
          <div className="relative rounded-[24px] p-5 bg-[#12141a] border border-white/10 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white tracking-tight">Bronze Bear</h4>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#9aff02]/15 text-[#9aff02] border border-[#9aff02]/30">
                  Growth
                </span>
              </div>
              <div className="mt-3 mb-4 flex items-baseline space-x-1.5">
                <span className="text-3xl font-black text-white tracking-tight">Rs 1,500</span>
                <span className="text-[11px] text-gray-400 font-medium">/ 30 days</span>
              </div>
              <div className="flex flex-col space-y-2.5 pb-5 border-b border-white/5">
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Daily Profit: <strong className="text-white font-bold">Rs 33</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 fill-black" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Validity: <strong className="text-white font-bold">30 Days</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Total Profit: <strong className="text-[#9aff02] font-bold">Rs 2,490 (166%)</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => onSelectPlan(INVESTMENT_PLANS[1])}
                type="button"
                className="w-full py-3 rounded-full bg-white text-black hover:bg-[#9aff02] font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Invest Now</span>
                <svg className="w-3.5 h-3.5 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Card 3: Silver Bear */}
          <div className="relative rounded-[24px] p-5 bg-[#12141a] border border-white/10 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-white tracking-tight">Silver Bear</h4>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#9aff02]/15 text-[#9aff02] border border-[#9aff02]/30">
                  Scale
                </span>
              </div>
              <div className="mt-3 mb-4 flex items-baseline space-x-1.5">
                <span className="text-3xl font-black text-white tracking-tight">Rs 3,500</span>
                <span className="text-[11px] text-gray-400 font-medium">/ 35 days</span>
              </div>
              <div className="flex flex-col space-y-2.5 pb-5 border-b border-white/5">
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Daily Profit: <strong className="text-white font-bold">Rs 84</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 fill-black" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Validity: <strong className="text-white font-bold">35 Days</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                  <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                  <span className="font-medium">
                    Total Profit: <strong className="text-[#9aff02] font-bold">Rs 6,440 (184%)</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={() => onSelectPlan(INVESTMENT_PLANS[2])}
                type="button"
                className="w-full py-3 rounded-full bg-white text-black hover:bg-[#9aff02] font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Invest Now</span>
                <svg className="w-3.5 h-3.5 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Enterprise-Style Wide Card: Gold Bear Recommended */}
          <div className="relative rounded-[28px] p-5 bg-[#12141a] border-2 border-[#9aff02]/60 hover:border-[#9aff02] transition-all shadow-[0_0_20px_rgba(180,240,42,0.15)] flex flex-col justify-between overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#9aff02]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-start justify-between pb-3 relative z-10">
              <div>
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#9aff02] text-black shadow-[0_0_8px_rgba(180,240,42,0.8)] font-black text-[9px] uppercase tracking-wider mb-2">
                  <span>Enterprise • Recommended</span>
                </div>
                <h4 className="text-xl font-black text-white tracking-tight leading-tight">Gold Bear</h4>
                <p className="text-[11px] text-gray-400 mt-1 max-w-[200px]">
                  Maximum yield tier with VIP profit rates &amp; rapid instant verification.
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-2xl font-black text-white tracking-tight">Rs 7,500</span>
                <span className="text-[10px] text-gray-400 font-medium mt-0.5">/ 40 days</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 py-3 border-y border-white/10 relative z-10">
              <div className="flex items-center space-x-2.5 text-xs text-gray-200">
                <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-3 h-3 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span>
                  Daily Profit: <strong className="text-white font-bold">Rs 195/day</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-200">
                <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-3 h-3 fill-black" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                </span>
                <span>
                  Active Duration: <strong className="text-white font-bold">40 Days Pool</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-200">
                <span className="w-5 h-5 rounded-md bg-[#9aff02] text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg className="w-3 h-3 stroke-black stroke-[2.5] fill-none" viewBox="0 0 24 24">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span>
                  Total Profit: <strong className="text-[#9aff02] font-bold">Rs 15,300 (204% Yield)</strong>
                </span>
              </div>
            </div>

            <div className="pt-4 relative z-10 flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectPlan(INVESTMENT_PLANS[3])}
                type="button"
                className="w-full py-3.5 rounded-full bg-[#9aff02] hover:bg-[#b4f02a] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(180,240,42,0.4)] active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Unlock Enterprise Plan</span>
                <svg className="w-4 h-4 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Link */}
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={() => onNavigateTab('packages')}
            className="inline-flex items-center text-xs font-semibold text-[#9aff02] hover:text-white transition space-x-1.5 group py-1 cursor-pointer"
          >
            <span className="group-hover:underline">View All Investment Packages</span>
            <svg
              className="w-3.5 h-3.5 stroke-current stroke-[2.5] fill-none group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </section>

      {/* SECTION: Supported Payment Gateways */}
      <section className="px-5 mt-6 mb-8" data-purpose="payment-gateways">
        <div className="relative rounded-[32px] p-6 bg-[#0c0e14] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center text-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-44 bg-gradient-to-b from-[#b4f02a]/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none"></div>
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-600/20 blur-2xl pointer-events-none"></div>

          {/* Floating Icon Dock */}
          <div className="relative z-10 flex flex-col items-center gap-2.5 mb-6 pt-2">
            {/* Top row of 4 icons */}
            <div className="flex items-center justify-center space-x-2.5">
              {PAYMENT_GATEWAYS.slice(0, 4).map((gw) => (
                <button
                  key={gw.id}
                  onClick={() => onSelectGateway(gw)}
                  type="button"
                  title={gw.name}
                  className="group relative w-14 h-14 rounded-2xl bg-[#181a22]/90 border border-white/15 p-2 flex items-center justify-center shadow-lg hover:border-[#b4f02a]/50 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
                >
                  <div className="w-full h-full rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden shadow-inner">
                    <img src={gw.icon} alt={gw.name} className="w-full h-full object-contain" />
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-center space-x-2.5">
              {PAYMENT_GATEWAYS.slice(4).map((gw) => (
                <button
                  key={gw.id}
                  onClick={() => onSelectGateway(gw)}
                  type="button"
                  title={gw.name}
                  className="group relative w-14 h-14 rounded-2xl bg-[#181a22]/90 border border-white/15 p-2 flex items-center justify-center shadow-lg hover:border-[#b4f02a]/50 hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
                >
                  <div className="w-full h-full rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden shadow-inner">
                    <img src={gw.icon} alt={gw.name} className="w-full h-full object-contain" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center Title & Subtitle */}
          <div className="relative z-10 max-w-[320px] mb-5">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              SUPPORTED PAYMENT GATEWAYS
            </h2>
            <p className="text-xs text-gray-400 font-normal leading-relaxed mt-2">
              Instant Direct Payments &amp; Payouts
            </p>
          </div>

          {/* Trust / Security Verification Pill */}
          <div className="mt-2 flex items-center justify-center space-x-1.5 text-center text-gray-400 z-10">
            <svg className="w-3.5 h-3.5 text-[#b4f02a] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
            </svg>
            <span className="text-[10px] font-medium tracking-wide text-gray-400">
              256-bit SSL Encrypted &amp; Verified Direct Gateway
            </span>
          </div>
        </div>
      </section>

      {/* Feature Learn More Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] bg-[#14161f] border border-white/15 p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#b4f02a]/15 text-[#b4f02a] text-[10px] font-bold uppercase tracking-wider mb-2">
              {selectedFeature.badge}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{selectedFeature.title}</h3>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">{selectedFeature.desc}</p>
            <button
              onClick={() => setSelectedFeature(null)}
              className="mt-5 w-full py-2.5 rounded-full bg-white hover:bg-[#b4f02a] text-black font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
