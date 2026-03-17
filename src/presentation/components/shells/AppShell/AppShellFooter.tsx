import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, Plus, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Home, label: 'Inicio', path: '/' },
  { icon: BarChart3, label: 'Reportes', path: '/statistics' },
  { icon: Wallet, label: 'Billeteras', path: '/wallet' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

const AppShellFooter = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const leftItems = NAV_ITEMS.slice(0, 2);
  const rightItems = NAV_ITEMS.slice(2);

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    return (
      <button
        key={item.path}
        type='button'
        role='tab'
        aria-selected={active}
        aria-label={item.label}
        onClick={() => navigate(item.path)}
        className='group flex items-center justify-center'
      >
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200',
            active
              ? 'bg-finance-emerald/10 dark:bg-finance-emerald-light/10'
              : 'group-active:scale-90',
          )}
        >
          <Icon
            className={cn(
              'h-[21px] w-[21px] transition-colors',
              active
                ? 'text-finance-emerald dark:text-finance-emerald-light'
                : 'text-finance-slate/60 group-hover:text-finance-slate dark:text-text-secondary/60 dark:group-hover:text-text-secondary',
            )}
            strokeWidth={active ? 2.2 : 1.8}
          />
        </span>
      </button>
    );
  };

  return (
    <footer className='fixed bottom-0 left-1/2 z-30 w-full max-w-sm -translate-x-1/2'>
      <div className='relative border-t border-finance-mist/80 bg-white/80 backdrop-blur-xl dark:border-surface/80 dark:bg-background/80'>
        <nav
          className='grid grid-cols-5 items-center px-2 py-[max(env(safe-area-inset-bottom,0px),6px)] '
          role='tablist'
        >
          {leftItems.map(renderNavItem)}

          {/* Center FAB */}
          <div className='flex justify-center'>
            <button
              type='button'
              aria-label='Agregar'
              onClick={() => {}}
              className='-mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-finance-emerald text-white shadow-[0_4px_16px_-2px_rgba(16,185,129,0.5)] transition-all active:scale-95 dark:shadow-[0_4px_16px_-2px_rgba(52,211,153,0.4)]'
            >
              <Plus className='h-[18px] w-[18px]' strokeWidth={2.5} />
            </button>
          </div>

          {rightItems.map(renderNavItem)}
        </nav>
      </div>
    </footer>
  );
};

export default AppShellFooter;
