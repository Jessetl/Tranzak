import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, Plus, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Reportes', path: '/statistics' },
  { icon: Wallet, label: 'Billeteras', path: '/wallet' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

const AppShellFooter = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className='fixed bottom-0 left-1/2 z-30 w-full max-w-sm -translate-x-1/2'>
      {/* FAB — suspended inside the notch */}
      <button
        type='button'
        aria-label='Agregar'
        className='absolute left-1/2 -top-[43px] z-10 flex h-[45px] w-[45px] -translate-x-1/2 items-center justify-center rounded-full bg-finance-emerald text-white shadow-[0_4px_16px_-2px_rgba(16,185,129,0.6)] transition-all hover:bg-finance-emerald-dark active:scale-95 dark:shadow-[0_4px_16px_-2px_rgba(52,211,153,0.5)]'
      >
        <Plus className='h-5 w-5' strokeWidth={2.5} />
      </button>

      <div className='relative'>
        {/* SVG notch — compact, wraps around the button */}
        <svg
          className='block w-full'
          height='10'
          viewBox='0 0 375 20'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <defs>
            <filter
              id='notch-shadow'
              x='-5%'
              y='-100%'
              width='110%'
              height='300%'
            >
              <feDropShadow
                dx='0'
                dy='-3'
                stdDeviation='3'
                floodColor='rgba(15,29,46,0.06)'
              />
            </filter>
          </defs>
          <path
            filter='url(#notch-shadow)'
            d='M0,0 L152,0 C158,0 160,18 187.5,18 C215,18 217,0 223,0 L375,0 L375,20 L0,20 Z'
            className='fill-white dark:fill-surface'
          />
        </svg>

        <nav className='grid grid-cols-5 items-center bg-white px-2 pb-1 dark:bg-surface'>
          {NAV_ITEMS.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                type='button'
                aria-label={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex items-center justify-center py-0.5 transition-colors',
                  active
                    ? 'text-finance-emerald dark:text-finance-emerald-light'
                    : 'text-finance-slate hover:text-finance-emerald dark:text-text-secondary dark:hover:text-finance-emerald-light',
                )}
              >
                <Icon className='h-[21px] w-[21px]' />
              </button>
            );
          })}

          {/* Center spacer for FAB */}
          <span aria-hidden='true' />

          {NAV_ITEMS.slice(2).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                type='button'
                aria-label={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex items-center justify-center py-0.5 transition-colors',
                  active
                    ? 'text-finance-emerald dark:text-finance-emerald-light'
                    : 'text-finance-slate hover:text-finance-emerald dark:text-text-secondary dark:hover:text-finance-emerald-light',
                )}
              >
                <Icon className='h-[21px] w-[21px]' />
              </button>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default AppShellFooter;
