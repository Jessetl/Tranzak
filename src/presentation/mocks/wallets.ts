export interface Wallet {
  id: string;
  name: string;
  balanceUSD: number;
  balanceVES: number;
  gradient: string;
  currency: string;
}

const USD_TO_VES = 86.5;

export const wallets: Wallet[] = [
  {
    id: 'w1',
    name: 'Cuenta Principal',
    balanceUSD: 1202.47,
    balanceVES: 1202.47 * USD_TO_VES,
    gradient: 'from-emerald-500 to-teal-700',
    currency: 'USD',
  },
  {
    id: 'w2',
    name: 'Ahorros',
    balanceUSD: 500.0,
    balanceVES: 500.0 * USD_TO_VES,
    gradient: 'from-blue-500 to-indigo-700',
    currency: 'USD',
  },
  {
    id: 'w3',
    name: 'Bolívares',
    balanceUSD: 150.0,
    balanceVES: 150.0 * USD_TO_VES,
    gradient: 'from-violet-500 to-purple-800',
    currency: 'VES',
  },
  {
    id: 'w4',
    name: 'Inversiones',
    balanceUSD: 3200.0,
    balanceVES: 3200.0 * USD_TO_VES,
    gradient: 'from-amber-500 to-orange-700',
    currency: 'USD',
  },
  {
    id: 'w5',
    name: 'Cripto',
    balanceUSD: 820.33,
    balanceVES: 820.33 * USD_TO_VES,
    gradient: 'from-rose-500 to-pink-800',
    currency: 'USDT',
  },
];
