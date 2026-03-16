import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import BackNavigation from '@/presentation/components/navigation/BackNavigation';

const Statistics = (): React.JSX.Element => {
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
            <p className='text-lg font-semibold tracking-tight'>Estadísticas</p>
            <p className='text-xs text-white/60 dark:text-text-secondary'>
              Resumen de tus finanzas
            </p>
          </div>
        </header>

        <div className='mt-28 space-y-4'>
          {/* Income card */}
          <article className='flex items-center gap-4 rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20'>
              <TrendingUp className='h-5 w-5 text-finance-emerald' />
            </div>
            <div className='flex-1'>
              <p className='text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
                Ingresos del mes
              </p>
              <p className='mt-1 text-xl font-bold text-finance-navy dark:text-text'>
                $1,300.00
              </p>
            </div>
            <ArrowUpRight className='h-4 w-4 text-finance-emerald' />
          </article>

          {/* Expense card */}
          <article className='flex items-center gap-4 rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20'>
              <TrendingDown className='h-5 w-5 text-error' />
            </div>
            <div className='flex-1'>
              <p className='text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
                Gastos del mes
              </p>
              <p className='mt-1 text-xl font-bold text-finance-navy dark:text-text'>
                $597.53
              </p>
            </div>
          </article>

          {/* Chart placeholder */}
          <article className='rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            <div className='flex items-center gap-2'>
              <BarChart3 className='h-4 w-4 text-finance-slate dark:text-text-secondary' />
              <p className='text-xs font-medium uppercase tracking-wide text-finance-slate dark:text-text-secondary'>
                Distribución por categoría
              </p>
            </div>
            <div className='mt-4 space-y-3'>
              {[
                { name: 'Hogar', pct: 58, color: 'bg-purple-500' },
                { name: 'Comida', pct: 22, color: 'bg-orange-500' },
                { name: 'Transporte', pct: 12, color: 'bg-blue-500' },
                { name: 'Entretenimiento', pct: 8, color: 'bg-pink-500' },
              ].map((cat) => (
                <div key={cat.name} className='space-y-1'>
                  <div className='flex justify-between text-xs'>
                    <span className='font-medium text-finance-navy dark:text-text'>
                      {cat.name}
                    </span>
                    <span className='text-finance-slate dark:text-text-secondary'>
                      {cat.pct}%
                    </span>
                  </div>
                  <div className='h-1.5 rounded-full bg-finance-mist dark:bg-background'>
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
