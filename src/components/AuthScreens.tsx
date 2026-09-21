import React, { useState } from 'react';
import { ASSETS } from '../data/constants';
import { AuthMode, UserProfile } from '../types';

interface AuthScreensProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthenticate: (updatedUser: Partial<UserProfile>) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onAuthenticate,
}) => {
  const [email, setEmail] = useState('trader@bears4profit.com');
  const [password, setPassword] = useState('secret12345');
  const [fullName, setFullName] = useState('Mr. Bobrovsky');
  const [phone, setPhone] = useState('300 1234567');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [referralCode, setReferralCode] = useState('BEAR777');

  if (!mode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      onAuthenticate({
        email,
        name: fullName || 'Mr.Bobrovsky',
        isLoggedIn: true,
      });
    } else {
      onAuthenticate({
        name: fullName || 'New Trader',
        email,
        phone: `+92 ${phone}`,
        referralCode,
        isLoggedIn: true,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050607] flex justify-center items-center overflow-y-auto">
      <main className="w-full max-w-[420px] bg-[#0c0d10] min-h-screen sm:min-h-[915px] sm:max-h-[920px] sm:rounded-[48px] sm:border-[8px] sm:border-[#21232c] relative overflow-y-auto overflow-x-hidden flex flex-col justify-between shadow-2xl p-6 select-none">
        <div>
          {/* Top Status & Header Row */}
          <div className="flex items-center justify-between pt-2 mb-6">
            {/* Back Button */}
            <button
              onClick={onClose}
              aria-label="Back"
              className="w-10 h-10 rounded-full bg-[#161822] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#b4f02a]/40 transition active:scale-95 cursor-pointer"
              type="button"
            >
              <svg className="w-4 h-4 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
                <path d="M19 12H5m0 0l7 7m-7-7l7-7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            {/* Brand Logo Pill Badge */}
            <div className="flex items-center space-x-2 bg-[#141620] border border-white/10 py-1.5 px-3 rounded-full shadow-sm">
              <div className="w-5 h-5 flex items-center justify-center">
                <img src={ASSETS.bottomCoin} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-black tracking-tight text-white">
                BEARS<span className="text-[#b4f02a]">4</span>PROFIT
              </span>
            </div>
          </div>

          {/* SCREEN: LOGIN MODE */}
          {mode === 'login' ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
                  Welcome Back, Trader!
                </h1>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Access your yield vault and optimize your algorithmic trading pipeline.
                </p>
              </div>

              {/* Email Address */}
              <div className="pt-2">
                <label className="text-xs font-medium text-gray-400 block mb-1.5">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="trader@bears4profit.com"
                    className="w-full bg-[#141620] border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#b4f02a] transition placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-medium text-gray-400 block mb-1.5">Password</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••"
                    className="w-full bg-[#141620] border border-white/10 rounded-2xl py-3.5 pl-10 pr-11 text-sm text-white focus:outline-none focus:border-[#b4f02a] transition placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#141620] border-white/20 text-[#b4f02a] focus:ring-0 accent-[#b4f02a]"
                  />
                  <span>Remember Me.</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions sent to your email!')}
                  className="text-[#b4f02a] hover:underline font-medium cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(180,240,42,0.4)] active:scale-95 flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>Log In</span>
                <svg className="w-4 h-4 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>

              {/* OR Divider */}
              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-500 uppercase">or</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('trader.google@bears4profit.com');
                    onAuthenticate({ email: 'trader.google@bears4profit.com', isLoggedIn: true });
                    onClose();
                  }}
                  className="w-14 h-14 rounded-full bg-[#141620] border border-white/15 flex items-center justify-center hover:border-[#b4f02a]/50 hover:scale-105 transition cursor-pointer"
                >
                  {/* Google G */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('trader.apple@bears4profit.com');
                    onAuthenticate({ email: 'trader.apple@bears4profit.com', isLoggedIn: true });
                    onClose();
                  }}
                  className="w-14 h-14 rounded-full bg-[#141620] border border-white/15 flex items-center justify-center hover:border-[#b4f02a]/50 hover:scale-105 transition cursor-pointer text-white"
                >
                  {/* Apple logo */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.71-11.65-14-5.87-9.01-10.43-19.11-13.68-30.3-3.26-11.19-4.89-21.96-4.89-32.32 0-14.78 3.73-26.79 11.2-36.03 7.47-9.24 16.71-13.98 27.72-14.23 4.58 0 9.71 1.25 15.39 3.75 5.68 2.5 9.4 3.79 11.15 3.86 1.54 0 5.49-1.39 11.87-4.17 6.38-2.77 12-4.04 16.86-3.8 12.51.62 22.39 5.48 29.62 14.59-10.99 6.64-16.38 15.7-16.17 27.18.22 8.93 3.65 16.48 10.3 22.64 6.65 6.16 14.52 9.77 23.6 10.84-2.18 6.53-4.69 13.06-7.53 19.59zM119.22 33.15c0-7.07 2.58-13.84 7.74-20.31 5.16-6.47 11.66-10.94 19.5-13.41-.33 1.96-.86 4.15-1.59 6.57-.73 2.42-1.96 4.88-3.69 7.38-3.26 4.67-7.29 8.28-12.09 10.82-4.8 2.54-9.02 3.82-12.67 3.85-.43-1.63-.65-3.26-.65-4.9z" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            /* SCREEN: SIGN UP MODE */
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight leading-tight flex items-center gap-2">
                  <span>Create Account</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b4f02a] inline-block"></span>
                </h1>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  Join Bears4Profit &amp; start claiming daily automated yields.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Full Name"
                    className="w-full bg-[#141620] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#b4f02a] transition placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Phone Input with PK +92 */}
              <div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center space-x-1.5 text-xs font-bold text-gray-300 pr-2 border-r border-white/15">
                    <span>PK</span>
                    <span className="text-[#b4f02a]">+92</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="300 1234567"
                    className="w-full bg-[#141620] border border-white/10 rounded-2xl py-3 pl-20 pr-4 text-sm text-white focus:outline-none focus:border-[#b4f02a] transition placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    className="w-full bg-[#141620] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#b4f02a] transition placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Create Password */}
              <div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-gray-400">
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create Password"
                    className="w-full bg-[#141620] border border-white/10 rounded-2xl py-3 pl-10 pr-11 text-sm text-white focus:outline-none focus:border-[#b4f02a] transition placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                {/* Password strength indicators */}
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <span className="text-[10.5px] text-gray-400">Password Strength</span>
                  <div className="flex items-center space-x-1">
                    <span className="w-5 h-1 rounded-full bg-[#b4f02a]"></span>
                    <span className="w-5 h-1 rounded-full bg-[#b4f02a]"></span>
                    <span className="w-5 h-1 rounded-full bg-gray-700"></span>
                  </div>
                </div>
              </div>

              {/* Promo Code Badge Card */}
              <div className="bg-[#141620] border border-white/10 rounded-2xl py-2.5 px-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#b4f02a]">
                  <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                  </svg>
                  <span className="font-black text-sm tracking-wider">{referralCode}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                  APPLIED
                </span>
              </div>

              {/* Agreement Checkbox */}
              <label className="flex items-start space-x-2.5 text-xs text-gray-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded bg-[#141620] border-white/20 text-[#b4f02a] focus:ring-0 accent-[#b4f02a]"
                />
                <span className="leading-snug">
                  I agree to the <strong className="text-white underline">Terms of Service</strong> and
                  acknowledge the <strong className="text-white underline">Risk Disclosure policy</strong>
                  .
                </span>
              </label>

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#b4f02a] hover:bg-[#9ae600] text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(180,240,42,0.4)] active:scale-95 flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <span>Create Account</span>
                <svg className="w-4 h-4 stroke-black stroke-[3] fill-none" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>

              {/* OR SIGN UP WITH Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-[#0c0d10] px-2">
                  OR SIGN UP WITH
                </span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    onAuthenticate({ email: 'newtrader.google@bears4profit.com', isLoggedIn: true });
                    onClose();
                  }}
                  className="w-12 h-12 rounded-full bg-[#141620] border border-white/15 flex items-center justify-center hover:border-[#b4f02a]/50 hover:scale-105 transition cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAuthenticate({ email: 'newtrader.apple@bears4profit.com', isLoggedIn: true });
                    onClose();
                  }}
                  className="w-12 h-12 rounded-full bg-[#141620] border border-white/15 flex items-center justify-center hover:border-[#b4f02a]/50 hover:scale-105 transition cursor-pointer text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.71-11.65-14-5.87-9.01-10.43-19.11-13.68-30.3-3.26-11.19-4.89-21.96-4.89-32.32 0-14.78 3.73-26.79 11.2-36.03 7.47-9.24 16.71-13.98 27.72-14.23 4.58 0 9.71 1.25 15.39 3.75 5.68 2.5 9.4 3.79 11.15 3.86 1.54 0 5.49-1.39 11.87-4.17 6.38-2.77 12-4.04 16.86-3.8 12.51.62 22.39 5.48 29.62 14.59-10.99 6.64-16.38 15.7-16.17 27.18.22 8.93 3.65 16.48 10.3 22.64 6.65 6.16 14.52 9.77 23.6 10.84-2.18 6.53-4.69 13.06-7.53 19.59zM119.22 33.15c0-7.07 2.58-13.84 7.74-20.31 5.16-6.47 11.66-10.94 19.5-13.41-.33 1.96-.86 4.15-1.59 6.57-.73 2.42-1.96 4.88-3.69 7.38-3.26 4.67-7.29 8.28-12.09 10.82-4.8 2.54-9.02 3.82-12.67 3.85-.43-1.63-.65-3.26-.65-4.9z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Switch Mode Link */}
        <div className="text-center pt-4 pb-2">
          {mode === 'login' ? (
            <p className="text-xs text-gray-400">
              Don't have an Account yet?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('signup')}
                className="text-[#b4f02a] font-bold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className="text-[#b4f02a] font-bold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
