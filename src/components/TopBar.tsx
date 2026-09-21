import React from 'react';
import { ASSETS } from '../data/constants';
import { TabType } from '../types';

interface ActionHeaderProps {
  currentTab: TabType;
  balance: number;
  onOpenDeposit: () => void;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
  unreadNotifications?: boolean;
}

export const ActionHeader: React.FC<ActionHeaderProps> = ({
  currentTab,
  balance,
  onOpenDeposit,
  onOpenSettings,
  onOpenNotifications,
  unreadNotifications = true,
}) => {
  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <header className="px-5 pt-4 flex items-center justify-between z-20" data-purpose="action-header">
      {/* Left side: either brand logo (Home) or Settings gear & bell (Profile & Spin) */}
      {currentTab === 'home' ? (
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 flex items-center justify-center bg-transparent overflow-hidden">
            <img
              src={ASSETS.bearsLogo}
              alt="Logo"
              className="w-full h-full object-contain bg-transparent"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight leading-none text-white">
              BEARS<span className="text-[#b4f02a]">4</span>PROFIT
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#717684] font-semibold mt-0.5">
              investment
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4 text-gray-300">
          {/* Settings Gear */}
          <button
            onClick={onOpenSettings}
            aria-label="Settings"
            className="hover:text-[#b4f02a] active:scale-95 transition"
            type="button"
          >
            <svg className="w-[21px] h-[21px] fill-current" viewBox="0 0 24 24">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
            </svg>
          </button>
          {/* Notifications Bell with lime dot */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative hover:text-[#b4f02a] active:scale-95 transition"
            type="button"
          >
            <svg className="w-[21px] h-[21px] fill-current" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
            </svg>
            {unreadNotifications && (
              <span className="absolute top-0.5 -right-0.5 w-2 h-2 bg-[#b4f02a] rounded-full ring-2 ring-[#0c0d10]"></span>
            )}
          </button>
        </div>
      )}

      {/* Right side: Notifications & Coin Pill in Home, or Coin Pill alone in other tabs */}
      <div className="flex items-center space-x-2.5">
        {currentTab === 'home' && (
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-[#181a20] border border-white/5 flex items-center justify-center text-gray-300 hover:text-[#b4f02a] active:scale-95 transition"
            type="button"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
            </svg>
            {unreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#b4f02a] rounded-full ring-2 ring-[#181a20]"></span>
            )}
          </button>
        )}

        {/* Coin Balance Pill with + button */}
        <div
          onClick={onOpenDeposit}
          className="flex items-center bg-[#181a20] border border-white/5 py-1 px-1.5 pl-2.5 rounded-full space-x-2 shadow-sm cursor-pointer hover:border-white/20 transition group"
        >
          <img
            src={ASSETS.coin}
            alt="Coin"
            className="w-5 h-5 object-contain group-hover:rotate-12 transition-transform"
          />
          <span className="text-[13px] sm:text-[13.5px] font-semibold text-white tracking-tight">
            {formattedBalance}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDeposit();
            }}
            aria-label="Add funds"
            className="w-5 h-5 rounded-full bg-[#b4f02a] text-black flex items-center justify-center font-bold text-xs hover:scale-110 active:scale-95 transition shadow-[0_0_8px_rgba(180,240,42,0.5)]"
            type="button"
          >
            <svg className="w-3 h-3 stroke-black stroke-[3]" fill="none" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
