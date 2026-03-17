import React from 'react';
import type { WalletContextType } from '@/domain/entities/Wallet';

export const WalletContext = React.createContext<WalletContextType | undefined>(
  undefined,
);
