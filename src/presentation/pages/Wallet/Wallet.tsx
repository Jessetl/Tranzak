import React from 'react';
import { CreditCard, Plus, Eye, EyeOff } from 'lucide-react';
import BackNavigation from '@/presentation/components/navigation/BackNavigation';

const Wallet = (): React.JSX.Element => {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <section className='relative flex h-screen flex-col overflow-hidden bg-finance-mist dark:bg-background'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-56 rounded-bl-[2rem] rounded-br-[2rem] border-b border-finance-navy-light bg-finance-navy dark:border-surface dark:bg-surface'
      />

      <div className='relative z-10 mx-auto flex h-full w-full max-w-sm flex-col px-5 pb-16'>
        <header className='pt-6 text-white dark:text-text'>
          <BackNavigation />
          <div className='mt-3'>
            <p className='text-lg font-semibold tracking-tight'>Billeteras</p>
            <p className='text-xs text-white/60 dark:text-text-secondary'>
              Gestiona tus cuentas
            </p>
          </div>
        </header>

        <div className='mt-28 space-y-4'>
          {/* Balance total */}
          <article className='rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
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
              {showBalance ? '$1,702.47' : '••••••'}
            </p>
          </article>

          {/* Wallet cards */}
          {[
            { name: 'Cuenta Principal', balance: 1202.47, type: 'USD', color: 'bg-finance-emerald' },
            { name: 'Ahorros', balance: 500.0, type: 'USD', color: 'bg-blue-500' },
          ].map((wallet) => (
            <article
              key={wallet.name}
              className='flex items-center gap-4 rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${wallet.color}`}
              >
                <CreditCard className='h-5 w-5 text-white' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-finance-navy dark:text-text'>
                  {wallet.name}
                </p>
                <p className='text-xs text-finance-slate dark:text-text-secondary'>
                  {wallet.type}
                </p>
              </div>
              <p className='text-sm font-bold text-finance-navy dark:text-text'>
                {showBalance ? `$${wallet.balance.toFixed(2)}` : '••••'}
              </p>
            </article>
          ))}

          {/* Add wallet button */}
          <button
            type='button'
            className='flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-finance-slate/30 bg-white/50 px-4 py-3 text-sm font-medium text-finance-slate transition-colors hover:border-finance-emerald hover:text-finance-emerald dark:border-text-secondary/30 dark:bg-surface/50 dark:text-text-secondary dark:hover:border-finance-emerald-light dark:hover:text-finance-emerald-light'
          >
            <Plus className='h-4 w-4' />
            Agregar billetera
          </button>
        </div>
      </div>
    </section>
  );
};

export default Wallet;
