export interface Wallet {
  id: string;
  name: string;
  balanceUSD: number;
  balanceVES: number;
  gradient: string;
  currency: string;
  bank: string;
}

export interface CreateWalletDTO {
  name: string;
  currency: string;
  bank: string;
}

export interface WalletContextType {
  wallets: Wallet[];
  addWallet: (dto: CreateWalletDTO) => Wallet;
}

export interface Bank {
  id: string;
  name: string;
  country: 'VE' | 'US' | 'INT';
}

export const WALLET_GRADIENTS = [
  'from-emerald-500 to-teal-700',
  'from-blue-500 to-indigo-700',
  'from-violet-500 to-purple-800',
  'from-amber-500 to-orange-700',
  'from-rose-500 to-pink-800',
  'from-cyan-500 to-blue-700',
  'from-fuchsia-500 to-purple-700',
  'from-lime-500 to-green-700',
] as const;

export const BANKS: Bank[] = [
  // Venezuela
  { id: 'banesco', name: 'Banesco', country: 'VE' },
  { id: 'mercantil', name: 'Mercantil', country: 'VE' },
  { id: 'provincial', name: 'Provincial', country: 'VE' },
  { id: 'bdv', name: 'Banco de Venezuela', country: 'VE' },
  { id: 'bod', name: 'BOD', country: 'VE' },
  { id: 'bnc', name: 'Banco Nacional de Crédito', country: 'VE' },
  { id: 'bancaribe', name: 'Bancaribe', country: 'VE' },
  { id: 'exterior', name: 'Banco Exterior', country: 'VE' },
  { id: 'plaza', name: 'Banco Plaza', country: 'VE' },
  { id: 'caroni', name: 'Banco Caroní', country: 'VE' },
  { id: 'tesoro', name: 'Banco del Tesoro', country: 'VE' },
  { id: 'sofitasa', name: 'Banco Sofitasa', country: 'VE' },
  { id: '100banco', name: '100% Banco', country: 'VE' },
  { id: 'bancrecer', name: 'Bancrecer', country: 'VE' },
  { id: 'mibanco', name: 'Mi Banco', country: 'VE' },
  { id: 'activo', name: 'Banco Activo', country: 'VE' },
  { id: 'bvc', name: 'Banco Venezolano de Crédito', country: 'VE' },
  // Internacionales
  { id: 'wellsfargo', name: 'Wells Fargo', country: 'US' },
  { id: 'bofa', name: 'Bank of America', country: 'US' },
  { id: 'zelle', name: 'Zelle', country: 'US' },
  { id: 'binance', name: 'Binance', country: 'INT' },
  { id: 'paypal', name: 'PayPal', country: 'INT' },
];

export const CURRENCIES = ['USD', 'VES', 'USDT', 'EUR'] as const;
