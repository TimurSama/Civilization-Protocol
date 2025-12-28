"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const { login, register, loginWithWallet } = useAuth();
  const { address, connect, isConnected } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (result.success) {
          setSuccess('Добро пожаловать!');
          setTimeout(() => onClose(), 1000);
        } else {
          setError(result.error || 'Ошибка входа');
        }
      } else {
        if (!name.trim()) {
          setError('Введите имя');
          setLoading(false);
          return;
        }
        const result = await register({ email, password, name, referralCode: referralCode || undefined });
        if (result.success) {
          setSuccess('Регистрация успешна! Добро пожаловать в VODeco!');
          setTimeout(() => onClose(), 1500);
        } else {
          setError(result.error || 'Ошибка регистрации');
        }
      }
    } catch (err) {
      setError('Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    setError('');
    setLoading(true);

    try {
      if (!isConnected) {
        await connect();
      }
      
      if (address) {
        const result = await loginWithWallet(address);
        if (result.success) {
          setSuccess('Вход через кошелёк выполнен!');
          setTimeout(() => onClose(), 1000);
        } else {
          setError(result.error || 'Ошибка входа');
        }
      }
    } catch (err) {
      setError('Ошибка подключения кошелька');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setReferralCode('');
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-gradient-to-br from-ocean-medium to-ocean-deep rounded-2xl border border-ocean-light/30 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 pb-4 bg-gradient-to-r from-water-400/20 to-water-600/20">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-water-400 to-water-600 flex items-center justify-center">
                  <span className="text-2xl">💧</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">VODeco</h2>
                  <p className="text-sm text-white/60">
                    {mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                  </p>
                </div>
              </div>

              {/* Mode Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === 'login'
                      ? 'bg-water-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Вход
                </button>
                <button
                  onClick={() => switchMode('register')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === 'register'
                      ? 'bg-water-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Регистрация
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Wallet Login */}
              <button
                type="button"
                onClick={handleWalletLogin}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:border-blue-400/50 transition-all flex items-center justify-center gap-3 group"
              >
                <span className="text-xl">🔗</span>
                <span className="font-medium">
                  {isConnected ? `Войти как ${address?.slice(0, 8)}...` : 'Подключить кошелёк'}
                </span>
              </button>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-sm text-white/40">или</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-water-400/50 outline-none transition-all placeholder:text-white/30"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-water-400/50 outline-none transition-all placeholder:text-white/30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-water-400/50 outline-none transition-all placeholder:text-white/30"
                  required
                  minLength={6}
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-sm text-white/60 mb-1.5">Реферальный код (необязательно)</label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="XXXXXXXX"
                    maxLength={8}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-water-400/50 outline-none transition-all placeholder:text-white/30 uppercase"
                  />
                  <p className="mt-1 text-xs text-water-400">+50 VOD бонус за реферала!</p>
                </div>
              )}

              {/* Errors/Success */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-water-500 to-water-600 hover:from-water-400 hover:to-water-500 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Загрузка...</span>
                  </>
                ) : (
                  <span>{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</span>
                )}
              </button>

              {/* Pioneer Badge */}
              {mode === 'register' && (
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-center">
                  <span className="text-yellow-400 text-sm">
                    🏆 Станьте Pioneer! Первые 1000 пользователей получают x2 бонус!
                  </span>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



