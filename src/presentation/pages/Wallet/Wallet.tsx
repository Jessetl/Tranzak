import React, { useMemo, useState } from 'react';
import { CreditCard, Plus, Eye, EyeOff } from 'lucide-react';
import BackNavigation from '@/presentation/components/navigation/BackNavigation';
import BottomSheet from '@/presentation/components/modals/BottomSheet';
import CreateWalletForm from '@/presentation/components/wallets/CreateWalletForm';
import { useWallets } from '@/presentation/hooks/useWallets';
import { useDebounce } from '@/presentation/hooks/useDebounce';
import type { CreateWalletDTO } from '@/domain/entities/Wallet';

const WALLET_COLORS = [
  'bg-finance-emerald',
  'bg-blue-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-fuchsia-500',
  'bg-lime-500',
];

function formatNumber(n: number): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const Wallet = (): React.JSX.Element => {
  const [showBalance, setShowBalance] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const { wallets, addWallet } = useWallets();

  const filteredWallets = useMemo(() => {
    if (!debouncedSearch.trim()) return wallets;
    const q = debouncedSearch.toLowerCase();
    return wallets.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.bank?.toLowerCase().includes(q) ||
        w.currency.toLowerCase().includes(q),
    );
  }, [wallets, debouncedSearch]);

  const totalBalance = useMemo(
    () => wallets.reduce((sum, w) => sum + w.balanceUSD, 0),
    [wallets],
  );

  const handleCreate = (dto: CreateWalletDTO) => {
    addWallet(dto);
    setIsModalOpen(false);
  };

  return (
    <section className='relative flex h-screen flex-col overflow-hidden bg-finance-mist dark:bg-background'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-56 rounded-bl-[2rem] rounded-br-[2rem] border-b border-finance-navy-light bg-finance-navy dark:border-surface dark:bg-surface'
      />

      <div className='relative z-10 mx-auto flex h-full w-full max-w-sm flex-col px-5 pb-16'>
        {/* Header */}
        <header className='pt-6 text-white dark:text-text'>
          <BackNavigation />
          <div className='mt-3'>
            <p className='text-lg font-semibold tracking-tight'>Billeteras</p>
            <p className='text-xs text-white/60 dark:text-text-secondary'>
              Gestiona tus cuentas
            </p>
          </div>
        </header>

        {/* Search */}
        <div className='mt-4'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='🔍  Buscar billetera...'
            className='w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition-colors focus:border-finance-emerald/50 focus:bg-white/15 dark:border-surface dark:bg-surface/50 dark:text-text dark:placeholder-text-secondary dark:focus:border-finance-emerald-light/50'
          />
        </div>

        {/* Balance total — fixed */}
        <article className='mt-4 shrink-0 rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
          <div className='flex items-center justify-between'>
            <p className='text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
              Balance total
            </p>
            <button
              type='button'
              onClick={() => setShowBalance(!showBalance)}
              className='text-finance-slate transition-colors hover:text-finance-navy dark:text-text-secondary dark:hover:text-text'
            >
              {showBalance ? (
                <Eye className='h-4 w-4' />
              ) : (
                <EyeOff className='h-4 w-4' />
              )}
            </button>
          </div>
          <p className='mt-1 text-2xl font-bold text-finance-navy dark:text-text'>
            {showBalance ? `$${formatNumber(totalBalance)}` : '••••••'}
          </p>
        </article>

        {/* Scrollable wallet list */}
        <div className='mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {filteredWallets.map((wallet, i) => (
            <article
              key={wallet.id}
              className='flex items-center gap-4 rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${WALLET_COLORS[i % WALLET_COLORS.length]}`}
              >
                <CreditCard className='h-5 w-5 text-white' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-finance-navy dark:text-text'>
                  {wallet.name}
                </p>
                <p className='text-xs text-finance-slate dark:text-text-secondary'>
                  {wallet.bank ? `${wallet.bank} · ` : ''}
                  {wallet.currency}
                </p>
              </div>
              <p className='text-sm font-bold text-finance-navy dark:text-text'>
                {showBalance
                  ? `$${formatNumber(wallet.balanceUSD)}`
                  : '••••'}
              </p>
            </article>
          ))}

          {filteredWallets.length === 0 && (
            <p className='py-8 text-center text-sm text-finance-slate dark:text-text-secondary'>
              No se encontraron billeteras
            </p>
          )}
        </div>

        {/* Add wallet button — fixed at bottom */}
        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='mt-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-finance-slate/30 bg-white/50 px-4 py-3 text-sm font-medium text-finance-slate transition-colors hover:border-finance-emerald hover:text-finance-emerald dark:border-text-secondary/30 dark:bg-surface/50 dark:text-text-secondary dark:hover:border-finance-emerald-light dark:hover:text-finance-emerald-light'
        >
          <Plus className='h-4 w-4' />
          Agregar billetera
        </button>
      </div>

      {/* Bottom sheet modal */}
      <BottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Nueva billetera'
      >
        <CreateWalletForm onSubmit={handleCreate} />
      </BottomSheet>
    </section>
  );
};

export default Wallet;
