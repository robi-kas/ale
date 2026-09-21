import React, { useState } from 'react';
import { ActionHeader } from './components/TopBar';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeScreen } from './components/HomeScreen';
import { LuckySpinScreen } from './components/LuckySpinScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PackagesScreen } from './components/PackagesScreen';
import { WalletScreen } from './components/WalletScreen';
import { AuthScreens } from './components/AuthScreens';
import { Modals } from './components/Modals';
import { INITIAL_USER } from './data/constants';
import { AuthMode, InvestmentPlan, PaymentGateway, TabType, TransactionRecord, UserProfile } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  // Active investments count
  const [activePlansCount, setActivePlansCount] = useState<number>(2);

  // Transactions list
  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'tx-1',
      title: 'Daily Yield - Gold Bear',
      amount: 195,
      type: 'yield',
      date: 'Today, 04:30 AM',
      status: 'completed',
    },
    {
      id: 'tx-2',
      title: 'Lucky Spin Winner',
      amount: 500,
      type: 'spin_win',
      date: 'Yesterday',
      status: 'completed',
    },
    {
      id: 'tx-3',
      title: 'SadaPay Direct Deposit',
      amount: 7500,
      type: 'deposit',
      gateway: 'SadaPay',
      date: 'Sep 18, 2026',
      status: 'completed',
    },
    {
      id: 'tx-4',
      title: 'Gold Bear Contract',
      amount: -7500,
      type: 'investment',
      date: 'Sep 18, 2026',
      status: 'completed',
    },
    {
      id: 'tx-5',
      title: 'Fast Cashout to Easypaisa',
      amount: -2500,
      type: 'withdraw',
      gateway: 'Easypaisa',
      date: 'Sep 15, 2026',
      status: 'completed',
    },
  ]);

  // Modals state
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Handlers
  const handleAddWinnings = (amount: number, label: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    setTransactions((prev) => [
      {
        id: `tx-spin-${Date.now()}`,
        title: `Lucky Spin Prize (${label})`,
        amount: amount,
        type: 'spin_win',
        date: 'Just now',
        status: 'completed',
      },
      ...prev,
    ]);
  };

  const handleConfirmInvest = (plan: InvestmentPlan) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - plan.price,
    }));
    setActivePlansCount((prev) => prev + 1);
    setTransactions((prev) => [
      {
        id: `tx-plan-${Date.now()}`,
        title: `${plan.name} Investment Activated`,
        amount: -plan.price,
        type: 'investment',
        date: 'Just now',
        status: 'completed',
      },
      ...prev,
    ]);
    setSelectedPlan(null);
  };

  const handleConfirmDeposit = (amount: number, gateway: PaymentGateway) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    setTransactions((prev) => [
      {
        id: `tx-dep-${Date.now()}`,
        title: `${gateway.name} Deposit`,
        amount: amount,
        type: 'deposit',
        gateway: gateway.name,
        date: 'Just now',
        status: 'completed',
      },
      ...prev,
    ]);
    setIsDepositOpen(false);
    setSelectedGateway(null);
  };

  const handleConfirmWithdraw = (amount: number, accountTitle: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - amount,
    }));
    setTransactions((prev) => [
      {
        id: `tx-wth-${Date.now()}`,
        title: `Fast Cashout (${accountTitle})`,
        amount: -amount,
        type: 'withdraw',
        gateway: 'Raast Fast Payout',
        date: 'Just now',
        status: 'processing',
      },
      ...prev,
    ]);
    setIsWithdrawOpen(false);
  };

  const handleClaimTask = (reward: number, taskName: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + reward,
    }));
    setTransactions((prev) => [
      {
        id: `tx-task-${Date.now()}`,
        title: `Task Bonus: ${taskName}`,
        amount: reward,
        type: 'yield',
        date: 'Just now',
        status: 'completed',
      },
      ...prev,
    ]);
  };

  return (
    <div className="bg-[#050607] flex justify-center items-center min-h-screen text-white font-sans antialiased p-0 sm:p-4 selection:bg-[#b4f02a] selection:text-black">
      {/* Phone Shell Container */}
      <main className="w-full max-w-[420px] bg-[#0c0d10] min-h-screen sm:min-h-[915px] sm:max-h-[920px] sm:rounded-[48px] sm:border-[8px] sm:border-[#21232c] relative overflow-y-auto overflow-x-hidden flex flex-col shadow-2xl select-none pb-4">
        {/* iOS Styled Top Status Bar in Phone Shell */}
        <div className="pt-3 px-7 flex items-center justify-between text-[11px] font-semibold text-gray-300 pointer-events-none select-none z-30">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5 text-xs">
            {/* Signal */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 18.25A10.957 10.957 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10c0 2.32-.78 4.46-2.1 6.18l-.62-.62A8.96 8.96 0 0 0 21 12c0-4.97-4.03-9-9-9z"></path>
              <circle cx="12" cy="12" r="2.5"></circle>
            </svg>
            {/* Wifi */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 2.5c3.87 0 7.37 1.5 9.99 3.96L12 18.5 2.01 10.46A14.39 14.39 0 0 1 12 6.5z"></path>
            </svg>
            {/* Battery */}
            <div className="w-5 h-2.5 rounded-sm border border-gray-300 p-0.5 flex items-center">
              <div className="w-full h-full bg-[#b4f02a] rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Top Action Header Row */}
        <ActionHeader
          currentTab={currentTab}
          balance={user.balance}
          onOpenDeposit={() => setIsDepositOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto">
          {currentTab === 'home' && (
            <HomeScreen
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onSelectPlan={(plan) => setSelectedPlan(plan)}
              onSelectGateway={(gw) => setSelectedGateway(gw)}
            />
          )}

          {currentTab === 'spin' && (
            <LuckySpinScreen
              balance={user.balance}
              onAddWinnings={handleAddWinnings}
              onOpenDeposit={() => setIsDepositOpen(true)}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              user={user}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenTasks={() => setIsTasksOpen(true)}
              onOpenFriends={() => setIsFriendsOpen(true)}
            />
          )}

          {currentTab === 'packages' && (
            <PackagesScreen
              balance={user.balance}
              onSelectPlan={(plan) => setSelectedPlan(plan)}
              activePlansCount={activePlansCount}
            />
          )}

          {currentTab === 'wallet' && (
            <WalletScreen
              balance={user.balance}
              transactions={transactions}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenWithdraw={() => setIsWithdrawOpen(true)}
              onSelectGateway={(gw) => setSelectedGateway(gw)}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
        />

        {/* Modals & Dialogs (Invest, Deposit, Withdraw, Tasks, Friends, Settings, Notifications) */}
        <Modals
          selectedPlan={selectedPlan}
          onClosePlanModal={() => setSelectedPlan(null)}
          onConfirmInvest={handleConfirmInvest}
          selectedGateway={selectedGateway}
          onCloseGatewayModal={() => setSelectedGateway(null)}
          onConfirmDeposit={handleConfirmDeposit}
          isDepositOpen={isDepositOpen}
          onCloseDeposit={() => setIsDepositOpen(false)}
          isWithdrawOpen={isWithdrawOpen}
          onCloseWithdraw={() => setIsWithdrawOpen(false)}
          onConfirmWithdraw={handleConfirmWithdraw}
          isTasksOpen={isTasksOpen}
          onCloseTasks={() => setIsTasksOpen(false)}
          onClaimTask={handleClaimTask}
          isFriendsOpen={isFriendsOpen}
          onCloseFriends={() => setIsFriendsOpen(false)}
          isSettingsOpen={isSettingsOpen}
          onCloseSettings={() => setIsSettingsOpen(false)}
          onOpenAuth={(mode) => setAuthMode(mode)}
          isNotificationsOpen={isNotificationsOpen}
          onCloseNotifications={() => setIsNotificationsOpen(false)}
          user={user}
        />

        {/* Auth Screens (Login & Sign Up from Image 14) */}
        {authMode && (
          <AuthScreens
            mode={authMode}
            onClose={() => setAuthMode(null)}
            onSwitchMode={(mode) => setAuthMode(mode)}
            onAuthenticate={(updated) => {
              setUser((prev) => ({ ...prev, ...updated }));
            }}
          />
        )}
      </main>
    </div>
  );
}
