export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  phone: string;
  avatar: string;
  balance: number;
  winLoseRate: number;
  level: number;
  totalDays: number;
  streakDays: number;
  freeSpinAvailable: boolean;
  nextFreeSpinSeconds: number;
  friendsOnline: number;
  referralCode: string;
  isLoggedIn: boolean;
}

export type TabType = 'home' | 'wallet' | 'spin' | 'packages' | 'profile';

export type AuthMode = 'login' | 'signup' | null;

export interface InvestmentPlan {
  id: string;
  name: string;
  tierLabel: string;
  tierBadgeColor?: string;
  price: number;
  durationDays: number;
  dailyProfit: number;
  totalProfit: number;
  roiPercentage: number;
  isEnterprise?: boolean;
  features: string[];
}

export interface SpinPrize {
  id: number;
  label: string;
  typeText: string;
  amount: number;
  isJackpot?: boolean;
  isHot?: boolean;
  isMega?: boolean;
  bgGradient: string;
  accentColor: string;
}

export interface TransactionRecord {
  id: string;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw' | 'yield' | 'spin_win' | 'investment';
  gateway?: string;
  date: string;
  status: 'completed' | 'processing' | 'approved';
}

export interface PaymentGateway {
  id: string;
  name: string;
  badge: string;
  icon: string;
  accountTitle: string;
  accountNumber: string;
  isInstant: boolean;
  minDeposit: number;
  maxDeposit: number;
}
