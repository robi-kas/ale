import React, { useState } from 'react';
import { ASSETS } from '../data/constants';
import { UserProfile } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  onOpenSettings: () => void;
  onOpenTasks: () => void;
  onOpenFriends: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onOpenSettings,
  onOpenTasks,
  onOpenFriends,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Thu');

  const daysOfWeek = [
    { day: 'Mon', date: 19, activeDot: true },
    { day: 'Tue', date: 20, activeDot: false },
    { day: 'Wen', date: 21, activeDot: false },
    { day: 'Thu', date: 22, isSelected: true, dotsCount: 3 },
    { day: 'Fri', date: 23, activeDot: true },
    { day: 'Sat', date: 24, activeDot: false },
    { day: 'Sun', date: 25, activeDot: false },
  ];

  return (
    <div className="flex flex-col pb-28 select-none">
      {/* SECTION: User Profile (Avatar, username, gamer tag) */}
      <section className="flex flex-col items-center justify-center pt-3 pb-3" data-purpose="user-profile">
        {/* Avatar with neon dashed outline circle */}
        <div className="relative flex items-center justify-center">
          <div className="relative p-1 rounded-full border-2 border-dashed border-[#b4f02a] shadow-[0_0_18px_rgba(180,240,42,0.6)] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#242630] border-2 border-[#0c0d10]">
              <img
                alt="Mr. Bobrovsky Avatar"
                className="w-full h-full object-cover scale-105"
                src={user.avatar || ASSETS.avatar}
              />
            </div>
          </div>
        </div>

        {/* User Information */}
        <h1 className="text-xl font-bold tracking-tight text-white mt-3.5">{user.name}</h1>
        <p className="text-[13px] text-gray-400 font-medium tracking-wide mt-0.5">{user.handle}</p>
      </section>

      {/* SECTION: QuickStatsOverview (Win/Lose, Level, Days) */}
      <section className="px-5 py-2 grid grid-cols-3 gap-2" data-purpose="stats-counters">
        {/* Win/Lose Stat */}
        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center space-x-1.5">
            <svg
              className="w-4 h-4 text-[#b4f02a]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="9"></circle>
              <path d="M12 3a9 9 0 0 1 9 9h-9V3z" fill="currentColor" stroke="none"></path>
            </svg>
            <span className="text-base font-bold text-white tracking-tight">{user.winLoseRate}%</span>
          </div>
          <span className="text-[11.5px] text-gray-400 mt-1 font-medium">Win/Lose</span>
        </div>

        {/* Level Stat with Divider Lines */}
        <div className="flex flex-col items-center justify-center py-1 border-x border-white/5">
          <div className="flex items-center space-x-1.5">
            <img alt="Level Badge" className="w-4 h-4 object-contain" src={ASSETS.levelBadge} />
            <span className="text-base font-bold text-white tracking-tight">{user.level}</span>
          </div>
          <span className="text-[11.5px] text-gray-400 mt-1 font-medium">Level</span>
        </div>

        {/* Streak Days Stat */}
        <div className="flex flex-col items-center justify-center py-1">
          <div className="flex items-center space-x-1.5">
            <svg className="w-4 h-4 text-[#b4f02a] fill-current" viewBox="0 0 24 24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path>
            </svg>
            <span className="text-base font-bold text-white tracking-tight">{user.totalDays}</span>
          </div>
          <span className="text-[11.5px] text-gray-400 mt-1 font-medium">Days</span>
        </div>
      </section>

      {/* SECTION: CalendarWeekStrip */}
      <section className="px-5 py-3" data-purpose="weekly-calendar">
        <div className="grid grid-cols-7 gap-1.5 bg-[#14151a] p-2 rounded-2xl border border-white/5">
          {daysOfWeek.map((d) => {
            const isCurrent = selectedDay === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                type="button"
                className={`flex flex-col items-center justify-between py-2 text-center transition-all cursor-pointer rounded-xl ${
                  isCurrent
                    ? 'px-1 bg-[#1c1e25] border border-[#b4f02a] shadow-sm shadow-[#b4f02a]/20'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Indicator Dots */}
                {isCurrent ? (
                  <div className="flex space-x-0.5 mb-1">
                    <span className="w-1 h-1 bg-[#b4f02a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#b4f02a] rounded-full"></span>
                    <span className="w-1 h-1 bg-[#b4f02a] rounded-full"></span>
                  </div>
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full mb-1 ${
                      d.activeDot ? 'bg-[#b4f02a] opacity-80' : 'bg-gray-600 opacity-40'
                    }`}
                  ></span>
                )}

                <span
                  className={`text-[11px] font-medium ${
                    isCurrent ? 'text-white font-semibold' : 'text-gray-400'
                  }`}
                >
                  {d.day}
                </span>
                <span
                  className={`text-sm mt-1 ${
                    isCurrent ? 'font-bold text-white' : 'font-semibold text-gray-300'
                  }`}
                >
                  {d.date}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION: GridModulesSection (Friends & Keep it up!) */}
      <section className="px-5 py-2 grid grid-cols-12 gap-3" data-purpose="interactive-cards">
        {/* Friends Card (Col 4) */}
        <article
          onClick={onOpenFriends}
          className="col-span-4 bg-[#14151a] border border-white/5 hover:border-white/20 transition-all rounded-3xl p-3.5 flex flex-col justify-between items-center text-center relative overflow-hidden cursor-pointer group shadow-lg"
          data-purpose="friends-card"
        >
          {/* Stacked friend avatars */}
          <div className="flex items-center -space-x-2.5 mt-1">
            <div className="w-8 h-8 rounded-full border-2 border-[#14151a] bg-zinc-800 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-xs font-bold text-gray-400">🎮</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#14151a] bg-zinc-700 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-xs font-bold text-gray-300">👾</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-[#14151a] bg-[#292b36] overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-[10px] font-bold text-[#b4f02a]">★</span>
            </div>
          </div>
          <div className="mt-4 pb-1">
            <h2 className="text-sm font-semibold text-white">Friends</h2>
            <span className="text-[11px] font-medium text-[#b4f02a] block mt-0.5">
              {user.friendsOnline} online
            </span>
          </div>
        </article>

        {/* Streak / Trophy Card (Col 8) */}
        <article
          className="col-span-8 bg-[#14151a] border border-white/5 rounded-3xl p-4 flex justify-between items-center relative overflow-hidden shadow-lg"
          data-purpose="streak-card"
        >
          <div className="flex flex-col justify-between h-full z-10 pr-2">
            <div>
              <h2 className="text-[15px] font-bold text-white tracking-tight leading-tight">
                Keep it up!
              </h2>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                {user.streakDays} days in a row
                <br />
                you are here!
              </p>
            </div>
            {/* Pagination dots with green check badge */}
            <div className="flex items-center space-x-1.5 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b4f02a]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b4f02a]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#b4f02a] flex items-center justify-center text-black">
                <svg className="w-2.5 h-2.5 stroke-black stroke-[3.5]" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
            </div>
          </div>
          {/* 3D Trophy asset illustration */}
          <div className="w-24 h-24 relative flex items-center justify-center flex-shrink-0 -mr-2">
            <img
              alt="Streak Achievement Trophy"
              className="w-full h-full object-contain drop-shadow-xl hover:rotate-6 transition-transform duration-300"
              src={ASSETS.trophy}
            />
          </div>
        </article>
      </section>

      {/* SECTION: BannerPromoSection (Complite new tasks) */}
      <section className="px-5 py-2" data-purpose="banner-tasks">
        <div
          onClick={onOpenTasks}
          className="bg-[#14151a] border border-white/5 hover:border-white/20 transition-all rounded-3xl p-3.5 flex items-center space-x-3.5 relative overflow-hidden cursor-pointer group shadow-lg"
        >
          {/* Left graphic: Green 3D Tokens / Emblems */}
          <div className="w-16 h-16 rounded-2xl bg-[#1b1c24] flex items-center justify-center flex-shrink-0 relative overflow-hidden p-1 group-hover:scale-105 transition-transform">
            <img
              alt="Task Coin"
              className="w-full h-full object-contain scale-110 drop-shadow-md"
              src={ASSETS.taskCoin}
            />
          </div>
          {/* Task banner description */}
          <div className="flex-1 pr-1">
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
              <span>Complite new tasks</span>
              <span className="text-[10px] text-[#b4f02a] uppercase font-bold">+Rs 150</span>
            </h2>
            <p className="text-[11.5px] text-gray-400 mt-1 leading-normal line-clamp-2">
              Get a bonus on your winnings with the teams in your collection
            </p>
          </div>
        </div>
      </section>

      {/* Account Settings / Referral Card */}
      <section className="px-5 mt-3">
        <div className="rounded-2xl p-4 bg-[#12141a] border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#181a24] border border-white/10 flex items-center justify-center text-lg">
              🎟️
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                My Referral Code
              </span>
              <h4 className="text-sm font-black text-[#b4f02a] tracking-wider mt-0.5">
                {user.referralCode}
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(user.referralCode);
              alert(`Copied referral code ${user.referralCode}!`);
            }}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#b4f02a] hover:text-black text-white text-xs font-bold transition cursor-pointer"
          >
            Copy
          </button>
        </div>
      </section>
    </div>
  );
};
