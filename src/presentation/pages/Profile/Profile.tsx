import React from 'react';
import { useAuth } from '@/presentation/hooks/useAuth';
import { LogOut, Settings, Bell, Shield, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/presentation/hooks/useTheme';
import BackNavigation from '@/presentation/components/navigation/BackNavigation';

const Profile = (): React.JSX.Element => {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const menuItems = [
    { icon: Bell, label: 'Notificaciones', description: 'Gestiona tus alertas' },
    { icon: Shield, label: 'Seguridad', description: 'Contraseña y acceso' },
    { icon: Settings, label: 'Preferencias', description: 'Configuración general' },
  ];

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
            <p className='text-lg font-semibold tracking-tight'>Perfil</p>
            <p className='text-xs text-white/60 dark:text-text-secondary'>
              Mi cuenta
            </p>
          </div>
        </header>

        <div className='mt-28 space-y-4'>
          {/* User card with logout button */}
          <article className='rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            <div className='flex items-center gap-3'>
              <img
                src='https://i.pravatar.cc/120?img=32'
                alt='Avatar de usuario'
                className='h-14 w-14 rounded-full object-cover ring-2 ring-finance-emerald/30'
              />
              <div className='min-w-0 flex-1'>
                <p className='text-base font-semibold text-finance-navy dark:text-text'>
                  Carlos Diaz
                </p>
                <p className='truncate text-sm text-finance-slate dark:text-text-secondary'>
                  {user?.email}
                </p>
              </div>
              <button
                type='button'
                onClick={logout}
                aria-label='Cerrar sesión'
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-error transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20'
              >
                <LogOut className='h-[18px] w-[18px]' />
              </button>
            </div>
          </article>

          {/* Theme toggle */}
          <article className='rounded-2xl border border-finance-mist bg-white p-4 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            <button
              type='button'
              onClick={toggleTheme}
              className='flex w-full items-center gap-3'
            >
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20'>
                {mode === 'dark' ? (
                  <Moon className='h-[18px] w-[18px] text-amber-500' />
                ) : (
                  <Sun className='h-[18px] w-[18px] text-amber-500' />
                )}
              </div>
              <div className='flex-1 text-left'>
                <p className='text-sm font-semibold text-finance-navy dark:text-text'>
                  Modo {mode === 'dark' ? 'oscuro' : 'claro'}
                </p>
                <p className='text-xs text-finance-slate dark:text-text-secondary'>
                  Toca para cambiar
                </p>
              </div>
            </button>
          </article>

          {/* Menu items */}
          <article className='overflow-hidden rounded-2xl border border-finance-mist bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.8)] dark:border-surface dark:bg-surface dark:shadow-none'>
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type='button'
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-finance-mist/50 dark:hover:bg-background/50 ${
                    idx < menuItems.length - 1
                      ? 'border-b border-finance-mist dark:border-background'
                      : ''
                  }`}
                >
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-finance-mist dark:bg-background'>
                    <Icon className='h-[18px] w-[18px] text-finance-slate dark:text-text-secondary' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-semibold text-finance-navy dark:text-text'>
                      {item.label}
                    </p>
                    <p className='text-xs text-finance-slate dark:text-text-secondary'>
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </article>
        </div>
      </div>
    </section>
  );
};

export default Profile;
