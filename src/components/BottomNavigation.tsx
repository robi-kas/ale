import React from 'react';
import { ASSETS } from '../data/constants';
import { TabType } from '../types';

interface BottomNavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav
      className="fixed sm:absolute bottom-0 inset-x-0 z-30 pointer-events-none flex flex-col items-center justify-end px-3 pb-1"
      data-purpose="bottom-navigation"
    >
      <div className="pointer-events-auto relative w-full max-w-[420px] px-1">
        <div className="relative bg-[#14151a]/95 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-2xl pt-1.5 px-2 flex items-end justify-between pb-1">
          {/* Center Wheel Glow Notch Background */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-28 h-9 pointer-events-none flex justify-center">
            <div className="absolute -top-2 w-20 h-20 rounded-full bg-[#b4f02a]/30 blur-xl pointer-events-none"></div>
            <svg
              className="w-full h-full text-[#14151a]/95 fill-current filter drop-shadow-[0_-5px_10px_rgba(0,0,0,0.5)]"
              preserveAspectRatio="none"
              viewBox="0 0 128 36"
            >
              <path d="M0,36 C32,36 38,0 64,0 C90,0 96,36 128,36 Z"></path>
            </svg>
          </div>

          {/* Tab 1: Home */}
          <button
            onClick={() => onSelectTab('home')}
            className={`flex-1 flex flex-col items-center justify-center py-1 group transition ${
              currentTab === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            type="button"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                className={`w-5 h-5 stroke-current ${
                  currentTab === 'home' ? 'stroke-[2.2]' : 'stroke-[1.8]'
                } fill-none`}
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path d="M9 14l2-2 2 1.5 3-3.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M15 10h1.5v1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                currentTab === 'home' ? 'font-bold text-white' : 'font-medium text-gray-400'
              }`}
            >
              Home
            </span>
            {currentTab === 'home' && (
              <span className="w-6 h-1 bg-[#b4f02a] rounded-full shadow-[0_0_8px_rgba(180,240,42,0.95)] mt-0.5"></span>
            )}
          </button>

          {/* Tab 2: Wallet */}
          <button
            onClick={() => onSelectTab('wallet')}
            className={`flex-1 flex flex-col items-center justify-center py-1 group transition ${
              currentTab === 'wallet' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            type="button"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                className={`w-5 h-5 stroke-current ${
                  currentTab === 'wallet' ? 'stroke-[2.2]' : 'stroke-[1.8]'
                } fill-none`}
                viewBox="0 0 24 24"
              >
                <rect height="13" rx="3" strokeLinecap="round" strokeLinejoin="round" width="18" x="3" y="6"></rect>
                <path d="M16 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0" fill="currentColor"></path>
                <path d="M7 6V4a2 2 0 0 1 2-2h8" strokeLinecap="round"></path>
              </svg>
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                currentTab === 'wallet' ? 'font-bold text-white' : 'font-medium text-gray-400'
              }`}
            >
              Wallet
            </span>
            {currentTab === 'wallet' && (
              <span className="w-6 h-1 bg-[#b4f02a] rounded-full shadow-[0_0_8px_rgba(180,240,42,0.95)] mt-0.5"></span>
            )}
          </button>

          {/* Tab 3: Lucky Spin (Raised Central Action) */}
          <div className="flex-1 flex flex-col items-center relative -top-5">
            <div className="absolute -inset-1.5 rounded-full bg-[#b4f02a]/40 blur-md pointer-events-none"></div>
            <button
              onClick={() => onSelectTab('spin')}
              aria-label="Lucky Spin"
              className="relative w-14 h-14 rounded-full bg-[#b4f02a] shadow-[0_0_20px_rgba(180,240,42,0.7)] flex items-center justify-center text-black hover:scale-105 active:scale-95 transition border-2 border-[#14151a]"
              type="button"
            >
              <img
                src={ASSETS.bottomCoin}
                alt="Coin"
                className="w-10 h-10 object-contain drop-shadow-md select-none"
              />
            </button>
            <span
              className={`text-[10.5px] tracking-tight mt-1 ${
                currentTab === 'spin' ? 'font-bold text-white' : 'font-medium text-gray-400'
              }`}
            >
              Lucky Spin
            </span>
            {currentTab === 'spin' && (
              <span className="w-6 h-1 bg-[#b4f02a] rounded-full shadow-[0_0_8px_rgba(180,240,42,0.95)] mt-0.5"></span>
            )}
          </div>

          {/* Tab 4: Packages */}
          <button
            onClick={() => onSelectTab('packages')}
            className={`flex-1 flex flex-col items-center justify-center py-1 group transition ${
              currentTab === 'packages' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            type="button"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                className={`w-5 h-5 stroke-current ${
                  currentTab === 'packages' ? 'stroke-[2.2]' : 'stroke-[1.8]'
                } fill-none`}
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round"></polyline>
                <line strokeLinecap="round" strokeLinejoin="round" x1="12" x2="12" y1="22.08" y2="12"></line>
              </svg>
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                currentTab === 'packages' ? 'font-bold text-white' : 'font-medium text-gray-400'
              }`}
            >
              Packages
            </span>
            {currentTab === 'packages' && (
              <span className="w-6 h-1 bg-[#b4f02a] rounded-full shadow-[0_0_8px_rgba(180,240,42,0.95)] mt-0.5"></span>
            )}
          </button>

          {/* Tab 5: Profile */}
          <button
            onClick={() => onSelectTab('profile')}
            className={`flex-1 flex flex-col items-center justify-center py-1 group transition ${
              currentTab === 'profile' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            type="button"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg
                className={`w-5 h-5 stroke-current ${
                  currentTab === 'profile' ? 'stroke-[2.2]' : 'stroke-[1.8]'
                } fill-none`}
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"></path>
                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"></circle>
              </svg>
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                currentTab === 'profile' ? 'font-bold text-white' : 'font-medium text-gray-400'
              }`}
            >
              Profile
            </span>
            {currentTab === 'profile' && (
              <span className="w-6 h-1 bg-[#b4f02a] rounded-full shadow-[0_0_8px_rgba(180,240,42,0.95)] mt-0.5"></span>
            )}
          </button>
        </div>
        {/* iOS Home Indicator Bar */}
        <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-1.5"></div>
      </div>
    </nav>
  );
};
