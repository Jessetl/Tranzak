import { useContext } from 'react';
import { WalletContext } from '@/presentation/contexts/WalletContext';
import type { WalletContextType } from '@/domain/entities/Wallet';

export function useWallets(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallets must be used within a WalletProvider');
  }
  return context;
}
