import type { WalletRepository } from '@/domain/contracts/WalletRepository';
import type { Wallet, CreateWalletDTO } from '@/domain/entities/Wallet';
import { WALLET_GRADIENTS } from '@/domain/entities/Wallet';

export class LocalStorageWalletRepository implements WalletRepository {
  private readonly STORAGE_KEY = 'app_wallets';

  getAll(): Wallet[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw) as Wallet[];
    } catch {
      return [];
    }
  }

  create(dto: CreateWalletDTO): Wallet {
    const wallets = this.getAll();
    const gradient =
      WALLET_GRADIENTS[wallets.length % WALLET_GRADIENTS.length];

    const wallet: Wallet = {
      id: `w-${Date.now()}`,
      name: dto.name,
      balanceUSD: 0,
      balanceVES: 0,
      gradient,
      currency: dto.currency,
      bank: dto.bank,
    };

    wallets.push(wallet);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wallets));

    return wallet;
  }

  getById(id: string): Wallet | null {
    return this.getAll().find((w) => w.id === id) ?? null;
  }
}
