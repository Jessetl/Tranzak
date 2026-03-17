import type { Wallet, CreateWalletDTO } from '@/domain/entities/Wallet';

export interface WalletRepository {
  getAll: () => Wallet[];
  create: (dto: CreateWalletDTO) => Wallet;
  getById: (id: string) => Wallet | null;
}
