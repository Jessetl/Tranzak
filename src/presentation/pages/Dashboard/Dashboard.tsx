import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/presentation/hooks/useAuth';
import ActivityList from '@/presentation/components/activities/ActivityList';
import { recentActivities } from '@/presentation/mocks/recentActivities';

const Dashboard = (): React.JSX.Element => {
  const { user } = useAuth();

  return (
    <section className='relative flex h-screen flex-col overflow-hidden bg-finance-mist dark:bg-background'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-56 rounded-bl-[2rem] rounded-br-[2rem] border-b border-finance-navy-light bg-finance-navy dark:border-surface dark:bg-surface'
      />

      <div className='relative z-10 mx-auto flex h-full w-full max-w-sm flex-col px-5 pb-16'>
        <header className='flex items-center justify-between pt-6 text-white dark:text-text'>
          <div>
            <p className='text-lg font-semibold tracking-tight'>Tranzak</p>
            <p className='text-xs text-white/60 dark:text-text-secondary'>
              Dashboard financiero
            </p>
          </div>

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

        <div className='mt-28'>
          <article className='rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            <p className='text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
              Sesion activa
            </p>
            <p className='mt-1 truncate text-sm font-semibold text-finance-navy dark:text-text'>
              {user?.email}
            </p>
          </article>
        </div>

        {/* Recent activities */}
        <div className='mt-5 flex min-h-0 flex-1 flex-col'>
          <p className='mb-3 text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
            Actividad reciente
          </p>
          <ActivityList activities={recentActivities} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
