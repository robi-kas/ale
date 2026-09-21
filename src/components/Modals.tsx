import React, { useState } from 'react';
import { PAYMENT_GATEWAYS } from '../data/constants';
import { InvestmentPlan, PaymentGateway, UserProfile } from '../types';

interface ModalsProps {
  selectedPlan: InvestmentPlan | null;
  onClosePlanModal: () => void;
  onConfirmInvest: (plan: InvestmentPlan) => void;

  selectedGateway: PaymentGateway | null;
  onCloseGatewayModal: () => void;
  onConfirmDeposit: (amount: number, gateway: PaymentGateway) => void;

  isDepositOpen: boolean;
  onCloseDeposit: () => void;

  isWithdrawOpen: boolean;
  onCloseWithdraw: () => void;
  onConfirmWithdraw: (amount: number, accountTitle: string, accountNumber: string) => void;

  isTasksOpen: boolean;
  onCloseTasks: () => void;
  onClaimTask: (reward: number, taskName: string) => void;

  isFriendsOpen: boolean;
  onCloseFriends: () => void;

  isSettingsOpen: boolean;
  onCloseSettings: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;

  isNotificationsOpen: boolean;
  onCloseNotifications: () => void;

  user: UserProfile;
}

export const Modals: React.FC<ModalsProps> = ({
  selectedPlan,
  onClosePlanModal,
  onConfirmInvest,

  selectedGateway,
  onCloseGatewayModal,
  onConfirmDeposit,

  isDepositOpen,
  onCloseDeposit,

  isWithdrawOpen,
  onCloseWithdraw,
  onConfirmWithdraw,

  isTasksOpen,
  onCloseTasks,
  onClaimTask,

  isFriendsOpen,
  onCloseFriends,

  isSettingsOpen,
  onCloseSettings,
  onOpenAuth,

  isNotificationsOpen,
  onCloseNotifications,

  user,
}) => {
  // Deposit state
  const [depositAmount, setDepositAmount] = useState<number>(1500);
  const [activeGateway, setActiveGateway] = useState<PaymentGateway>(
    selectedGateway || PAYMENT_GATEWAYS[0]
  );
  const [trxId, setTrxId] = useState<string>('TX984124');

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [withdrawAccountTitle, setWithdrawAccountTitle] = useState<string>('Mr. Bobrovsky');
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState<string>('03001234567');

  // Task list
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Join Official Bears Telegram', reward: 50, completed: false },
    { id: 2, title: 'Complete Daily Login Streak', reward: 25, completed: true },
    { id: 3, title: 'Spin the Lucky Wheel 1 time', reward: 50, completed: false },
    { id: 4, title: 'Activate your first Bear plan', reward: 150, completed: false },
  ]);

  return (
    <>
      {/* 1. INVESTMENT CONFIRMATION MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border-2 border-[#b4f02a] p-6 shadow-2xl relative">
            <button
              onClick={onClosePlanModal}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#b4f02a]/15 text-[#b4f02a] text-[10px] font-bold uppercase tracking-wider mb-2">
              {selectedPlan.tierLabel}
            </span>

            <h3 className="text-xl font-black text-white tracking-tight">{selectedPlan.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Confirm contract activation for {selectedPlan.durationDays} days.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-[#0c0d12] border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span className="text-white font-bold">Rs {selectedPlan.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Profit:</span>
                <span className="text-[#b4f02a] font-bold">+Rs {selectedPlan.dailyProfit}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Return:</span>
                <span className="text-[#b4f02a] font-black">
                  Rs {selectedPlan.totalProfit.toLocaleString()} ({selectedPlan.roiPercentage}%)
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5">
                <span className="text-gray-400">Current Balance:</span>
                <span className="text-white font-bold">
                  Rs {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {user.balance < selectedPlan.price ? (
              <div className="text-center">
                <p className="text-xs text-red-400 mb-3 font-medium">
                  Insufficient balance for this tier.
                </p>
                <button
                  onClick={() => {
                    onClosePlanModal();
                    // Open deposit
                  }}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-gray-200 text-black font-extrabold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Deposit Funds First
                </button>
              </div>
            ) : (
              <button
                onClick={() => onConfirmInvest(selectedPlan)}
                className="w-full py-3.5 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(180,240,42,0.4)] active:scale-95 cursor-pointer"
              >
                Confirm &amp; Activate Plan
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. DEPOSIT MODAL / GATEWAY MODAL */}
      {(isDepositOpen || selectedGateway) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border border-white/15 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                onCloseDeposit();
                onCloseGatewayModal();
              }}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-white tracking-tight">Deposit Funds</h3>
            <p className="text-xs text-gray-400 mt-0.5">Instant Direct Gateway Transfer</p>

            {/* Select Gateway */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-400 block mb-1.5">
                Select Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_GATEWAYS.map((gw) => {
                  const isSelected = activeGateway.id === gw.id;
                  return (
                    <button
                      key={gw.id}
                      onClick={() => setActiveGateway(gw)}
                      type="button"
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        isSelected
                          ? 'border-[#b4f02a] bg-[#182214]'
                          : 'border-white/10 bg-[#0c0d12] hover:border-white/20'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden mb-1">
                        <img src={gw.icon} alt={gw.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-200 text-center truncate w-full">
                        {gw.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gateway Transfer Details */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#0c0d12] border border-white/10 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Name:</span>
                <span className="text-white font-bold">{activeGateway.accountTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Number:</span>
                <span className="text-[#b4f02a] font-mono font-bold tracking-wider">
                  {activeGateway.accountNumber}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-1 border-t border-white/5 text-gray-400">
                <span>Fee: 0%</span>
                <span className="text-[#b4f02a] font-semibold">{activeGateway.badge}</span>
              </div>
            </div>

            {/* Quick Amount Chips */}
            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-400 block mb-1.5">
                Deposit Amount (Rs)
              </label>
              <div className="flex space-x-2 mb-2">
                {[500, 1500, 3500, 7500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDepositAmount(amt)}
                    type="button"
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      depositAmount === amt
                        ? 'bg-[#b4f02a] text-black'
                        : 'bg-[#0c0d12] text-gray-300 border border-white/10'
                    }`}
                  >
                    Rs {amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                min="500"
                className="w-full bg-[#0c0d12] border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#b4f02a]"
              />
            </div>

            {/* Transaction ID / Receipt */}
            <div className="mt-3">
              <label className="text-xs font-semibold text-gray-400 block mb-1">
                Transaction Ref / TID
              </label>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="e.g. 198428471"
                className="w-full bg-[#0c0d12] border border-white/10 rounded-2xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#b4f02a]"
              />
            </div>

            <button
              onClick={() => {
                onConfirmDeposit(depositAmount, activeGateway);
                onCloseDeposit();
                onCloseGatewayModal();
              }}
              className="mt-5 w-full py-3.5 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg active:scale-95 cursor-pointer"
            >
              Submit Deposit Confirmation
            </button>
          </div>
        </div>
      )}

      {/* 3. WITHDRAW MODAL */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border border-white/15 p-6 shadow-2xl relative">
            <button
              onClick={onCloseWithdraw}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-white tracking-tight">Withdraw Funds</h3>
            <p className="text-xs text-gray-400 mt-0.5">24/7 Automated Fast Payout</p>

            <div className="my-3 p-3 rounded-2xl bg-[#0c0d12] border border-white/10 flex justify-between items-center text-xs">
              <span className="text-gray-400">Available Balance:</span>
              <span className="text-[#b4f02a] font-bold">
                Rs {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">
                  Withdrawal Amount (Rs)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  max={user.balance}
                  min="500"
                  className="w-full bg-[#0c0d12] border border-white/10 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#b4f02a]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">
                  Account Title
                </label>
                <input
                  type="text"
                  value={withdrawAccountTitle}
                  onChange={(e) => setWithdrawAccountTitle(e.target.value)}
                  className="w-full bg-[#0c0d12] border border-white/10 rounded-2xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#b4f02a]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">
                  Account / Mobile Number
                </label>
                <input
                  type="text"
                  value={withdrawAccountNumber}
                  onChange={(e) => setWithdrawAccountNumber(e.target.value)}
                  className="w-full bg-[#0c0d12] border border-white/10 rounded-2xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#b4f02a]"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (withdrawAmount > user.balance) {
                  alert('Withdrawal amount exceeds available balance!');
                  return;
                }
                onConfirmWithdraw(withdrawAmount, withdrawAccountTitle, withdrawAccountNumber);
                onCloseWithdraw();
              }}
              className="mt-5 w-full py-3.5 rounded-full bg-white hover:bg-[#b4f02a] hover:text-black text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg active:scale-95 cursor-pointer"
            >
              Request Fast Payout
            </button>
          </div>
        </div>
      )}

      {/* 4. TASKS CHECKLIST MODAL */}
      {isTasksOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border border-white/15 p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={onCloseTasks}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#b4f02a]/15 text-[#b4f02a] text-[10px] font-bold uppercase tracking-wider mb-2">
              Daily Missions
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">Complite New Tasks</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Complete missions to earn instant bonuses on your wallet balance.
            </p>

            <div className="space-y-2.5 mt-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-2xl bg-[#0c0d12] border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{task.title}</h4>
                    <span className="text-[10.5px] font-black text-[#b4f02a] mt-0.5 block">
                      +Rs {task.reward}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (!task.completed) {
                        onClaimTask(task.reward, task.title);
                        setTasks((prev) =>
                          prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t))
                        );
                      }
                    }}
                    disabled={task.completed}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                      task.completed
                        ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                        : 'bg-[#b4f02a] hover:bg-[#9ae600] text-black'
                    }`}
                  >
                    {task.completed ? 'Claimed ✓' : 'Claim'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. FRIENDS MODAL */}
      {isFriendsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border border-white/15 p-6 shadow-2xl relative">
            <button
              onClick={onCloseFriends}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-white tracking-tight">Active Friends</h3>
            <p className="text-xs text-[#b4f02a] font-medium mt-0.5">{user.friendsOnline} online now</p>

            <div className="space-y-2 mt-4 max-h-[220px] overflow-y-auto">
              {[
                { name: 'Alex Trader', level: 9, status: 'Spinning Wheel', icon: '🎮' },
                { name: 'CryptoBear', level: 12, status: 'Claimed Rs 195', icon: '👾' },
                { name: 'Zain Gold', level: 7, status: 'Active 35d', icon: '★' },
                { name: 'Farhan_99', level: 11, status: 'Won Rs 500', icon: '⚡' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-[#0c0d12] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-sm">
                      {f.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-white">{f.name}</h4>
                      <span className="text-[10px] text-gray-400">{f.status}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#b4f02a]">Lvl {f.level}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(`https://bears4profit.com/join?ref=${user.referralCode}`);
                alert('Invite link copied to clipboard!');
              }}
              className="mt-4 w-full py-3 rounded-full bg-[#b4f02a] text-black font-bold text-xs uppercase tracking-wider transition hover:bg-[#9ae600] cursor-pointer"
            >
              Invite Friends &amp; Earn 5%
            </button>
          </div>
        </div>
      )}

      {/* 6. SETTINGS & ACCOUNT SWITCHER MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border border-white/15 p-6 shadow-2xl relative">
            <button
              onClick={onCloseSettings}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-white tracking-tight">App Settings</h3>
            <p className="text-xs text-gray-400 mt-0.5">Preferences &amp; Account Control</p>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 rounded-2xl bg-[#0c0d12] border border-white/5 flex items-center justify-between">
                <span>Account Status</span>
                <span className="text-[#b4f02a] font-bold">Verified Trader</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0c0d12] border border-white/5 flex items-center justify-between">
                <span>Sound &amp; Haptics</span>
                <span className="text-white font-semibold">Enabled ✓</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0c0d12] border border-white/5 flex items-center justify-between">
                <span>Instant Cashout Raast</span>
                <span className="text-[#b4f02a] font-semibold">Active (0% Fee)</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  onCloseSettings();
                  onOpenAuth('login');
                }}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Switch Account (Log In Screen)
              </button>
              <button
                onClick={() => {
                  onCloseSettings();
                  onOpenAuth('signup');
                }}
                className="w-full py-3 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-extrabold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Create New Account (Sign Up Screen)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. NOTIFICATIONS MODAL */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-[32px] bg-[#141620] border border-white/15 p-6 shadow-2xl relative">
            <button
              onClick={onCloseNotifications}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-black text-white tracking-tight">Notifications</h3>
            <p className="text-xs text-gray-400 mt-0.5">Live Vault &amp; Spin Alerts</p>

            <div className="space-y-2.5 mt-4 max-h-[300px] overflow-y-auto">
              {[
                {
                  title: 'Daily Free Spin Ready!',
                  time: 'Just now',
                  desc: 'Your 24-hour free lucky spin wheel is available.',
                  badge: '🎁',
                },
                {
                  title: 'Daily Yield Credited',
                  time: '2 hours ago',
                  desc: 'Rs 195 credited from your active Bear investment pool.',
                  badge: '⚡',
                },
                {
                  title: 'Winner Alert',
                  time: '4 hours ago',
                  desc: 'Trader @farhan_99 hit Rs 500 HOT prize on Lucky Spin.',
                  badge: '🔥',
                },
              ].map((n, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#0c0d12] border border-white/5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span>{n.badge}</span>
                      <span>{n.title}</span>
                    </span>
                    <span className="text-[10px] text-gray-500">{n.time}</span>
                  </div>
                  <p className="text-gray-400 text-[11px] mt-1">{n.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onCloseNotifications}
              className="mt-4 w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Mark All Read
            </button>
          </div>
        </div>
      )}
    </>
  );
};
