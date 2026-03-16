import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDebounce } from '@/presentation/hooks/useDebounce';
import ActivityList from '@/presentation/components/activities/ActivityList';
import WalletCarousel from '@/presentation/components/wallets/WalletCarousel';
import { recentActivities } from '@/presentation/mocks/recentActivities';
import { wallets } from '@/presentation/mocks/wallets';

const TranjzakLogo = () => (
  <svg
    viewBox='0 0 130 32'
    className='h-8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <text
      x='0'
      y='24'
      fontFamily='system-ui, -apple-system, sans-serif'
      fontWeight='900'
      fontSize='26'
      letterSpacing='-1'
    >
      <tspan fill='url(#logo-text-grad)'>Tran</tspan>
      <tspan fill='currentColor'>zak</tspan>
    </text>
    <defs>
      <linearGradient
        id='logo-text-grad'
        x1='0'
        y1='0'
        x2='65'
        y2='28'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#34d399' />
        <stop offset='1' stopColor='#059669' />
      </linearGradient>
    </defs>
  </svg>
);

const Dashboard = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  const filteredActivities = useMemo(() => {
    if (!debouncedSearch.trim()) return recentActivities;
    const query = debouncedSearch.toLowerCase();
    return recentActivities.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query),
    );
  }, [debouncedSearch]);

  return (
    <section className='relative flex h-screen flex-col overflow-hidden bg-finance-mist dark:bg-background'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-56 rounded-bl-[2rem] rounded-br-[2rem] border-b border-finance-navy-light bg-finance-navy dark:border-surface dark:bg-surface'
      />

      <div className='relative z-10 mx-auto flex h-full w-full max-w-sm flex-col px-5 pb-16'>
        <header className='flex items-center justify-between pt-6 text-white dark:text-text'>
          <TranjzakLogo />

          <Link
            to='/profile'
            className='inline-flex items-center gap-2 rounded-full text-sm font-medium'
          >
            <span className='max-w-24 truncate'>Carlos Diaz</span>
            <img
              src='https://i.pravatar.cc/80?img=32'
              alt='Foto de perfil'
              className='h-8 w-8 rounded-full object-cover ring-2 ring-finance-emerald/30'
            />
          </Link>
        </header>

        {/* Search input */}
        <div className='mt-4'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='🔍  Buscar por nombre o categoría...'
            className='w-full rounded-xl border border-white/20 bg-white/10 py-2.5 px-4 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition-colors focus:border-finance-emerald/50 focus:bg-white/15 dark:border-surface dark:bg-surface/50 dark:text-text dark:placeholder-text-secondary dark:focus:border-finance-emerald-light/50'
          />
        </div>

        {/* Wallet carousel */}
        <div className='mt-4'>
          <p className='mb-2 text-xs font-medium uppercase tracking-wide text-white/60 dark:text-text-secondary'>
            Billeteras
          </p>
          <WalletCarousel wallets={wallets} />
        </div>

        {/* Recent activities */}
        <div className='mt-5 flex min-h-0 flex-1 flex-col'>
          <p className='mb-3 text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
            {debouncedSearch.trim()
              ? `Resultados (${filteredActivities.length})`
              : 'Actividad reciente'}
          </p>
          <ActivityList activities={filteredActivities} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
