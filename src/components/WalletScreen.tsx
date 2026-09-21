import React, { useState } from 'react';
import { ASSETS, PAYMENT_GATEWAYS } from '../data/constants';
import { PaymentGateway, TransactionRecord } from '../types';

interface WalletScreenProps {
  balance: number;
  transactions: TransactionRecord[];
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onSelectGateway: (gateway: PaymentGateway) => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  balance,
  transactions,
  onOpenDeposit,
  onOpenWithdraw,
  onSelectGateway,
}) => {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'yield' | 'spin_win'>('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  return (
    <div className="flex flex-col pb-28 select-none">
      {/* Total Balance Card */}
      <div className="px-5 pt-3">
        <div className="rounded-[28px] p-6 bg-gradient-to-br from-[#181a24] via-[#12141c] to-[#0c0d12] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#b4f02a]/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Vault Balance
            </span>
            <span className="text-[10px] font-bold text-[#b4f02a] bg-[#b4f02a]/10 border border-[#b4f02a]/20 px-2 py-0.5 rounded-full">
              Live Verified
            </span>
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <img src={ASSETS.coin} alt="Coin" className="w-8 h-8 object-contain drop-shadow-md" />
            <h2 className="text-3xl font-black text-white tracking-tight">
              Rs {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={onOpenDeposit}
              type="button"
              className="py-3 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(180,240,42,0.3)] active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>+ Deposit Funds</span>
            </button>
            <button
              onClick={onOpenWithdraw}
              type="button"
              className="py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>↑ Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods Quick Tap */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Payment Methods</h3>
          <span className="text-[11px] text-[#b4f02a]">0% Deposit Fee</span>
        </div>
        <div className="flex space-x-2.5 overflow-x-auto pb-1">
          {PAYMENT_GATEWAYS.map((gw) => (
            <button
              key={gw.id}
              onClick={() => onSelectGateway(gw)}
              type="button"
              className="flex-shrink-0 flex items-center space-x-2 p-2 px-3 rounded-xl bg-[#141620] border border-white/10 hover:border-[#b4f02a]/50 transition cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-white p-0.5 flex items-center justify-center overflow-hidden">
                <img src={gw.icon} alt={gw.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-semibold text-gray-200">{gw.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Transaction Activity
          </h3>
          <span className="text-xs text-gray-400">{filteredTransactions.length} records</span>
        </div>

        {/* Filter chips */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 mb-2">
          {(['all', 'deposit', 'withdraw', 'yield', 'spin_win'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              type="button"
              className={`px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider transition cursor-pointer ${
                filter === f
                  ? 'bg-white text-black'
                  : 'bg-[#141620] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {f === 'spin_win' ? 'Spin Wins' : f}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-2.5">
          {filteredTransactions.map((tx) => {
            const isCredit = tx.amount > 0;
            return (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-[#12141a] border border-white/5 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      tx.type === 'deposit'
                        ? 'bg-blue-500/20 text-blue-400'
                        : tx.type === 'withdraw'
                        ? 'bg-orange-500/20 text-orange-400'
                        : tx.type === 'yield'
                        ? 'bg-[#b4f02a]/20 text-[#b4f02a]'
                        : tx.type === 'spin_win'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    {tx.type === 'deposit'
                      ? '↓'
                      : tx.type === 'withdraw'
                      ? '↑'
                      : tx.type === 'yield'
                      ? '⚡'
                      : tx.type === 'spin_win'
                      ? '🎁'
                      : '💼'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">{tx.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {tx.date} • {tx.gateway || 'Automated Pool'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-black block ${
                      isCredit ? 'text-[#b4f02a]' : 'text-gray-300'
                    }`}
                  >
                    {isCredit ? '+' : ''}Rs {Math.abs(tx.amount).toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
