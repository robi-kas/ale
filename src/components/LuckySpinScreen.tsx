import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ASSETS, LIVE_WINNERS, SPIN_PRIZES } from '../data/constants';
import { SpinPrize } from '../types';

interface LuckySpinScreenProps {
  balance: number;
  onAddWinnings: (amount: number, label: string) => void;
  onOpenDeposit: () => void;
}

export const LuckySpinScreen: React.FC<LuckySpinScreenProps> = ({
  balance,
  onAddWinnings,
  onOpenDeposit,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hasFreeSpin, setHasFreeSpin] = useState(true);
  const [countdownSeconds, setCountdownSeconds] = useState(22474); // 06:14:34
  const [wonPrize, setWonPrize] = useState<SpinPrize | null>(null);
  const [vipSpins, setVipSpins] = useState(2);
  const [activeWinnerIndex, setActiveWinnerIndex] = useState(0);

  // Live timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live winner feed rotation
  useEffect(() => {
    const winnerTimer = setInterval(() => {
      setActiveWinnerIndex((prev) => (prev + 1) % LIVE_WINNERS.length);
    }, 3500);
    return () => clearInterval(winnerTimer);
  }, []);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return {
      hrs: hrs.toString().padStart(2, '0'),
      min: mins.toString().padStart(2, '0'),
      sec: secs.toString().padStart(2, '0'),
    };
  };

  const { hrs, min, sec } = formatTime(countdownSeconds);

  // 8 slices => 45 degrees per slice
  // Slice 0 (Rs 1 CASH): -22.5 to 22.5 (centered at 0 deg / top)
  // Slice 1 (Rs 5 BONUS): 45 deg, etc.
  const handleSpin = () => {
    if (isSpinning) return;

    // Pick winning slice (weighted towards reasonable wins, with small chance of jackpot)
    const rand = Math.random();
    let winningIndex = 0;
    if (rand < 0.35) winningIndex = 0; // Rs 1
    else if (rand < 0.6) winningIndex = 1; // Rs 5
    else if (rand < 0.8) winningIndex = 2; // Rs 20
    else if (rand < 0.9) winningIndex = 3; // Rs 50
    else if (rand < 0.96) winningIndex = 4; // Rs 100
    else if (rand < 0.985) winningIndex = 5; // Rs 500
    else if (rand < 0.995) winningIndex = 6; // Rs 1,000
    else winningIndex = 7; // JACKPOT 50,000!

    const prize = SPIN_PRIZES[winningIndex];
    setIsSpinning(true);
    setWonPrize(null);

    // Each slice is 45 deg.
    // To have slice `i` end up at top (0 deg pointer), wheel must be rotated so slice i is at top:
    // angle = 360 - (i * 45)
    const targetSliceAngle = (360 - winningIndex * 45) % 360;
    // Add 5 to 7 full rotations
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    // Slight random offset within slice (-14 to +14 deg) so it doesn't always hit dead center
    const randomOffset = (Math.random() - 0.5) * 24;
    const finalAngle = rotationAngle + extraRotations + (targetSliceAngle - (rotationAngle % 360)) + randomOffset;

    setRotationAngle(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);
      if (hasFreeSpin) {
        setHasFreeSpin(false);
      } else if (vipSpins > 0) {
        setVipSpins((prev) => prev - 1);
      }

      // Celebrate with confetti
      confetti({
        particleCount: prize.isJackpot ? 150 : prize.amount >= 500 ? 100 : 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b4f02a', '#ffffff', '#ffd700', '#00e5ff'],
      });
    }, 4000);
  };

  const handleClaimPrize = () => {
    if (wonPrize) {
      onAddWinnings(wonPrize.amount, wonPrize.label);
      setWonPrize(null);
    }
  };

  return (
    <div className="flex flex-col pb-28 select-none">
      {/* 24 Hours Free Lucky Wheel Badge */}
      <div className="flex justify-center mt-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1c2214] border border-[#b4f02a]/40 shadow-[0_0_12px_rgba(180,240,42,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#b4f02a] animate-ping"></span>
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#b4f02a] flex items-center gap-1">
            ⚡ 24 HOURS FREE LUCKY WHEEL
          </span>
        </div>
      </div>

      {/* Main Screen Title */}
      <div className="text-center px-5 mt-3">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          BEAR JACKPOT SPIN
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-[320px] mx-auto leading-relaxed">
          Spin free every 24 hours! Deposited members get unlocked access to higher cash rewards!
        </p>
      </div>

      {/* WHEEL CONTAINER WITH DECORATIONS */}
      <div className="relative flex flex-col items-center justify-center my-4 px-4">
        {/* Floating background sparkles / decor */}
        <div className="absolute left-6 top-8 text-lg opacity-40 text-[#b4f02a] animate-pulse">🍀</div>
        <div className="absolute right-6 top-12 text-lg opacity-40 text-[#b4f02a] animate-pulse">✨</div>
        <div className="absolute right-8 bottom-6 text-sm opacity-30 text-yellow-400">⚡</div>

        {/* Pointer Needle at Top (pointing down into wedge) */}
        <div className="relative z-20 flex flex-col items-center -mb-4">
          <div className="w-8 h-10 flex flex-col items-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            <svg className="w-7 h-9 filter drop-shadow-[0_0_8px_rgba(180,240,42,0.8)]" viewBox="0 0 28 36" fill="none">
              <path
                d="M14 36L4 12C2 7.5 5.5 2 10.5 2H17.5C22.5 2 26 7.5 24 12L14 36Z"
                fill="#b4f02a"
              />
              <circle cx="14" cy="11" r="3.5" fill="#0c0d10" />
            </svg>
          </div>
        </div>

        {/* The Rotating Wheel */}
        <div className="relative w-[310px] h-[310px] sm:w-[330px] sm:h-[330px] rounded-full p-2 bg-[#12141a] border-4 border-[#232733] shadow-[0_0_35px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-hidden">
          {/* Outer glowing border ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"></div>

          {/* Wheel Slices Canvas / SVG */}
          <div
            className="w-full h-full rounded-full transition-transform duration-[4000ms]"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transitionTimingFunction: 'cubic-bezier(0.15, 0.95, 0.2, 1)',
            }}
          >
            <svg viewBox="0 0 300 300" className="w-full h-full">
              <defs>
                {/* Wedge Gradients */}
                <linearGradient id="slice-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#151822" />
                  <stop offset="100%" stopColor="#0d0f15" />
                </linearGradient>
                <linearGradient id="slice-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a2216" />
                  <stop offset="100%" stopColor="#10150e" />
                </linearGradient>
                <linearGradient id="slice-jackpot" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c1e0e" />
                  <stop offset="100%" stopColor="#150f08" />
                </linearGradient>
              </defs>

              {/* 8 Sectors */}
              {[
                { label: 'Rs 1', type: 'CASH', color: '#b4f02a', grad: 'slice-accent' },
                { label: 'Rs 5', type: 'BONUS', color: '#ffffff', grad: 'slice-dark' },
                { label: 'Rs 20', type: 'CASH', color: '#b4f02a', grad: 'slice-accent' },
                { label: 'Rs 50', type: 'BOOST', color: '#58d68d', grad: 'slice-dark' },
                { label: 'Rs 100', type: 'CASH', color: '#b4f02a', grad: 'slice-accent' },
                { label: 'Rs 500', type: 'HOT', color: '#ff9800', grad: 'slice-dark' },
                { label: 'Rs 1,000', type: 'MEGA', color: '#ffd700', grad: 'slice-dark' },
                { label: '🏆 JACKPOT', type: '50,000', color: '#ffd700', grad: 'slice-jackpot' },
              ].map((sector, i) => {
                const angle = i * 45;
                // Calculate wedge path from center (150,150)
                const startAngle = (angle - 22.5) * (Math.PI / 180);
                const endAngle = (angle + 22.5) * (Math.PI / 180);
                const r = 148;
                const x1 = 150 + r * Math.sin(startAngle);
                const y1 = 150 - r * Math.cos(startAngle);
                const x2 = 150 + r * Math.sin(endAngle);
                const y2 = 150 - r * Math.cos(endAngle);

                return (
                  <g key={i}>
                    {/* Wedge Path */}
                    <path
                      d={`M150,150 L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
                      fill={`url(#${sector.grad})`}
                      stroke="#222530"
                      strokeWidth="1.5"
                    />

                    {/* Sector Text (rotated into wedge) */}
                    <g transform={`rotate(${angle} 150 150)`}>
                      <text
                        x="150"
                        y="48"
                        textAnchor="middle"
                        fill={sector.color}
                        fontSize={i === 7 ? '11' : '13'}
                        fontWeight="900"
                        letterSpacing="0.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                      >
                        {sector.label}
                      </text>
                      <text
                        x="150"
                        y="63"
                        textAnchor="middle"
                        fill="#8c92a4"
                        fontSize="9"
                        fontWeight="700"
                        letterSpacing="1"
                      >
                        {sector.type}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Central SPIN Hub Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              aria-label="Spin the wheel"
              className="pointer-events-auto relative w-20 h-20 rounded-full bg-[#14161f] border-4 border-[#b4f02a] shadow-[0_0_24px_rgba(180,240,42,0.6)] flex flex-col items-center justify-center text-white hover:scale-105 active:scale-95 transition-all cursor-pointer group disabled:opacity-75"
              type="button"
            >
              {/* Inner ambient glow */}
              <div className="absolute inset-1 rounded-full bg-[#b4f02a]/10 pointer-events-none"></div>

              {/* Small icon asset in hub */}
              <img
                src={ASSETS.luckySpinCoin}
                alt="Spin icon"
                className="w-7 h-7 object-contain drop-shadow-md group-hover:rotate-12 transition-transform"
              />
              <span className="text-[11px] font-black tracking-wider text-[#b4f02a] uppercase mt-0.5">
                {isSpinning ? '...' : 'SPIN'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* STATUS CARD: Free Spin / Countdown */}
      <div className="px-5 mt-2">
        <div className="rounded-[28px] p-5 bg-[#12141a] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base">{hasFreeSpin ? '⚡' : '🔒'}</span>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                {hasFreeSpin ? 'FREE SPIN READY TO CLAIM' : 'FREE SPIN CLAIMED TODAY'}
              </h3>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                hasFreeSpin
                  ? 'bg-[#b4f02a]/15 text-[#b4f02a] border-[#b4f02a]/30'
                  : 'bg-white/10 text-gray-400 border-white/10'
              }`}
            >
              {hasFreeSpin ? '1 AVAILABLE' : '1/1 CLAIMED'}
            </span>
          </div>

          {/* Countdown Clock */}
          <div className="my-4 text-center">
            <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
              NEXT FREE SPIN UNLOCKS IN
            </span>
            <div className="flex items-center justify-center space-x-2.5 mt-2.5">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0c0d12] border border-white/10 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-[#b4f02a] tracking-tight">{hrs}</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">HRS</span>
              </div>
              <span className="text-xl font-bold text-gray-500 -mt-3">:</span>
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0c0d12] border border-white/10 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-[#b4f02a] tracking-tight">{min}</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">MIN</span>
              </div>
              <span className="text-xl font-bold text-gray-500 -mt-3">:</span>
              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0c0d12] border border-white/10 flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-[#b4f02a] tracking-tight">{sec}</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">SEC</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-300">
            Need more spins? Deposit{' '}
            <strong className="text-white font-bold">Rs 500+</strong> to unlock{' '}
            <strong className="text-[#b4f02a] font-bold">3x Instant VIP Spins</strong>!
          </div>

          {/* Action button */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full py-3.5 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(180,240,42,0.4)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>⚡</span>
              <span>{hasFreeSpin ? 'Spin Free Now ->' : 'Unlock Instant VIP Spins ->'}</span>
            </button>

            {/* Test toggle shortcut for developer/user inspection */}
            <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-gray-500">
              <span>VIP Extra Spins: {vipSpins}</span>
              <button
                onClick={() => setHasFreeSpin(true)}
                className="text-[#b4f02a] hover:underline cursor-pointer"
              >
                + Reset Free Spin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SPIN REWARDS TIER */}
      <section className="px-5 mt-6" data-purpose="spin-tiers">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1.5">
            <span className="text-sm">🎁</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">SPIN REWARDS TIER</h3>
          </div>
          <span className="text-[10px] font-bold text-[#b4f02a] bg-[#b4f02a]/10 border border-[#b4f02a]/20 px-2 py-0.5 rounded-full">
            100% Provably Fair
          </span>
        </div>

        {/* Top Jackpot Card */}
        <div className="rounded-2xl p-4 bg-[#14161f] border border-[#ffd700]/30 shadow-lg flex items-center justify-between relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center space-x-3.5 z-10">
            <div className="w-12 h-12 rounded-xl bg-[#221a10] border border-yellow-500/30 flex items-center justify-center p-1.5 flex-shrink-0">
              <img src={ASSETS.trophySecondary} alt="Jackpot Trophy" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-black text-yellow-400 uppercase tracking-wide">
                  MEGA JACKPOT
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  HOT
                </span>
              </div>
              <h4 className="text-lg font-black text-white tracking-tight leading-tight mt-0.5">
                Rs 50,000.00
              </h4>
              <p className="text-[10px] text-gray-400 mt-0.5">Instant withdrawal to Bank / Wallet</p>
            </div>
          </div>

          <div className="text-right z-10">
            <span className="text-[10px] font-bold text-gray-400 block">1 IN 250</span>
            <span className="text-xs font-extrabold text-yellow-400">Top Tier</span>
          </div>
        </div>
      </section>

      {/* LIVE WINNER FEED */}
      <section className="px-5 mt-5" data-purpose="live-winner-feed">
        <div className="rounded-2xl p-3.5 bg-[#12141a] border border-white/10 shadow-md">
          <div className="flex items-center space-x-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#b4f02a] animate-pulse"></span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              LIVE WINNER FEED
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-200 overflow-hidden text-ellipsis whitespace-nowrap">
            <span>{LIVE_WINNERS[activeWinnerIndex].badge}</span>
            <span className="font-medium">
              User <strong className="text-white font-bold">{LIVE_WINNERS[activeWinnerIndex].user}</strong> won{' '}
              <strong className="text-[#b4f02a] font-black">{LIVE_WINNERS[activeWinnerIndex].amount}</strong>{' '}
              <span className="text-gray-400 text-[11px] font-normal">
                {LIVE_WINNERS[activeWinnerIndex].time}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* WON PRIZE CELEBRATION MODAL */}
      {wonPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141622] border-2 border-[#b4f02a] p-6 text-center shadow-[0_0_50px_rgba(180,240,42,0.4)] relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#b4f02a]/20 border border-[#b4f02a] flex items-center justify-center mb-3">
              <img src={ASSETS.bottomCoin} alt="Prize" className="w-12 h-12 object-contain animate-bounce" />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#b4f02a] text-black font-black text-[10px] uppercase tracking-wider mb-2">
              WINNER!
            </span>

            <h3 className="text-2xl font-black text-white tracking-tight">
              Congratulations!
            </h3>
            <p className="text-xs text-gray-300 mt-1">You just unlocked</p>

            <div className="my-3 py-3 rounded-2xl bg-[#0c0d12] border border-white/10">
              <span className="text-3xl font-black text-[#b4f02a] tracking-tight">
                {wonPrize.label}
              </span>
              <span className="text-xs font-bold text-gray-400 block uppercase mt-0.5">
                {wonPrize.typeText} PRIZE
              </span>
            </div>

            <button
              onClick={handleClaimPrize}
              className="w-full py-3.5 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Collect &amp; Add to Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
