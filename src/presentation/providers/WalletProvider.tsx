import React, { useMemo, useState, useCallback } from 'react';
import { WalletContext } from '@/presentation/contexts/WalletContext';
import type { Wallet, CreateWalletDTO } from '@/domain/entities/Wallet';
import type { WalletRepository } from '@/domain/contracts/WalletRepository';
import { LocalStorageWalletRepository } from '@/infrastructure/repositories/LocalStorageWalletRepository';
import { wallets as mockWallets } from '@/presentation/mocks/wallets';

interface WalletProviderProps {
  children: React.ReactNode;
  walletRepository?: WalletRepository;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({
  children,
  walletRepository,
}) => {
  const repository = useMemo<WalletRepository>(
    () => walletRepository ?? new LocalStorageWalletRepository(),
    [walletRepository],
  );

  const [userWallets, setUserWallets] = useState<Wallet[]>(() =>
    repository.getAll(),
  );

  const wallets = useMemo<Wallet[]>(
    () => [...mockWallets, ...userWallets],
    [userWallets],
  );

  const addWallet = useCallback(
    (dto: CreateWalletDTO): Wallet => {
      const newWallet = repository.create(dto);
      setUserWallets((prev) => [...prev, newWallet]);
      return newWallet;
    },
    [repository],
  );

  const contextValue = useMemo(
    () => ({ wallets, addWallet }),
    [wallets, addWallet],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
