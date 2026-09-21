import React, { useState } from 'react';
import { INVESTMENT_PLANS } from '../data/constants';
import { InvestmentPlan } from '../types';

interface PackagesScreenProps {
  balance: number;
  onSelectPlan: (plan: InvestmentPlan) => void;
  activePlansCount: number;
}

export const PackagesScreen: React.FC<PackagesScreenProps> = ({
  balance,
  onSelectPlan,
  activePlansCount,
}) => {
  const [calcAmount, setCalcAmount] = useState<number>(1500);

  // Calculate estimated daily and total return
  const estimatedDaily = Math.round(calcAmount * 0.024);
  const estimatedTotal = Math.round(calcAmount * 1.66);

  return (
    <div className="flex flex-col pb-28 select-none">
      {/* Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Investment Packages</h1>
          <p className="text-xs text-gray-400 mt-0.5">Automated algorithmic trading yield pools</p>
        </div>
        <span className="text-[11px] font-bold text-[#b4f02a] bg-[#b4f02a]/10 border border-[#b4f02a]/20 px-2.5 py-1 rounded-full">
          {activePlansCount} Active Pools
        </span>
      </div>

      {/* Calculator Widget */}
      <div className="px-5 my-3">
        <div className="rounded-2xl p-4 bg-[#141620] border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Yield Profit Calculator
            </span>
            <span className="text-xs font-black text-[#b4f02a]">Rs {calcAmount.toLocaleString()}</span>
          </div>

          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={calcAmount}
            onChange={(e) => setCalcAmount(Number(e.target.value))}
            className="w-full accent-[#b4f02a] cursor-pointer"
          />

          <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/5 text-center">
            <div className="p-2 rounded-xl bg-[#0c0d12] border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase block font-semibold">
                Est. Daily Yield
              </span>
              <span className="text-base font-black text-[#b4f02a] mt-0.5 block">
                +Rs {estimatedDaily}/day
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#0c0d12] border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase block font-semibold">
                Est. 30-Day Return
              </span>
              <span className="text-base font-black text-white mt-0.5 block">
                Rs {estimatedTotal} (166%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans List */}
      <div className="px-5 space-y-3.5 mt-2">
        {INVESTMENT_PLANS.map((plan) => {
          const isGold = plan.isEnterprise;
          return (
            <div
              key={plan.id}
              className={`rounded-[24px] p-5 bg-[#12141a] transition-all shadow-xl flex flex-col justify-between ${
                isGold
                  ? 'border-2 border-[#b4f02a] shadow-[0_0_20px_rgba(180,240,42,0.15)]'
                  : 'border border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white tracking-tight">{plan.name}</h4>
                  <span
                    className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      isGold
                        ? 'bg-[#b4f02a] text-black font-black border-transparent'
                        : 'bg-white/10 text-gray-300 border-white/10'
                    }`}
                  >
                    {plan.tierLabel}
                  </span>
                </div>

                <div className="mt-3 mb-4 flex items-baseline space-x-1.5">
                  <span className="text-3xl font-black text-white tracking-tight">
                    Rs {plan.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    / {plan.durationDays} days
                  </span>
                </div>

                {/* Features List */}
                <div className="flex flex-col space-y-2 pb-4 border-b border-white/5">
                  <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                    <span className="w-5 h-5 rounded-md bg-[#b4f02a] text-black flex items-center justify-center flex-shrink-0">
                      ✓
                    </span>
                    <span>
                      Daily Profit: <strong className="text-white font-bold">Rs {plan.dailyProfit}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                    <span className="w-5 h-5 rounded-md bg-[#b4f02a] text-black flex items-center justify-center flex-shrink-0">
                      ⚡
                    </span>
                    <span>
                      Validity: <strong className="text-white font-bold">{plan.durationDays} Days Pool</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                    <span className="w-5 h-5 rounded-md bg-[#b4f02a] text-black flex items-center justify-center flex-shrink-0">
                      💰
                    </span>
                    <span>
                      Total Profit:{' '}
                      <strong className="text-[#b4f02a] font-bold">
                        Rs {plan.totalProfit.toLocaleString()} ({plan.roiPercentage}%)
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5">
                <button
                  onClick={() => onSelectPlan(plan)}
                  type="button"
                  className={`w-full py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                    isGold
                      ? 'bg-[#b4f02a] hover:bg-[#9ae600] text-black shadow-[0_0_15px_rgba(180,240,42,0.4)]'
                      : 'bg-white hover:bg-[#b4f02a] text-black'
                  }`}
                >
                  <span>{isGold ? 'Unlock Enterprise Plan' : 'Invest Now'}</span>
                  <svg className="w-4 h-4 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                    <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
